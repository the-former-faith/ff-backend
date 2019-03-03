import PropTypes from 'prop-types'
import React from 'react'
import {setIfMissing} from 'part:@sanity/form-builder/patch-event'
import {FormBuilderInput} from 'part:@sanity/form-builder'

export default class CustomObjectInput extends React.PureComponent {
  static propTypes = {
    type: PropTypes.shape({
      title: PropTypes.string,
      name: PropTypes.string
    }).isRequired,
    level: PropTypes.number,
    value: PropTypes.shape({
      _type: PropTypes.string
    }),
    focusPath: PropTypes.array,
    onFocus: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired
  }

  firstFieldInput = React.createRef()

  handleFieldChange = (field, fieldPatchEvent) => {
    console.log(field)
    const {onChange, type} = this.props
    if(field.name === "wikidataId") {
      console.log("hey")
      const endpointUrl = 'https://query.wikidata.org/sparql'
      const sparqlQuery = `PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> 
      PREFIX wd: <http://www.wikidata.org/entity/> 
      select  *
      where {
        wd:${field.name} rdfs:label ?label .
        FILTER (langMatches( lang(?label), "EN" ) )
      }`
      const fullUrl = endpointUrl + '?query=' + encodeURIComponent( sparqlQuery )
      const headers = { 'Accept': 'application/sparql-results+json' };
      fetch( fullUrl, { headers } )
      .then( body => {
        if(body.ok) {
          return body.json() 
        } else {
          console.log("error")
        }
      }).then(b => console.log(b))
    }
    // Whenever the field input emits a patch event, we need to make sure to each of the included patches
    // are prefixed with its field name, e.g. going from:
    // {path: [], set: <nextvalue>} to {path: [<fieldName>], set: <nextValue>}
    // and ensure this input's value exists
    onChange(fieldPatchEvent.prefixAll(field.name).prepend(setIfMissing({_type: type.name})))
  }

  focus() {
    this.firstFieldInput.current.focus()
  }

  render() {
    const {type, value, level, focusPath, onFocus, onBlur} = this.props
    return (
      <div>
        {type.fields.map((field, i) => (
          // Delegate to the generic FormBuilderInput. It will resolve and insert the actual input component
          // for the given field type
          <FormBuilderInput
            level={level + 1}
            ref={i === 0 ? this.firstFieldInput : null}
            key={field.name}
            type={field.type}
            value={value && value[field.name]}
            onChange={patchEvent => this.handleFieldChange(field, patchEvent)}
            path={[field.name]}
            focusPath={focusPath}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        ))}
      </div>
    )
  }
}
