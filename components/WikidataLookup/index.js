import React, { useState } from 'react' 
import AutoFill from '../AutoFill'
import {useToast} from '@sanity/ui'
import {withDocument} from 'part:@sanity/form-builder'

const WikidataLookup = React.forwardRef((props, ref) => {

  const toast = useToast()

  //console.log(props.document)

  //TODO double the options layers:
  //There are some options unique to this WikiData field (possibly only instanceOf)
  //and there are ones that all autofill components need (fields)

  const instanceOf = 'Q5'

  const fields = {
    'familyName': {
      key: 'P734',
      type: 'localeString'
    }
  }

  const fullUrl = (x) => `https://www.wikidata.org/w/api.php?action=wbsearchentities&format=json&origin=*&search=${encodeURIComponent( x )}&language=en&type=item&props=`
  
  const headers = { method: 'GET' }
  
  const fetchEntries = (x) => fetch( fullUrl(x), headers )
    .then( body => body.json() )
    .then( x => {
      if (x.search.length > 0) {
        return x.search
      } else {
        toast.push({title: 'No results'})
      }
    })
    .then(async x => {
      const keys = await x.map(i => i.id)
      const url = (x) => `https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&origin=*&ids=${x.join('%7C')}&props=claims&languages=en`
      const getClaims = (x) => fetch( url(x), headers )
      .then( body => body.json() )
      .then(x => {
        if(x.success == 1) {
          return x.entities
        }
      })
      const claims = await getClaims(keys)
      //Here, do some magic to map the 2 objects together.
      //I think I should use reduce instead of map.
      const mappedEntities = (x, y) => x.map(i => {
        return {
          value: i.id,
          payload: {
            description: i.description,
            name: i.label,
            names: i.aliases ? [i.label, ...i.aliases] : [i.label],
            imageUrl: y[i.id].claims.P18 ? `https://commons.wikimedia.org/w/thumb.php?width=100&f=${y[i.id].claims.P18[0].mainsnak.datavalue.value.split(' ').join('_')}` : null,
            instanceOf: y[i.id].claims?.P31[0].mainsnak.datavalue.value.id,
            claims: y[i.id].claims
          }
        }
      })
      return await mappedEntities(x, claims)
    })
    .catch(e => console.log(e.message))

  return (
    <AutoFill 
      fetchOptionsCallback={fetchEntries} 
      currentRef={ref}
      {...props} 
    />
  )
}
)

export default withDocument(WikidataLookup)