import React, { useState, useEffect } from 'react' 
import { Autocomplete, Card, Flex, Box, Avatar } from '@sanity/ui'
import Option from './Option'
import {withDocument} from 'part:@sanity/form-builder'
import client from 'part:@sanity/base/client'
import urlBuilder from '@sanity/image-url'

const WikidataLookup = (props, ref) => {

  // this is called by the form builder whenever this input should receive focus
  //props.onFocus(() => ref)

  const instanceOf = 'Q5'

  const [options, setOptions] = useState([])

  useEffect(() => {    
    console.log(options)
  })

  const {type} = props

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
  
  const fetchEntries = (x) => fetch( fullUrl(x), { headers } ).then( body => body.json() )

  const handleQueryChange = (query) => {
    if (query && query.length > 2) {
      fetchEntries(query)
      .then( x => x.results.bindings.map(i => {
        return {
          value: i.value.value.substring(i.value.value.lastIndexOf('/') + 1, i.value.value.length),
          payload: {
            description: i.description.value,
            name: i.label.value,
            imageUrl: i.image ? i.image.value : null,
          }
        }
      }))
      .then( x => setOptions(x))
    }
  }


  return (
    <>
      <h2>{type.title}</h2>
      <Autocomplete
        fontSize={[2, 2, 3]}
        id="autocomplete-example"
        onQueryChange={e => handleQueryChange(e)}
        onChange={e => console.log(e)}
        options={options}
        placeholder="Search options"
        filterOption={e => e}
        renderOption={(option) => <Option option={option} />}
      />
    </>
  )
}

export default WikidataLookup