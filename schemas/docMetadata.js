export default [
	{
		name: 'title',
		title: 'Title',
		type: 'localeString',
		validation: Rule => Rule.required()
	},
	{
		name: 'slug',
		title: 'Slug',
		type: 'localeSlug',
		options: {
			source: 'title',
			maxLength: 96,
			isUnique: input => input
		},
		validation: Rule => Rule.required()
	},
	{
		name: 'subtitle',
		title: 'Sub Title',
		type: 'localeString'
	},
	{
		name: 'authors',
		title: 'Authors',
		type: 'array',
		validation: Rule => Rule.unique().error('You can only have one of a person'),
		of: [{type: 'reference', to: {type: 'person'}}],
		fieldset: 'metadata'
	},
	{
		name: 'mainImage',
		title: 'Main image',
		type: 'reference', to: [{type: 'imageDoc'},{type: 'newspaperArticle'}],
	},
	{
		name: 'longDescription',
		title: 'Long Description',
		type: 'localeSimpleBlockContent',
		fieldset: 'metadata'
	},
	{
		name: 'shortDescription',
		title: 'Short Description',
		type: 'localeBlurb',
		description: 'This will be shown in list views and shared on social media. 140 characters max length.',
		fieldset: 'metadata'
	},
	{
		name: 'content',
		title: 'Content',
		type: 'localeAdvancedBlockContent'
	},
]