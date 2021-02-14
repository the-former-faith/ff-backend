import {FormBuilderInput} from 'part:@sanity/form-builder'
import {setIfMissing} from 'part:@sanity/form-builder/patch-event'
import React from 'react' 

const Form = (props) =>  {
  const { level, type, value } = props

  const handleFieldChange = (field, fieldPatchEvent) => {
    const {onChange, type} = props
    // Whenever the field input emits a patch event, we need to make sure to each of the included patches
    // are prefixed with its field name, e.g. going from:
    // {path: [], set: <nextvalue>} to {path: [<fieldName>], set: <nextValue>}
    // and ensure this input's value exists
    onChange(fieldPatchEvent.prefixAll(field.name).prepend(setIfMissing({_type: type.name})))
  }

  return (
    <div>
    {type.fields.map((field) => (
      <FormBuilderInput
        key={field.name}
        type={field.type}
        value={value && value[field.name]}
        onChange={(patchEvent) =>
          handleFieldChange(field, patchEvent)
        }
        path={[field.name]}
        focusPath={props.focusPath}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
      />
    ))}
  </div>
  )
}

export default Form

