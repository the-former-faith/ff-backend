export default {
    name: 'timeObject',
    type: 'object',
    title: 'Time',
    options: {
        columns: 3
    },
    fields: [
        {
        type: 'number',
        name: 'hour',
        title: 'Hour',
        validation: Rule => Rule.positive().integer()
        },
        {
        type: 'number',
        name: 'minute',
        title: 'Minute',
        validation: Rule => Rule.positive().max(59).integer()
        },
        {
        type: 'number',
        name: 'second',
        title: 'Second',
        validation: Rule => Rule.positive().max(59).integer()
        }
    ]
}