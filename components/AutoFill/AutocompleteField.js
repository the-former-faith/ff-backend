import React, { useState } from 'react'
import { useMachine } from '@xstate/react'
import { createMachine, assign } from 'xstate'
import PatchEvent, {set, unset} from '@sanity/form-builder/PatchEvent'
import { Autocomplete } from '@sanity/ui'
import Option from './Option'

const AutocompleteField = (props) => {

    const { 
        value,
        onChange,
        onQueryChange,
      } = props

    const [options, setOptions] = useState([])

    const handleQueryChange = (query) => {
        // if (query && query.length > 2) {
        //   onQueryChange(query) 
        //   .then( x => setOptions(x))
        // }
      }
    
      const handleSelect = (e) => {
        if(e !== value) {
          fetchFillValues(e)
          onChange(PatchEvent.from( set(e) ))
        }
      }

      const machine = createMachine({
        initial: 'idle',
        states: {
          idle: {
            on: {
              queryChange: { 
                target: 'typing', 
              }
            },
          },
          typing: {
            on: {
              queryChange: { 
                target: 'typing', 
              }
            },
            after: {
              2000: { 
                actions: handleQueryChange,
                target: 'loading' 
              }
            }
          },
          loading: {
            on: {
              queryChange: { 
                actions: 'cancelRequest',
                target: 'typing', 
              }
            },
            after: {
              5000: { target: 'idle' }
            }
          },
        },
      })
    
      const [state, send] = useMachine(machine)

    return (
        <Autocomplete
            fontSize={[2, 2, 3]}
            onQueryChange={e => send('queryChange')}
            onChange={e => handleSelect(e)}
            options={options}
            placeholder="Search for ID"
            filterOption={e => e}
            renderOption={(option) => <Option option={option} />}
            loading={state.value === 'loading'}
        />
    )
}

export default AutocompleteField