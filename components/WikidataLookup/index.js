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
    //Save to database
    this.props.onChange(PatchEvent.from(set(nextValue)))
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  createQuery = (data, level, prefixes, variable, parent, query) => {
    Object.entries(data).forEach(entry => {
      let key = entry[0]
      let value = entry[1]
      let divider = ''
      if (level > 0) {
        divider = '_'
      }

      query.variables = query.variables.concat(`?${parent + divider + key} ?${parent + divider + key}Label `)
      query.options = query.options.concat(`OPTIONAL { ?${variable} ${prefixes[level]}:${value.id} ?${parent + divider + key}. } `)

      if(typeof value.properties !== 'undefined') {
        let childLevel = level + 1
        let childVariable = key + 'Props'
        let childParent = parent + divider + key
        let prefix = 'p'
        if (childLevel > 1) {
          prefix = 'pqv'
        }
        query.options = query.options.concat(`OPTIONAL { ?${variable} ${prefix}:${value.id} ?${childVariable}. } `)
        this.createQuery(value.properties, childLevel, prefixes, childVariable, childParent, query)
      }
    });
  }

  simplifyData(schema, data) {
    var ids = []
    var newData = {}
    var re = new RegExp("^(Q[0-9])")
    var wikidataUrl = new RegExp('^http://www.wikidata.org/entity/')
    Object.entries(schema).forEach(entry => {
        let key = entry[0]
        let value = entry[1]
        let claims = data.claims
        let claim = claims[value.id]
        if(typeof claim !== 'undefined') {
          claim.forEach(a =>{
            let datavalue = a.mainsnak.datavalue
            if(typeof datavalue !== 'undefined') {
              //Get string values, such as given names
              if(typeof datavalue.value.id !== 'undefined'){
                //target = newData
                //key = key
                //value = datavalue
                function mergeData(target, key, value) {
                  if (typeof target[key] === 'undefined') {
                    target[key] = {}
                  } 
                  
                  if (typeof target[key].id === 'undefined') {
                    target[key].id = []
                  }
                  target[key].id.push(value)
                }
                var result =  datavalue.value.id
                if(re.test(result)) {
                   fetch( `https://www.wikidata.org/w/api.php?action=wbgetentities&props=labels&languages=en&format=json&ids=${result}&origin=*`, { method: 'GET' } )
                    .then( body => {
                      console.log("Fetched")
                      if(body.ok) {
                        return body.json() 
                      } else {
                        console.log("error")
                      }
                    })
                    .then(a => {
                      let newResult = a.entities[result].labels.en.value
                      mergeData(newData, key, newResult)
                    })
                }
              } else {
              //Get object value, such as date of birth.
              //This will be separated off as a function that will be called on each qualifier  
                 value.value.forEach(a => {
                   var result = datavalue.value[a]
                   if(wikidataUrl.test(result)) {
                     var newResult = result.replace('http://www.wikidata.org/entity/','')
                     result = newResult
                   }
                   if(re.test(result)) {
                     ids.push(result)
                   }
                   if (typeof newData[key] === 'undefined') {
                      newData[key] = {}
                   }
                   newData[key][a] = result
                 })        
              }
            }
            if (typeof value.qualifiers !== 'undefined') {
              let schemaQualifiers = value.qualifiers
              
              //Each qualifier gives an array
              Object.entries(schemaQualifiers).forEach(qualifier => {
                let qualifierKey = qualifier[0]
                let qualifierValue = qualifier[1]
                if (typeof a.qualifiers !== 'undefined') {
                  let dataQualifier = a.qualifiers[qualifierValue.id]
                  if(typeof dataQualifier !== 'undefined') {              
                    dataQualifier.forEach(a => {
                      qualifierValue.value.forEach(b => {
                        var result = a.datavalue.value[b]
                        if(wikidataUrl.test(result)) {
                           var newResult = result.replace('http://www.wikidata.org/entity/','')
                           result = newResult
                        }
                        if(re.test(result)) {
                           ids.push(result)
                        }
                        if (typeof newData[key] === 'undefined') {
                          newData[key] = {}
                        }
                        newData[key][b] = result
                      })
                    })
                  }
                }
              })
            }
          })
        }
     })
     return {
        url: 'https://www.wikidata.org/w/api.php?action=wbgetentities&props=labels&languages=en&format=json&ids=' + ids.join('|'),
        keyedData: newData
      }
  }

  populateFields = (id) => {
    const {type} = this.props
    const fullUrl = `https://www.wikidata.org/w/api.php?action=wbgetclaims&entity=${id}&format=json&origin=*`

    //Make sparql query
    var re = new RegExp("^(Q[0-9])");
    if(re.test(id)){
      console.log("good ID")
      fetch( fullUrl, { method: 'GET' } )
        .then( body => {
          console.log("Fetched")
          if(body.ok) {
            return body.json() 
          } else {
            console.log("error")
          }
        })
        .then(a => {
          console.log(a)
          console.log(this.simplifyData(type.options.wikidataFields, a))
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