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

  //Create an object of the new data to be sent to the database
  prepareFieldData(data) {
    const {type} = this.props
    const nextValue = {
      _type: type.name
    }
    Object.entries(data).forEach(entry => {
      let key = entry[0]
      let value = entry[1]
      const results = type.fields.find( field => field.name === key );
      if(typeof results !== 'undefined') {
        //Check to make sure that the value being passed into the database is the correct type.
        //Right now, this only works for converting strings into arrays, but other functions could be added later.
        if(results.type.jsonType === 'array'){
          if(typeof value === 'string') {
            const fieldArray = [value]
            nextValue[key] = fieldArray
          } else {
            nextValue[key] = value
          } 
        } else {
          nextValue[key] = value
        }
      }
    });
    console.log(nextValue)
    //Save to database
    //this.props.onChange(PatchEvent.from(set(nextValue)))
  }

  addLabel(target, targetKey, key, value) {
    if (typeof target[key] === 'undefined') {
      target[key] = {}
    }   
    if (typeof target[key][targetKey] === 'string') {
      let newArray = target[key][targetKey]
      target[key][targetKey] = [newArray]
      target[key][targetKey].push(value)
    } else if (Array.isArray(target[key][targetKey])) {
      target[key][targetKey].push(value)
    } else {
      target[key][targetKey] = value
    }
    console.log('addLabel Results', target)
    return target
  }

  async checkLabel(target, targetKey, key, value) {
    const re = new RegExp("^(Q[0-9])")
    const wikidataUrl = new RegExp('^http://www.wikidata.org/entity/')
    if(wikidataUrl.test(value)) {
      let newValue = value.replace('http://www.wikidata.org/entity/','')
      value = newValue
    }
    if(re.test(value)) {
      await fetch( `https://www.wikidata.org/w/api.php?action=wbgetentities&props=labels&languages=en&format=json&ids=${value}&origin=*`, { method: 'GET' } )
        .then( body => {
          if(body.ok) {
            return body.json() 
          } else {
            console.log("error")
          }
        })
        .then(a => {
          let newValue = a.entities[value].labels.en.value
          let results = this.addLabel(target, targetKey, key, newValue)
          return results
        })
    } else {
      return await this.addLabel(target, targetKey, key, value)
    }
  }

  async itterateClaims(target, claim, key, value) {
    let storedClaims = {bug: 'hello'}
    for await (const a of claim) {
      //The data structure for qualifiers is slightly different than claims,
      //So this creates datavalue appropriately
      let datavalue
      if (typeof a.mainsnak !== 'undefined') {
        datavalue = a.mainsnak.datavalue
      } else if (typeof a.datavalue !== 'undefined') {
        datavalue = a.datavalue
      }
      if(typeof datavalue !== 'undefined') {
        value.value.forEach(b => {
          var result = datavalue.value[b]
          if(typeof parentKey !== 'undefined') {
            if (typeof target[parentKey] === 'undefined') {
              target[parentKey] = {}
            }
            storedClaims = this.checkLabel(target[parentKey], b, key, result)
          } else {
            storedClaims = this.checkLabel(target, b, key, result)
          }
        })        
      }
      if (typeof value.qualifiers !== 'undefined' && typeof a.qualifiers !== 'undefined') {
        storedClaims = this.parseData(target, value.qualifiers, a.qualifiers, key)
      }
    }
    console.log('itterateClaims Rusults', storedClaims)
    return storedClaims
  }

  parseData(target, schema, data, parentKey) {
    let myResults
    for (const key in schema) {
      let value = schema[key];
      let claim = data[value.id]
      if (typeof claim !== 'undefined') {
        myResults = this.itterateClaims(target, claim, key, value)
      }
    }
    console.log('ParseData Results', myResults)
    return myResults
  }

  populateFields = (id) => {
    const {type} = this.props
    const fullUrl = `https://www.wikidata.org/w/api.php?action=wbgetclaims&entity=${id}&format=json&origin=*`

    //Make sparql query
    var re = new RegExp("^(Q[0-9])");
    if(re.test(id)){
      fetch( fullUrl, { method: 'GET' } )
        .then( body => {
          if(body.ok) {
            return body.json() 
          } else {
            console.log("error")
          }
        })
        .then(a => {
          var newData = {}
          let bob = this.parseData(newData, type.options.wikidataFields, a.claims)
          console.log('bob', bob)
          return bob
        }).then(b => {
          let dog = b
          console.log("To b or not to b?", dog)
          //this.prepareFieldData(b)
        })
    } else {
      console.log("Ivalid Wikidata ID")
    }
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