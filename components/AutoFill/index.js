import React, { useState, useEffect } from 'react'
import { Grid, Stack, Label, TextInput } from '@sanity/ui'
import PatchEvent, {set, unset} from '@sanity/form-builder/PatchEvent'
import { FormField } from '@sanity/base/components'
import client from 'part:@sanity/base/client'
import AutocompleteField from './AutocompleteField'
import {useDocumentOperation} from '@sanity/react-hooks'

const AutoFill = (props) => {

  //TODO Create 3 props to make re-usable
  //1. Options (object) - contain the fields to be matched with Autocomplete results
  //2. Handle Search Change (function)
  //3. Handle Text Input Change (function)
  //So all external API calls will be handled by individual instances,
  //and this will handle layout, basic function between the 2 inputs, and Sanity patches

  const [selectedOption, setSelectedOption] = useState(null)

  const { 
    type,
    value,
    readOnly,
    placeholder,
    markers,
    presence,
    compareValue,
    onChange,
    onFocus,
    onBlur, 
    fieldsToFill,
    currentRef
  } = props

  const handleSelectCallback = async(e) => {
    onChange( PatchEvent.from(e.value ? set(e.value) : unset()) )
    const fields = await fieldsToFill(e)
    setSelectedOption(fields)
  }

  useEffect(() => {
    if(value && selectedOption){
      client.patch(props.document._id).setIfMissing(selectedOption).commit()
    }
  }, [selectedOption, value])

  //TODO set up autofill on blur
  const handleBlur = React.useCallback(
    // useCallback will help with performance
    (event) => {
      const inputValue = event.currentTarget.value
      //onBlur(fetchFillValues(inputValue))
    },
    [onBlur]
  )

  const handleChange = React.useCallback(

    (event) => {
      const inputValue = event.currentTarget.value

      onChange(PatchEvent.from(inputValue ? set(inputValue) : unset()))
    },
    [onChange]
  )

  return (
    <FormField
      description={type.description}  // Creates description from schema
      title={type.title}              // Creates label from schema title
      __unstable_markers={markers}    // Handles all markers including validation
      __unstable_presence={presence}  // Handles presence avatars
      compareValue={compareValue}     // Handles "edited" status
    >
      <Grid columns={[1, 1, 2, 2]} gap={2} >
        <Stack space={2}>
          <Label>Search</Label>
          <AutocompleteField {...props} handleSelectCallback={handleSelectCallback} />
        </Stack>
        <Stack space={2}>
          <Label>Text</Label>
          <TextInput
            id="fgfgf666gjjgjhguu8"
            value={value}
            readOnly={readOnly}
            placeholder={placeholder}
            onFocus={onFocus}
            onChange={handleChange}
            onBlur={handleBlur}
            ref={currentRef}
          />
        </Stack>
      </Grid>
    </FormField>
  )
}

export default AutoFill