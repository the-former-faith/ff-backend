import React, { useState } from 'react'
import { Grid, Stack, Label, TextInput } from '@sanity/ui'
import PatchEvent, {set, unset} from '@sanity/form-builder/PatchEvent'
import { FormField } from '@sanity/base/components'
import AutocompleteField from './AutocompleteField'


const AutoFill = (props) => {

  //TODO Create 3 props to make re-usable
  //1. Options (object) - contain the fields to be matched with Autocomplete results
  //2. Handle Search Change (function)
  //3. Handle Text Input Change (function)
  //So all external API calls will be handled by individual instances,
  //and this will handle layout, basic function between the 2 inputs, and Sanity patches

  //This will be set when the text field gains focus
  //and it will be compared with the value onblur.
  //The call to API should only change if the value is different.
  const [initialValue, setInitialValue] = useState(value)

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
    fetchFillValuesCallback,
    currentRef
  } = props

  //This works! It's so simple!
  //client.patch(props.document._id).set({'familyName.en': 'Money'}).commit()

  //TODO this is always firing even if nothing changed
  //so I will have to use my initialValue
  const handleBlur = React.useCallback(
    // useCallback will help with performance
    (event) => {
      const inputValue = event.currentTarget.value
      onBlur(fetchFillValues(inputValue))
    },
    [onBlur]
  )

  const handleChange = React.useCallback(
    // useCallback will help with performance
    (event) => {
      const inputValue = event.currentTarget.value // get current value
      // if the value exists, set the data, if not, unset the data
      onChange(PatchEvent.from(inputValue ? set(inputValue) : unset()))
    },
    [onChange]
  )


  //This will be called both on text input blur
  //and Autocomplete select
  const fetchFillValues = (e) => {
    fetchFillValuesCallback(e)
  }

  return (
    <FormField
      description={type.description}  // Creates description from schema
      title={type.title}              // Creates label from schema title
      __unstable_markers={markers}    // Handles all markers including validation
      __unstable_presence={presence}  // Handles presence avatars
      compareValue={compareValue}     // Handles "edited" status
    >
      <Grid columns={[1, 1, 2, 2]} gap={2} padding={4}>
        <Stack space={2}>
          <Label>Search</Label>
          <AutocompleteField {...props} />
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