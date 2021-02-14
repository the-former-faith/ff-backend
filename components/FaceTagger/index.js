import './index.css'
import React from 'react' 
import {withDocument} from 'part:@sanity/form-builder'
import client from 'part:@sanity/base/client'
import urlBuilder from '@sanity/image-url'
import Container from './Container'
import Form from './Form'

const FaceTagger = React.forwardRef((props, ref) => {

  // this is called by the form builder whenever this input should receive focus
  //props.onFocus(() => ref)
  const {type} = props

  let imageUlr

  if (props.document[type.options.imageField]) {
    const imageReference = props.document[type.options.imageField]
    imageUlr = urlBuilder(client).image(imageReference)
  }

  return (
    <div>
      <h2>{type.title}</h2>
      <div tabIndex="0" ref={ref}>
        <Container src={imageUlr} {...props} />
      </div>
      <Form {...props} />
    </div>
  )
})

export default withDocument(FaceTagger)