import React from 'react'
import { useMachine } from '@xstate/react'
import { createMachine, assign } from 'xstate'
import { Autocomplete, useToast } from '@sanity/ui'
import Option from './Option'

const AutocompleteField = (props) => {

    const { 
      fetchOptionsCallback,
      handleSelectCallback
    } = props

    const toast = useToast()

    const assignValue = assign({fieldValue: (context, event) => event.value ? event.value : context.fieldValue})

    const assignOptions = assign({options: (context, event) => event.options ? event.options : []})

    const sendTimeOutToast = () => toast.push({
      title: 'Search Timed Out',
      status: 'error',
    })

    const filterResults = (q, i) => {
      //TODO fix filter to actually filter out names.
      //Then, I can combine arrays from fetch results instead of replacing them.
      return i.payload.instanceOf === 'Q5'
    }

    //TODO Catch errors and display them (https://www.sanity.io/ui/docs/component/toast)
    //TODO Create cancel fetch function
    //(It probably will be best to make it a reusable utillity)
    const fetchOptions = async(query) => {
      if (query.fieldValue && query.fieldValue.length > 2) {
        const options = await fetchOptionsCallback(query.fieldValue) 
        
        send({type: 'loaded', options: options})
      }
    }
    
    const handleSelect = (context, event) => {
      const option = context.options.find(x => x.value === event.value)
      handleSelectCallback(option)
    }

    const machine = createMachine({
      initial: 'idle',
      context: {
        fieldValue: '',
        options: []
      },
      states: {
        idle: {
          on: {
            select: { 
              actions: [handleSelect],
              target: 'idle', 
            },
            queryChange: { 
              actions: [assignValue],
              target: 'typing', 
            },
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
          },
          after: {
            300000: { 
              actions: [sendTimeOutToast, 'cancelRequest'],
              target: 'idle' 
            }
          }
        },
      },
    })
  
    const [state, send] = useMachine(machine)

    //TODO it is sending a queryChange even on blur,
    //even though the content doesn't change.
    //Change the event handler to only send Xstate change event is value changed.
    return (
      <Autocomplete
          fontSize={[2, 2, 3]}
          onQueryChange={e => send({type: 'queryChange', value: e})}
          onSelect={e => send({type: 'select', value: e})}
          options={state.context.options}
          placeholder="Search for ID"
          renderOption={(option) => <Option option={option} />}
          loading={state.value === 'loading'}
          value={state.context.fieldValue}
          renderValue = {(a) => state.context.fieldValue}
          filterOption = {(q, i)  => filterResults(q, i)}
      />
    )
}

export default AutocompleteField