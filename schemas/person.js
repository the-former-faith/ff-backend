import WikidataLookup from '../components/WikidataLookup'
import AutoComplete from '../components/AutoComplete'

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
      name: 'wikidataLookup',
      title: 'Lookup Person in Wikidata',
      type: 'string',
      inputComponent: AutoComplete,
      options: {
        wikidataInstanceOf: 'Q5'
      }
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
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: formData => {
          let slug = formData.label;
          return slug
        },
        maxLength: 96
      }
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
  inputComponent: WikidataLookup,
  options: {
    wikidataFields: {
      givenNames: 'P735',
      familyName: 'P734'
    },
    wikidataInstanceOf: 'Q5'
  },
  preview: {
    select: {
      title: 'label',
      media: 'image'
    }
  }
}