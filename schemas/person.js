import CustomObjectInput from '../components/CustomObjectInput'


export default {
  name: 'person',
  title: 'Person',
  type: 'document',
  fields: [
    {
      name: 'label',
      title: 'Display Title',
      type: 'localeString',
    },

    {
      name: 'wikidataId',
      title: 'Wikidata ID',
      type: 'string'
    },
    {
      name: 'givenNames',
      title: 'Given Names',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'familyName',
      title: 'Family Name',
      type: 'string'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'dateOfBirth',
      title: 'Date of Birth',
      type: 'date',
      options: {
        dateFormat: 'YYYY'
      }
    },
    {
      name: 'birthYear',
      title: 'Birth Year',
      type: 'number'
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: []
        }
      ]
    }
  ],
  inputComponent: CustomObjectInput,
  options: {
    wikidataFields: {
      givenNames: 'P735',
      familyName: 'P734',
      dob: 'P569',
      dod: 'P570'
    },
    qualifierLabels: {
      earliest: 'P1319',
      latest: 'P1326',
      sourcingCircumstances: 'P1480'
    },
    wikidataInstanceOf: 'Q5'
  }
}