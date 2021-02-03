export default {
    type: 'object',
    name: 'citationPublicationArticle',
    fields: [
        {
            name: 'source',
            title: 'Source Article',
            type: 'reference',
            to: {type: 'publicationArticle'}
        },
        {
            name: 'pageStart',
            title: 'Start Page',
            type: 'string'
        },
        {
            name: 'pageEnd',
            title: 'End Page',
            type: 'string'
        }
    ],
    preview: {
        select: {
          title: 'source.title.en',
          media: 'source.mainImage'
        }
    }
}