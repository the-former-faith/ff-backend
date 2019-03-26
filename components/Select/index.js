import React from 'react'
import PropTypes from 'prop-types'

import PatchEvent, {set, unset} from 'part:@sanity/form-builder/patch-event'

const createPatchFrom = (value) => PatchEvent.from(value === '' ? unset() : set(value))



export default class Select extends React.Component {
  static propTypes = {
    type: PropTypes.shape({
      title: PropTypes.string,
      options: PropTypes.shape({
        values: PropTypes.array.isRequired
      }).isRequired
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
    const {values} = type.options
    const optionItems = values.map((opt) =>
      <option value={opt.value} key={opt.value} >{opt.title}</option>
    )

    return (
      <div>
        <h2>{type.title}</h2>
        <select
          value={value === undefined ? '' : value}
          onChange={event => {
            let myVal = event.target.value
            if (type.jsonType === 'number') {
              myVal = Number(myVal)
            }
            onChange(createPatchFrom(myVal))}
          }
          ref={element => this._inputElement = element}
        >
          <option value="">Select {type.title}</option>
          {optionItems}
        </select>
      </div>
    )
  }
}