export default {
  name: 'chartBlock',
  title: 'Chart',
  type: 'object',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: Rule => Rule.required()
    },
    {
      name: 'type',
      type: 'string',
      title: 'Type',
      validation: Rule => Rule.required(),
      options: {
        list: ['bar', 'line', 'scatter', 'pie', 'percentage']
      }
    },
    {
      title: 'Labels',
      name: 'labels',
      description: 'These are the labels for the data in the chart. They might be years, months, etc.',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      },
      validation: Rule => Rule.required()
    },
    {
      title: 'Datasets',
      name: 'datasets',
      type: 'array',
      of: [{
        type: 'object',
        name: 'dataset',
        fields: [
          {
            title: 'Name',
            name: 'name',
            type: 'string'
          },
          {
            title: 'Values',
            name: 'values',
            type: 'array',
            of: [{type: 'number'}],
            validation: rule => rule.custom((value, schema) => {
              const sectionKey = schema.path[1]._key
              const parentKey = schema.path[4]._key
              const match = (s, c, l = 'en') => 
                schema.document.sections.filter(y => 
                  y._key === s)
                    .map(z => 
                      z.content[l].filter(a => a._key === c))
              const parentValue = match(sectionKey,parentKey)
              if (parentValue[0][0].labels.length === value.length) {
                return true
              } else {
                return 'You need to add the same number of items as there are labels in the chart.'
              }
            })
          },
        ]
      }]
    },
    {
      name: 'caption',
      type: 'simpleBlockContent',
      title: 'Caption',
    }
  ]
}