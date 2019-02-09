import WikidataLookup from '../components/WikidataLookup'

export default {
  name: 'person',
  title: 'Person',
  type: 'document',
  fields: [
    {
      name: 'wikidata',
      type: 'object',
      fields: [
        {
          name: 'wikidataLookup',
          title: 'Lookup Person in Wikidata',
          type: 'string'
        },
        {
          name: 'wikidataId',
          title: 'Wikidata ID',
          type: 'string'
        }
      ],
      inputComponent: WikidataLookup
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
          let slug = formData.givenNames === undefined ? formData.familyName : formData.givenNames.toString() + ' ' + formData.familyName;
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
  preview: {
    select: {
      title: 'name',
      media: 'image'
    }
  }
}