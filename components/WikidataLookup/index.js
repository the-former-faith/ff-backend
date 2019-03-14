import React from 'react'
import PropTypes from 'prop-types'
import PatchEvent, {set, unset} from 'part:@sanity/form-builder/patch-event'
import {setIfMissing} from 'part:@sanity/form-builder/patch-event'
import Fieldset from 'part:@sanity/components/fieldsets/default'
import {FormBuilderInput} from 'part:@sanity/form-builder'
import isPlainObject from 'is-plain-object'

var checkLabel = function(value) {
  const re = new RegExp("^(Q[0-9])")
  const wikidataUrl = new RegExp('^http://www.wikidata.org/entity/')
  if(wikidataUrl.test(value)) {
    let newValue = value.replace('http://www.wikidata.org/entity/','')
    value = newValue
  }
  if(re.test(value)) {
    value = fetch( `https://www.wikidata.org/w/api.php?action=wbgetentities&props=labels&languages=en&format=json&ids=${value}&origin=*`, { method: 'GET' } )
      .then( body => {
        if(body.ok) {
          return body.json() 
        } else {
          console.log("error")
        }
      })
      .then(a => {
        //console.log(a)
        let label = "Label!"//a.entities[value].labels.en.value
        return label
      })
  }
  return value
}

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

  fetchClaims(id) {
    //Make sparql query
    const fullUrl = `https://www.wikidata.org/w/api.php?action=wbgetclaims&entity=${id}&format=json&origin=*`
    var re = new RegExp("^(Q[0-9])");
    if(re.test(id)){
      const claims = fetch( fullUrl, { method: 'GET' } )
        .then( body => {
          if(body.ok) {
            return body.json() 
          } else {
            console.log("error")
          }
        })
      return claims
    } else {
      return
      console.log("Ivalid Wikidata ID")
    }
  }

  //Create an object of the new data to be sent to the database
  prepareFieldData(data) {
    const {type} = this.props
    const nextValue = {
      _type: type.name
    }
    Object.keys(data).forEach(key => {
      let value = data[key];
      const results = type.fields.find( field => field.name === key );
      if(typeof results !== 'undefined') {
        //Check to make sure that the value being passed into the database is the correct type.
        if(results.type.jsonType === 'array'){
          if(typeof value === 'string') {
            const fieldArray = [value]
            nextValue[key] = fieldArray
          } else if(typeof value === 'object' && value !== null) {
            let newValue = Object.values(value)
            let flattened = newValue.flat(Infinity)
            nextValue[key] = flattened
          } else {
            nextValue[key] = value
          } 
        } else if (results.type.jsonType === 'string') {
          if(typeof value === 'object' && value !== null) {
            let newValue = Object.values(value)
            let flattened = newValue.flat(Infinity)
            nextValue[key] = flattened.toString()
          }
        } else {
          nextValue[key] = value
        }
      }
      return
    })
    //console.log(nextValue)
    //Save to database
    //this.props.onChange(PatchEvent.from(set(nextValue)))
  }

  //I got this from https://medium.com/javascript-inside/safely-accessing-deeply-nested-values-in-javascript-99bf72a0855a
  getValue = (p, o) => p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, o)

  getValuesArray = (arr, valuePath) => {
    let value = []
    arr.map(i => {
      value.push(this.getValue(valuePath, i))
    })
    return value
  }

  combineValuesArray = (values) => {
    let results = null
    values.map(i => {
      //If it is the first item, make it the results object
      if (results === null) {
        results = i
      } else {
        Object.keys(i).forEach(key => {
          if(results[key] !== i[key] && typeof results[key] !== undefined) {
            if (Array.isArray(results[key])) {
              results[key].push(i[key])
            } else {
              results[key] = [results[key], i[key]]
            }
          } else {
            results[key] = i[key]
          }
        })
      }
    })
    return results
  } 

  simplifyClaims(claims, valuePath) {
    let data = {}
    const results = claims.map(x => {
      let value
      if (x[1].length > 1) { 
        let valuesArray = this.getValuesArray(x[1], valuePath)
        value = this.combineValuesArray(valuesArray)
      } else {
        value = this.getValue(valuePath, x[1][0])
      }
      let qualifiers = this.getValue(['qualifiers'], x[1][0])
      let simplifiedQualifiers = (qualifiers) => {
        let results
        if(qualifiers !== null){
          const qualifiersArray = Object.entries(qualifiers)
          results = this.simplifyClaims(qualifiersArray, ['datavalue', 'value'])
        }
        return results
      }
      let myQualifiers = simplifiedQualifiers(qualifiers)
      data[x[0]] = {...value, ...myQualifiers}
    })
    return data
  }

  filterClaims(schema, claims) {
    const claimsArray = Object.entries(claims.claims)
    const schemaIds = Object.values(schema)    
    function filter(arr, query) {
      return arr.filter(function(el) {
        if (query.includes(el[0])) {
          return true;
        }
      })
    }
    return filter(claimsArray, schemaIds)
  }

  getLabels(data, path) {
    const wikidataId = new RegExp("^(Q[0-9])")
    const wikidataUrl = new RegExp('^http://www.wikidata.org/entity/')
    console.log(path)
    Object.keys(data).map(key => {
      let value = data[key]
      if (isPlainObject(value) === true) {
        path.push(key)
        this.getLabels(value, path)
      } else {
        if (wikidataUrl.test(value)) {
          let newValue = value.replace('http://www.wikidata.org/entity/','')
          value = newValue
        }
        if (wikidataId.test(value)) {
          //Do promise-type stuff here
        }
      }
    })
  }

  async populateFields(id){
    const {type} = this.props
    let fetchedClaims = await this.fetchClaims(id)
    let filteredClaims = await this.filterClaims(type.options.wikidataFields, fetchedClaims)
    let simplifiedClaims = this.simplifyClaims(filteredClaims, ['mainsnak', 'datavalue', 'value'])
    this.getLabels(simplifiedClaims, [])
    //console.log("myData", myData)
    //Add function to get labels from wikidata
    //Add function to get labels from schema
    //this.prepareFieldData(newData)
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