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
    wikidataInstanceOf: PropTypes.string,
    level: PropTypes.number,
    value: PropTypes.shape({
      _type: PropTypes.string,
      wikidataId: PropTypes.string,
      wikidataLookup: PropTypes.string
    }),
    focusPath: PropTypes.array,
    onFocus: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired
  }

  firstFieldInput = React.createRef()

  // this is called by the form builder whenever this input should receive focus
  focus() {
    this.firstFieldInput.current.focus()
  }

  mergeObjects(objectArray) {
    var newObject = {}
    objectArray.map(function(c){
      Object.keys(c).forEach(key => {
        if (newObject[key] === undefined || newObject[key] == c[key]){
          newObject[key] = c[key]
        } else if (Array.isArray(newObject[key])) {
          newObject[key].push(c[key])      
        } else {
          newObject[key] = [newObject[key], c[key]]
        }
      })
    })
    return newObject
  }

  simplifyWikidataResponse(objectArray) {
    var newArray = []
    objectArray.map(function(c){
      var newObject = {}
      Object.keys(c).forEach(key => {
        newObject[key] = c[key].value
      })
      newArray.push(newObject)
    })
    return newArray
  }

  removeLabels(objectArray) {
    var oldKeys = Object.keys(objectArray[0]).filter(word => RegExp('Label').test(word))
    var newKeys = []
    oldKeys.forEach(c => {
      newKeys.push(c.substring(0, c.length - 5))
    })
    var newArray = []
    objectArray.map(function(c){
      var newObject = {}
      Object.keys(c).forEach(key => {
        var rename = newKeys.find(a =>{
          var b = a + 'Label'
          return key == b
        })
        if(key === rename + 'Label') {
           newObject[rename] = c[key]
        } else if (newKeys.find(a =>{return a === key})) {
           //Igrore this one
        } else {
          newObject[key] = c[key]
        }
      })
      newArray.push(newObject)
    })
    return newArray
  }

  prepareFieldData(data) {
    const {type} = this.props
    const nextValue = {
      _type: type.name
    }
    Object.keys(data).forEach(key => {
      let value = data[key];
      //use key and value here
      const results = type.fields.find( field => field.name === key );
      if(typeof results !== 'undefined') {
        if(results.type.jsonType === 'array'){
          const fieldArray = [value]
          nextValue[key] = fieldArray
        } else {
          nextValue[key] = value
        }
      }
    });

    this.props.onChange(PatchEvent.from(set(nextValue)))
  }

  populateFields = (id) => {
    const {type} = this.props
    //Create sparql query
    const url = `https://www.wikidata.org/wiki/Special:EntityData/${id}.json`
    let select = ''
    let properties = ''

    Object.entries(type.options.wikidataFields).forEach(entry => {
      let key = entry[0]
      let value = entry[1]
      select = select.concat('?', key , ' ?' , key , 'Label ')
      properties = properties.concat('OPTIONAL { ?item wdt:' , value , ' ?' , key , '. } ')
    });

    const endpointUrl = 'https://query.wikidata.org/sparql'
    const sparqlQuery = `SELECT ?item ?label ?instanceOf ${select} WHERE {
        BIND(wd:${id} AS ?item)
        ?item rdfs:label ?label.
        OPTIONAL { ?item wdt:P31 ?instanceOf. }
        ${properties}
        FILTER((LANG(?label)) = "en")
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
      }
      LIMIT 10`
    //console.log(sparqlQuery)
    const fullUrl = endpointUrl + '?query=' + encodeURIComponent( sparqlQuery )
    const headers = { 'Accept': 'application/sparql-results+json' };

    //Make sparql query
    fetch( fullUrl, { headers } )
      .then( body => {
        if(body.ok) {
          return body.json() 
        } else {
          console.log("error")
        }
      })
      .then(a => {
        if (a.results.bindings.length !== 0) {
          return this.simplifyWikidataResponse(a.results.bindings)
        } else {
          return Promise.reject(a)
        }
      }).then(z => {
        if (z[0].instanceOf === "http://www.wikidata.org/entity/" + type.options.wikidataInstanceOf) {
          return z
        } else {
          return Promise.reject(z)
        }
      }).then(b => {
        return this.removeLabels(b)
      }).then(c =>{
        return this.mergeObjects(c)
      }).then(d => {
        this.prepareFieldData(d)
      })
  }

  handleSelect = (title, element) => {
    const {type, value} = this.props
    const id = element.value
    const nextValue = {
      _type: type.name,
      wikidataId: id
    }
    this.setState({
      input: title
    })
    const patch = title === '' ? unset() : set(nextValue)
    this.props.onChange(PatchEvent.from(patch))
    this.populateFields(id)
  }

  handleFieldChange = (field, fieldPatchEvent) => {
    const {onChange, type} = this.props
    if(field.name === "wikidataId") {
      this.populateFields(fieldPatchEvent.patches[0].value)
    }
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
              focusPath={focusPath}
              onFocus={onFocus}
              onBlur={onBlur}
              onChange={patchEvent => this.handleFieldChange(field, patchEvent)}
              { ...((field.name === 'wikidataLookup') && { onSelect: this.handleSelect })}
              path={[field.name]} instanceOf={type.options.wikidataInstanceOf}
            />
          ))}
        </div>
      </Fieldset>
    )
  }
}