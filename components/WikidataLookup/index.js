import React from 'react'
import PropTypes from 'prop-types'

import Autocomplete from 'react-autocomplete'
import PatchEvent, {set, unset} from 'part:@sanity/form-builder/patch-event'

const createPatchFrom = value => PatchEvent.from(value === '' ? unset() : set(String(value)))

export default class WikidataLookup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
  }
  static propTypes = {
    type: PropTypes.shape({
      title: PropTypes.string,
    }).isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired
  };

  // this is called by the form builder whenever this input should receive focus
  focus() {
    this._inputElement.focus()
  }

  render() {
    const {type, value, onChange} = this.props
    const {results} = this.state

    return (
      <div>
        <h2>{type.title}</h2>
        <Autocomplete
          getItemValue={(item) => item.label}
          items={results}
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
          value={value === undefined ? '' : value}
          onChange={event => onChange(createPatchFrom(event.target.value))}
          ref={element => this._inputElement = element}
        />
      </div>
    )
  }
}