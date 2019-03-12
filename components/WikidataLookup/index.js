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
    return
  }

  checkLabel(value) {
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
          let label = a.entities[value].labels.en.value
          return label
        })
    }
    return value
  }

  parseData(target, schema, data, parentKey){
    Object.entries(schema).forEach(entry => {
      let key = entry[0]
      let value = entry[1]
      let claim = data[value.id]
      if (typeof claim !== 'undefined') {
        claim.forEach(a =>{
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
                //return this.addLabel(target[parentKey], b, key, value)
                return this.addLabel(target[parentKey], b, key, result)
              } else {
                //return this.addLabel(target, b, key, value)
                return this.addLabel(target, b, key, result)
              }
            })        
          }
          if (typeof value.qualifiers !== 'undefined' && typeof a.qualifiers !== 'undefined') {
            this.parseData(target, value.qualifiers, a.qualifiers, key)
          }
        })
      }
    })
  }

  //Create an object of the new data to be sent to the database
  async prepareFieldData(data) {
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
    })
    console.log(nextValue)
    //Save to database
    //this.props.onChange(PatchEvent.from(set(nextValue)))
  }

  async populateFields(id){
    const {type} = this.props
    let newData = {}
    let claims = await this.fetchClaims(id)
    let parsedClaims = await this.parseData(newData, type.options.wikidataFields, claims.claims)
    this.prepareFieldData(newData)
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