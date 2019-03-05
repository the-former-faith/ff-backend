import React from 'react'
import PropTypes from 'prop-types'

import FormField from 'part:@sanity/components/formfields/default'
import Autocomplete from 'react-autocomplete'
import styles from './index.css'

export default class WikidataLookup extends React.Component {
  static propTypes = {
    type: PropTypes.shape({
      title: PropTypes.string,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired
  }

  state = {
    input: "",
    results: []
  };

  // this is called by the form builder whenever this input should receive focus
  focus() {
    this._inputElement.focus()
  }

  searchWikidata(event){
    const {type, instanceOf} = this.props
    const endpointUrl = 'https://query.wikidata.org/sparql'
    const sparqlQuery = `SELECT ?value ?label ?image ?description WHERE {
        ?value wdt:P31 wd:${instanceOf}.
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

  handleSourceChange = event => {
    const {type} = this.props
    const inputValue = event.target.value
    this.searchWikidata(inputValue);
    this.setState({ input: inputValue })
  }

  handleSelect = (a, b) => {
    const {onSelect} = this.props
    onSelect(a, b)
    this.setState({ input: a})
  }

  render() {
    const {type, onChange} = this.props
    const {results, input} = this.state

    return (
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
          value={input}
          onChange={this.handleSourceChange}
          onSelect={(e, d) => this.handleSelect(e, d)}
          ref={element => this._inputElement = element}
        />
      </FormField>
    )
  }
}