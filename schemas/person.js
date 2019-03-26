import CustomObjectInput from '../components/CustomObjectInput'


export default {
  name: 'person',
  title: 'Person',
  type: 'document',
  fields: [
    {
      name: 'label',
      title: 'Display Title',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'imageObject',
    },
    {
      name: 'dateOfBirth',
      title: 'Date of Birth',
      type: 'dateObject',
    },
  ],
  preview: {
    select: {
      title: 'label'
    }
  }
}