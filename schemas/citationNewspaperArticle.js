export default {
    type: 'object',
    name: 'citationNewspaperArticle',
    fields: [
        {
            name: 'source',
            title: 'Source Newspaper Article',
            type: 'reference',
            to: {type: 'newspaperArticle'}
        }
    ],
    preview: {
        select: {
          title: 'source.title.en',
          media: 'source.mainImage.imageFile.image'
        }
    }
}