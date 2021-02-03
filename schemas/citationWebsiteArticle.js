export default {
  type: 'object',
  name: 'citationWebsiteArticle',
  fields: [
    {
        name: 'source',
        title: 'Source Website Article',
        type: 'reference',
        to: {type: 'websiteArticle'}
    }
  ],
  preview: {
    select: {
      title: 'source.title.en',
      media: 'source.mainImage'
    }
  }
}