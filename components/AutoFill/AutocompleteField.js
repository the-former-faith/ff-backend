import React, { useState } from 'react'
import { useMachine } from '@xstate/react'
import { createMachine, assign } from 'xstate'
import PatchEvent, {set, unset} from '@sanity/form-builder/PatchEvent'
import { Autocomplete } from '@sanity/ui'
import Option from './Option'

const AutocompleteField = (props) => {

    const { 
  
      } = props

    const [options, setOptions] = useState([])

    const assignValue = assign({fieldValue: (context, event) => event.value ? event.value : context.fieldValue})

    const handleQueryChange = (query) => {
        //console.log(state.context)
        // if (query && query.length > 2) {
        //   onQueryChange(query) 
        //   .then( x => setOptions(x))
        // }
      }
    
      // const handleSelect = (e) => {
      //   if(e !== value) {
      //     fetchFillValues(e)
      //     onChange(PatchEvent.from( set(e) ))
      //   }
      // }

      const machine = createMachine({
        initial: 'idle',
        context: {
          fieldValue: 'Hmm'
        },
        states: {
          idle: {
            on: {
              queryChange: { 
                actions: [assignValue],
                target: 'typing', 
              }
            },
          },
          typing: {
            on: {
              queryChange: { 
                actions: [assignValue],
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
                actions: [assignValue, 'cancelRequest'],
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
      <>
        <p>{state.value}</p>
        <p>{state.context.fieldValue}</p>
        <Autocomplete
            fontSize={[2, 2, 3]}
            onQueryChange={e => send({type: 'queryChange', value: e})}
            //onChange={e => handleSelect(e)}
            onChange={e => console.log('Changed: ', e)}
            onSelect={e => console.log('Selected: ', e)}
            // onQueryChange={e => console.log('Query Changed: ', e)}
            options={options}
            placeholder="Search for ID"
            filterOption={e => e}
            renderOption={(option) => <Option option={option} />}
            loading={state.value === 'loading'}
            value={state.context.fieldValue}
            renderValue = {(a) => state.context.fieldValue}
            //value="Monkey"
        />
      </>
    )
}

export default AutocompleteField