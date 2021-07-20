import React from 'react'
import { useMachine } from '@xstate/react'
import { createMachine, assign } from 'xstate'
import { Autocomplete } from '@sanity/ui'
import Option from './Option'

const AutocompleteField = (props) => {

    const { fetchOptionsCallback } = props

    const assignValue = assign({fieldValue: (context, event) => event.value ? event.value : context.fieldValue})

    const assignOptions = assign({options: (context, event) => event.options ? event.options : []})

    //TODO Catch errors and display them (https://www.sanity.io/ui/docs/component/toast)
    //TODO Set timeout
    //TODO Create cancel fetch function
    //(It probably will be best to make it a reusable utillity)
    const fetchOptions = (query) => {
      if (query.fieldValue && query.fieldValue.length > 2) {
        fetchOptionsCallback(query.fieldValue) 
        .then( x => send({type: 'loaded', options: x}))
      }
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
        fieldValue: '',
        options: []
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
              actions: fetchOptions,
              target: 'loading' 
            }
          }
        },
        loading: {
          on: {
            queryChange: { 
              actions: [assignValue, 'cancelRequest'],
              target: 'typing', 
            },
            loaded: { 
              actions: [assignOptions],
              target: 'idle', 
            }
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
            options={state.context.options}
            placeholder="Search for ID"
            filterOption={e => e}
            renderOption={(option) => <Option option={option} />}
            loading={state.value === 'loading'}
            value={state.context.fieldValue}
            renderValue = {(a) => state.context.fieldValue}
        />
      </>
    )
}

export default AutocompleteField