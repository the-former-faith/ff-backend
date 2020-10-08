export default {
    type: 'object',
    name: 'citationBook',
    fields: [
        {
            name: 'source',
            title: 'Source Book',
            type: 'reference',
            to: {type: 'book'}
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
          media: 'source.mainImage.imageFile.image'
        }
    }
}