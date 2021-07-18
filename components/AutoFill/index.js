import React, { useState } from 'react' 
import { Autocomplete, Grid, Stack, Label, TextInput } from '@sanity/ui'
import { FormField } from '@sanity/base/components'
import Option from './Option'
import client from 'part:@sanity/base/client'
import urlBuilder from '@sanity/image-url'

const AutoFill = React.forwardRef((props, ref) => {

  //TODO Create 3 props to make re-usable
  //1. Options (object) - contain the fields to be matched with Autocomplete results
  //2. Handle Search Change (function)
  //3. Handle Text Input Change (function)
  //So all external API calls will be handled by individual instances,
  //and this will handle layout, basic function between the 2 inputs, and Sanity patches

  const [options, setOptions] = useState([])

  const { 
    type,
    value,
    readOnly,
    placeholder,
    markers,
    presence,
    compareValue,
    onFocus,
    onBlur, 
    onQueryChange,
  } = props

  //This works! It's so simple!
  //client.patch(props.document._id).set({'familyName.en': 'Money'}).commit()

  const handleQueryChange = (query) => {
    if (query && query.length > 2) {
      onQueryChange(query) 
      .then( x => setOptions(x))
    }
  }

  return (
    <FormField
      description={type.description}  // Creates description from schema
      title={type.title}              // Creates label from schema title
      __unstable_markers={markers}    // Handles all markers including validation
      __unstable_presence={presence}  // Handles presence avatars
      compareValue={compareValue}     // Handles "edited" status
    >
      <Grid columns={2} gap={2} padding={4}>
        <Stack space={2}>
          <Label>Search</Label>
          <Autocomplete
            fontSize={[2, 2, 3]}
            onQueryChange={e => handleQueryChange(e)}
            onChange={e => console.log(e)}
            options={options}
            placeholder="Search for ID"
            filterOption={e => e}
            renderOption={(option) => <Option option={option} />}
          />
        </Stack>
        <Stack space={2}>
          <Label>Text</Label>
          <TextInput
            value={value}
            readOnly={readOnly}
            placeholder={placeholder}
            onFocus={onFocus}
            onBlur={onBlur}
            ref={ref}
          />
        </Stack>
      </Grid>
    </FormField>
  )
}
)

export default AutoFill