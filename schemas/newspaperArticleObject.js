export default {
  name: 'newspaperArticleObject',
  title: 'Newspaper Article',
  type: 'object',
  fields: [
    { name: 'embed',
      type: 'reference',
      to: [{type: 'newspaperArticle'}]
    },
    { name: 'caption',
      type: 'simpleBlockContent',
      title: 'Caption'
    }
  ],
  preview: {
    select: {
      title: 'caption',
      media: 'embed.file'
    }
  }
}