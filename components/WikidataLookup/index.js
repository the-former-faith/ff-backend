import React, { useState } from 'react' 
import AutoFill from '../AutoFill'
import {withDocument} from 'part:@sanity/form-builder'

const WikidataLookup = React.forwardRef((props, ref) => {

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

  const sparqlQuery = (x) => `SELECT ?value ?label ?image ?description WHERE {
    ?value wdt:P31 wd:${instanceOf}.
    ?value rdfs:label ?label.
    ?value schema:description ?description.
    FILTER((LANG(?label)) = "en")
    FILTER((LANG(?description)) = "en")
    FILTER(CONTAINS(LCASE(STR(?label)), "${x.toLowerCase()}"))
    OPTIONAL { ?value wdt:P18 ?image. }
  }
  LIMIT 10`

  const fullUrl = (x) => 'https://query.wikidata.org/sparql?query=' + encodeURIComponent( sparqlQuery(x) )
  
  const headers = { 'Accept': 'application/sparql-results+json' }
  
  //TODO fix this query, because the results aren't what I'm expecting
  const fetchEntries = (x) => fetch( fullUrl(x), { headers } ).then( body => body.json() ).then( x => x.results.bindings.map(i => {
    return {
      value: i.value.value.substring(i.value.value.lastIndexOf('/') + 1, i.value.value.length),
      payload: {
        description: i.description.value,
        name: i.label.value,
        imageUrl: i.image ? i.image.value : null,
      }
    }
  }))

  const fetchValues = (e) => {
    console.log(e)
  }

  return (
    <AutoFill 
      fetchOptionsCallback={fetchEntries} 
      fetchFillValuesCallback={fetchValues} 
      currentRef={ref}
      {...props} 
    />
  )
}
)

export default withDocument(WikidataLookup)