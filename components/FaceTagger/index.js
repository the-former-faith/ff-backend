import React from 'react' 
import {withDocument} from 'part:@sanity/form-builder'
import PatchEvent, {set, unset} from 'part:@sanity/form-builder/patch-event'

const client = {
  projectId: 'tuiw9zvo',
  dataset: 'production',
}

const createPatchFrom = value => PatchEvent.from(value === '' ? unset() : set(Number(value)))

const FaceTagger = React.forwardRef((props, ref) => {

  //const inputRef = React.useRef()

  // this is called by the form builder whenever this input should receive focus
  props.onFocus(() => ref)
  const {type, value, onChange} = props
  const {min, max, step} = type.options.range

  const imageReference = props.document[type.options.imageField].asset._ref
  const imageExtension = imageReference.slice(-3)
  const imageUlr = `https://cdn.sanity.io/images/${client.projectId}/${client.dataset}/${imageReference.slice(6,-4)}.${imageExtension}`

  console.log(props)

  return (
    <div>
      <h2>{type.title}</h2>
      <img src={imageUlr} style={{width: '100%'}} tabIndex="0" ref={ref} onFocus={()=> console.log('focus pocus!')} />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value === undefined ? '' : value}
        onChange={event => onChange(createPatchFrom(event.target.value))}
        //onFocus={()=> console.log('focus pocus!')}
      />
    </div>
  )
})

export default withDocument(FaceTagger)