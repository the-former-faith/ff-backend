import React from 'react'
import PropTypes from 'prop-types'
import PatchEvent, {set, unset} from 'part:@sanity/form-builder/patch-event'
import {setIfMissing} from 'part:@sanity/form-builder/patch-event'
import Fieldset from 'part:@sanity/components/fieldsets/default'
import {FormBuilderInput} from 'part:@sanity/form-builder'

export default class WikidataLookup extends React.Component {
  static propTypes = {
    type: PropTypes.shape({
      title: PropTypes.string
    }).isRequired,

    level: PropTypes.number,
    value: PropTypes.shape({
      _type: PropTypes.string,
      wikidataId: PropTypes.string,
      wikidataLookup: PropTypes.string
    }),
    focusPath: PropTypes.array.isRequired,
    onFocus: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired
  }

  firstFieldInput = React.createRef()

  // this is called by the form builder whenever this input should receive focus
  focus() {
    this.firstFieldInput.current.focus()
  }

  searchWikidata(event){
    const endpointUrl = 'https://query.wikidata.org/sparql'
    const sparqlQuery = `SELECT ?value ?label ?image ?description WHERE {
        ?value wdt:P31 wd:Q5.
        ?value rdfs:label ?label.
        ?value schema:description ?description.
        FILTER((LANG(?label)) = "en")
        FILTER((LANG(?description)) = "en")
        FILTER(CONTAINS(LCASE(STR(?label)), "${event.toLowerCase()}"))
        OPTIONAL { ?value wdt:P18 ?image. }
      }
      LIMIT 10`
    const fullUrl = endpointUrl + '?query=' + encodeURIComponent( sparqlQuery )
    const headers = { 'Accept': 'application/sparql-results+json' };

    if(event.length > 2) {
      fetch( fullUrl, { headers } )
      .then( body => {
        if(body.ok) {
          return body.json() 
        } else {
          console.log("error")
        }
      }).then(b => {
        if (b !== undefined) {
          return b.results.bindings.map(function(c){
            return {
              label: c.label.value, 
              value: c.value.value.slice(31),
              image: c.image === undefined ? null : c.image.value,
              description: c.description.value ? c.description.value : null
            }
          })
        } else {
          return [{label: "No results"}]
        }
      })
      .then(d => {
        this.setState({ results: d})
      })
    } else {
      this.setState({ results: []})
    }
  }
  handleSelect = (title, element) => {
    const {type, value} = this.props
    const id = element.value
    console.log(title)
    const nextValue = {
      _type: type.name,
      wikidataId: id
    }
    this.setState({
      input: title
    })

    const patch = title === '' ? unset() : set(nextValue)
    this.props.onChange(PatchEvent.from(patch))
  }

  handleSourceChange = event => {
    const {type} = this.props
    const inputValue = event.target.value

    this.searchWikidata(inputValue);
    const nextValue = {
      _type: type.name,
      wikidataLookup: inputValue
    }

    const patch = inputValue === '' ? unset() : set(nextValue)
    this.props.onChange(PatchEvent.from(patch))
  }

  handleFieldChange = (field, fieldPatchEvent) => {
    const {onChange, type} = this.props
    // Whenever the field input emits a patch event, we need to make sure to each of the included patches
    // are prefixed with its field name, e.g. going from:
    // {path: [], set: <nextvalue>} to {path: [<fieldName>], set: <nextValue>}
    // and ensure this input's value exists
    onChange(fieldPatchEvent.prefixAll(field.name).prepend(setIfMissing({_type: type.name})))
  }

  render() {
    const {type, value, level, focusPath, onFocus, onBlur} = this.props

    return (
      <Fieldset level={level} legend={type.title} description={type.description}>
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
              { ...((field.name === 'wikidataLookup') && { onSelect: this.handleSelect })}
              path={[field.name]}
              focusPath={focusPath}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          ))}
        </div>
      </Fieldset>
    )
  }
}