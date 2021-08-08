import client from 'part:@sanity/base/client'
import md5 from 'md5'
import parseDate from './parseDate'

const fetchImageMetaData = async (name) => {

  const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=Image:${encodeURIComponent(name)}&prop=imageinfo&iiprop=extmetadata&format=json&origin=*`

  const headers = { method: 'GET' }

  const body = await fetch(url, headers)

  return await body.json()
}

const fetchSanityImageRef = async (name) => {

  const formattedName = name.split(' ').join('_')

  const hash = md5(formattedName)

  const url = `https://upload.wikimedia.org/wikipedia/commons/${hash.substring(0, 1)}/${hash.substring(0, 2)}/${formattedName}`

  const imageFile = await fetch(url)
      
  const imageRef = await client.assets.upload('image', imageFile.blob())
  
  console.log(imageRef)
}

const postImageDocToSanity = async(options) => {

  const {imageRef, imageMetaData} = options

  const testMeta = { //imageMetaData.query.pages[id (first item?)].imageinfo[0].extmetadata
    "DateTime": {
      "value":"2006-01-15 09:34:37",
      "source":"mediawiki-metadata",
      "hidden":""
    },
    "DateTimeOriginal": {
      "value": "created/published:  c1900.",
      "source":"commons-desc-page"
    },
    "ObjectName": {
      "value":"Dwight Lyman Moody c.1900",
      "source":"mediawiki-metadata",
      "hidden":""
    },
    "Categories":{
      "value":"Dwight Lyman Moody|Images from the Library of Congress|PD US",
      "source":"commons-categories",
      "hidden":""
    },
    "Assessments":{
      "value": "",
      "source": "commons-categories",
      "hidden": ""
    },
    "ImageDescription":{
      "value":"Dwight Lyman Moody, founder of the Northfield Seminary, Mount Hermon School, and the Moody Bible Institute, circa 1900. Edited image from the Library of Congress",
      "source":"commons-desc-page"
    },
    "Credit":{
      "value":"This image  is available from the United States <a href=\"//commons.wikimedia.org/wiki/Library_of_Congress\" title=\"Library of Congress\">Library of Congress</a>'s <a rel=\"nofollow\" class=\"external text\" href=\"//www.loc.gov/rr/print/\">Prints and Photographs division</a><br> under the digital ID <a rel=\"nofollow\" class=\"external text\" href=\"http://hdl.loc.gov/loc.pnp/cph.3c22752\">cph.3c22752</a>.<br><small>This tag does not indicate the copyright status of the attached work. A normal copyright tag is still required. See <a href=\"//commons.wikimedia.org/wiki/Commons:Licensing\" title=\"Commons:Licensing\">Commons:Licensing</a> for more information.</small>",
      "source":"commons-desc-page",
      "hidden":""
    },
    "Artist":{
      "value":"Copyright by Barron Fredricks, NYC.<br>D11791  U.S. Copyright Office.",
      "source":"commons-desc-page"
    },
    "Permission":{
      "value":"This image might not be in the public domain outside of the United States; this especially applies in the countries and areas that do not apply the <a href=\"https://en.wikipedia.org/wiki/rule_of_the_shorter_term\" class=\"extiw\" title=\"w:rule of the shorter term\">rule of the shorter term</a> for US works, such as Canada, Mainland China (not Hong Kong or Macao), Germany, Mexico, and Switzerland. The creator and year of publication are essential information and must be provided. See <a href=\"https://en.wikipedia.org/wiki/Wikipedia:Public_domain\" class=\"extiw\" title=\"w:Wikipedia:Public domain\">Wikipedia:Public domain</a> and <a href=\"https://en.wikipedia.org/wiki/Wikipedia:Copyrights\" class=\"extiw\" title=\"w:Wikipedia:Copyrights\">Wikipedia:Copyrights</a> for more details.",
      "source":"commons-desc-page",
      "hidden":""
    },
    "LicenseShortName":{
      "value":"Public domain",
      "source":"commons-desc-page",
      "hidden":""
    },
    "UsageTerms":{
      "value":"Public domain",
      "source":"commons-desc-page",
      "hidden":""
    },
    "AttributionRequired":{
      "value":"false",
      "source":"commons-desc-page",
      "hidden":""
    },
    "Copyrighted":{
      "value":"False",
      "source":"commons-desc-page",
      "hidden":""
    },
    "Restrictions":{
      "value":"",
      "source":"commons-desc-page",
      "hidden":""
    },
    "License":{ //This is what I will want to use. I have to update my vales to match
      "value":"pd",
      "source":"commons-templates",
      "hidden":""
    }
  }

  //This is what I will use for posting to Sanity
  const doc = {
    _type: imageDoc,
    'title': '', //'localeString'
    'slug': '', //'localeSlug',
    'file': {
      'alt': ''
    }, //'image',
    'authors': [], //'array', of: [{type: 'reference', to: [{type: 'person'}, {type: 'organization'}]}]
    'date': '', //'dateObject',
    'dateEnd': '', //'dateObject','Latest Possible Date Created',
    'source': '', //'url',
    'license': '', //'string',
        // options: {
        //   list: [
        //     {title: 'Unknown', value: 'NA'},
        //     {title: 'Copyright', value: 'C'},
        //     {title: 'Public Domain', value: 'PD'},
        //     {title: 'Creative Commons Attribution (CC BY)', value: 'CC_BY'},
        //     {title: 'Creative Commons Attribution ShareAlike (CC BY-SA)', value: 'CC_BY-SA'},
        //     {title: 'Creative Commons Attribution-NoDerivs (CC BY-ND)', value: 'CC_BY-ND'},
        //     {title: 'Creative Commons Attribution-NonCommercial (CC BY-NC)', value: 'CC_BY-NC'},
        //     {title: 'Creative Commons Attribution-NonCommercial-ShareAlike (CC BY-NC-SA)', value: 'CC_BY-NC-SA'},
        //     {title: 'Attribution-NonCommercial-NoDerivs (CC BY-NC-ND)', value: 'CC_BY-NC-ND'},
        //   ]
        // }
    'notes': '', //'simpleBlockContent',
  }

  const postedDoc = await client.create(doc)

  const docRef = postedDoc._id

  return docRef
}

const fetchWikiCommonsImage = async(name) => {

  parseDate('June 15, 1902')

  //Used for testing only
  const imageRef = {
    "_createdAt": "2021-07-26T13:11:00Z",
    "_id": "image-8d21021ae5732254310eeb4ad3fcccccb365fb99-382x510-jpg",
    "_rev": "NBukuEP541RDcIrdO6t4p1",
    "_type": "sanity.imageAsset",
    "_updatedAt": "2021-07-26T13:11:27Z",
    "assetId": "8d21021ae5732254310eeb4ad3fcccccb365fb99",
    "extension": "jpg",
    "metadata": {
      "_type": "sanity.imageMetadata",
      "dimensions": {
        "_type": "sanity.imageDimensions",
        "aspectRatio": 0.7490196078431373,
        "height": 510,
        "width": 382
      },
      "hasAlpha": false,
      "isOpaque": true,
      "lqip": "data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAbABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAYHBQj/xAAlEAABAwMDBQEBAQAAAAAAAAABAgMEAAURBhIhByIxQWETUYH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8ArGuLxcnJSbVZVlt1XC3B5HwUmrOqdKXFp4yXn2V8r3K3IPw/abpdyt8K9KVJfaTIUs9pPNLV11BHuOoWoZQExys7V/r5P9IoKxY7o3dbYxLb7d45SfR9iik60vqgx1ssZ2BZPBooIz13tc6y6yM9P6CDJ70LHgK9ipA5KlypgU2pwuKV24Jzn5XduobVBu9rej3KK1JZwTtcGeamvT/SFgb1E8tNrj7mjlGcnaf9NBudJ9OTImiYQuzrhlOZcIXyUg4wKKo4AAAAwKKD/9k=",
    },
    "mimeType": "image/jpeg",
    "originalFilename": "8d21021ae5732254310eeb4ad3fcccccb365fb99-382x510.jpg",
    "path": "images/tuiw9zvo/production/8d21021ae5732254310eeb4ad3fcccccb365fb99-382x510.jpg",
    "sha1hash": "8d21021ae5732254310eeb4ad3fcccccb365fb99",
    "size": 19034,
    "uploadId": "wGYtySedzGCuuJIQAFdScFvIFRDIyO18",
    "url": "https://cdn.sanity.io/images/tuiw9zvo/production/8d21021ae5732254310eeb4ad3fcccccb365fb99-382x510.jpg"
  }

  //The API call to upload the image to sanity and the one to get metadata from WMC 
  //can happen at the same time.
  //Maybe I can use Promise.all?
  //let values = await Promise.all([coffee, tea, description]);
}

export default fetchWikiCommonsImage