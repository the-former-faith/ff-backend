import User from 'react-icons/lib/fa/user'

export default {
  name: 'person',
  title: 'Person',
  icon: User,
  type: 'document',
  fields: [
    {
      name: 'givenNames',
      title: 'Given Names',
      type: 'localeStringArray',
    },
    {
      name: 'familyName',
      title: 'Family Name',
      type: 'localeString'
    },
    {
      name: 'mainImage',
      title: 'Image',
      type: 'localeImage',
    },
    {
      name: 'dateOfBirth',
      title: 'Date of Birth',
      type: 'dateObject',
    },
    {
      name: 'placeOfBirth',
      title: 'Place of Birth',
      type: 'reference',
      to: [
        { type: 'location' }
      ]
    },
    {
      name: 'dateOfDeath',
      title: 'Date of Death',
      type: 'dateObject',
    },
    {
      name: 'placeOfDeath',
      title: 'Place of Death',
      type: 'reference',
      to: [
        { type: 'location' }
      ]
    },
    {
      name: 'description',
      title: 'Description',
      type: 'localeAdvancedBlockContent'
    }
  ],
  preview: {
    select: {
      givenNames: 'givenNames.en',
      familyName: 'familyName.en',
      media: 'mainImage.en.imageFile.image'
    },
    prepare(selection) {
      const {givenNames, familyName, media } = selection
      return {
        title: givenNames.join(' ') + ' ' + (familyName ? familyName : ''),
        media: media
      }
    }
  }
}