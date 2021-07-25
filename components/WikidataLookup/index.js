import React from 'react' 
import AutoFill from '../AutoFill'
import {useToast} from '@sanity/ui'
import {withDocument} from 'part:@sanity/form-builder'
import WBK from 'wikibase-sdk'

const wbk = WBK({
  instance: 'https://www.wikidata.org',
  sparqlEndpoint: 'https://query.wikidata.org/sparql'
})

const slugify = (text) => {
  const from = 'ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;'
  const to = 'aaaaaeeeeeiiiiooooouuuunc------'

  const newText = Array.from(text)
    .map((c) => {
      const index = [...from].indexOf(c)
      if (index > -1) {
        return c.replace(
          new RegExp(from.charAt(index), 'g'),
          to.charAt(index)
        )
      }
      return c
    })
    .join('')

  return newText
    .toString()                     // Cast to string
    .toLowerCase()                  // Convert the string to lowercase letters
    .trim()                         // Remove whitespace from both sides of a string
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/&/g, '-y-')           // Replace & with 'and'
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-');   
}

const WikidataLookup = React.forwardRef((props, ref) => {

  const toast = useToast()

  //TODO double the options layers:
  //There are some options unique to this WikiData field (possibly only instanceOf)
  //and there are ones that all autofill components need (fields)

  //TODO use this in the actual filter.
  //I probably need to move the filter function here from Autocomplete field,
  //and pass it as a prop
  const instanceOf = 'Q5'

  const headers = { method: 'GET' }

  const fetchEnities = async(ids, props)=> {

    const url =  wbk.getEntities({
      ids: ids,
      languages: [ 'en' ],
      props: props ? props : ''
    })

    const headers = { method: 'GET' }

    const entities = await fetch( url, headers ).then( body => body.json() )

    const simplifiedEntities = await wbk.simplify.entities(entities)

    return await simplifiedEntities

  }

  const getLabels = async(ids) => {

    if (!ids) return ['']

    const entities = await fetchEnities(ids, ['labels'])

    const entitiesArray = Object.values(entities)

    const enitiesLabels = entitiesArray.map(x => {
      return x.labels.en
    })

    return enitiesLabels

  }

  const fieldsToFill = async(entity) => {

    const claims = entity.payload.claims

    return {
      'title.en': entity.payload.name,
      'slug.en.current': slugify(entity.payload.name),
      'shortDescription.en': entity.payload.description,
      'familyName.en': (await getLabels(claims.P734)).join(' '),
      'givenNames.en': await getLabels(claims.P735),
      'date.time': claims.P569 ? claims.P569[0] : undefined,
      'dateEnd.time': claims.P570 ? claims.P570[0] : '2000-01-02',
      'wikipediaId': entity.payload.wikipediaId
    }

  }

  const searchEnities = async(searchTerm, props)=> {

    const url =  wbk.searchEntities({
      search: searchTerm,
      language: [ 'en' ],
      props: props ? props : ''
    })

    const headers = { method: 'GET' }

    const entities = await fetch( url, headers ).then( body => body.json() )

    if (entities.success === 1 ) {
      return entities.search
    }

    //TODO add error catch if no results

  }  

  const mapEntitiesWithClaims = async(x) => {

    const ids = await x.map(i => i.id)

    const entitiesWithClaims = await fetchEnities(ids, ['claims', 'sitelinks'])

    const mappedEntities = (x, y) => x.map(i => {
      return {
        value: i.id,
        payload: {
          description: i.description,
          name: i.label,
          names: i.aliases ? [i.label, ...i.aliases] : [i.label],
          imageUrl: y[i.id].claims.P18 ? `https://commons.wikimedia.org/w/thumb.php?width=100&f=${y[i.id].claims.P18[0].split(' ').join('_')}` : null,
          wikipediaId: y[i.id].sitelinks.enwiki ? y[i.id].sitelinks.enwiki : undefined,
          instanceOf: y[i.id].claims.P31 ? y[i.id].claims.P31[0] : null,
          claims: y[i.id].claims
        }
      }
    })

    return await mappedEntities(x, entitiesWithClaims)
  }

  //I Can make this async instead of chaining.
  const fetchEntriesFromSearchTerm = async(x) => {

    const entriesFromSearchTerm = await searchEnities(x)

    const mappedEntities = await mapEntitiesWithClaims(entriesFromSearchTerm)

    return mappedEntities

  }

  return (
    <AutoFill 
      fetchOptionsCallback={fetchEntriesFromSearchTerm} 
      fieldsToFill={fieldsToFill}
      currentRef={ref}
      {...props} 
    />
  )

})

export default withDocument(WikidataLookup)