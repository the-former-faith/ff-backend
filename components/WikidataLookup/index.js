import React from 'react'
import PropTypes from 'prop-types'

import FormField from 'part:@sanity/components/formfields/default'
import PatchEvent, {set, unset} from 'part:@sanity/form-builder/patch-event'
import Autocomplete from 'react-autocomplete'
import styles from './index.css'

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
    onChange: PropTypes.func.isRequired
  }

  state = {
    results: []
  };

  // this is called by the form builder whenever this input should receive focus
  focus() {
    this._inputElement.focus()
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

    const nextValue = {
      _type: type.name,
      wikidataId: id,
      wikidataLookup: title
    }

    const patch = title === '' ? unset() : set(nextValue)
    this.props.onChange(PatchEvent.from(patch))
    console.log(value.id);
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

  render() {
    const {type, value, onChange} = this.props
    const {results} = this.state

    return (
      <div>
        <FormField label={type.title} description={type.description}>
          <Autocomplete
            className={styles.customText}
            getItemValue={(item) => item.label}
            items={results}
            menuStyle={{
              borderRadius: '3px',
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
              background: 'rgba(255, 255, 255, 0.9)',
              padding: '2px 0',
              fontSize: '90%',
              position: 'fixed',
              overflow: 'auto',
              maxHeight: '50%',
              zIndex: 100
            }}
            inputProps={{className: styles.customTextInput}}
            renderItem={(item, isHighlighted) =>
              <div style={{ background: isHighlighted ? 'lightgray' : 'white' }} data-id={item.value}>
                {item.image &&
                  <img width="40" src={item.image} />
                }
                <h2>{item.label}</h2>
                <p>{item.description}</p>
              </div>
            }
            type="text"
            value={value === undefined ? '' : value.wikidataLookup}
            onChange={this.handleSourceChange}
            onSelect={(e, d) => this.handleSelect(e, d)}
            ref={element => this._inputElement = element}
          />
        </FormField>
        <FormField label="Wikidata ID" description={type.description}>
          <input
            type="text"
            value={value === undefined ? '' : value.wikidataId}
            onChange={this.handleSourceChange}
            
          />
        </FormField>
      </div>
    )
  }
}