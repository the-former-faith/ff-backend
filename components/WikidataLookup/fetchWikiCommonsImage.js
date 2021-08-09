import client from 'part:@sanity/base/client'
import md5 from 'md5'
import parseDate from './parseDate'
import slugify from '../../utils/slugify'

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
  
  return imageRef
}

const postImageDocToSanity = async(options) => {

  const {imageRef, imageMetaData} = options
  parseDate('June 15, 1902')

  const testMeta = { //imageMetaData.query.pages[id (first item?)].imageinfo[0].extmetadata
    "DateTime": {
      "value":"2006-01-15 09:34:37",
    },
    "DateTimeOriginal": {
      "value": "created/published:  c1900.",
    },
    "ObjectName": {
      "value":"Dwight Lyman Moody c.1900",
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
    "Copyrighted":{
      "value":"False",
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
  const doc = async(meta) => {

    const date = (x) => { 
      if (x.DateTimeOriginal) {
        return parseDate(x.DateTimeOriginal.value)
      } else {
        return {
          date: {
            time: x.DateTime.value,
            precision: 7,
            isCirca: false
          }
        }
      }
    }

    console.log(await date(meta))

    return {
      _type: 'imageDoc',
      'title.en': meta.ObjectName.value, //'localeString'
      'slug.en.current': slugify(meta.ObjectName.value), //'localeSlug',
      'file': '',//'image',
      'file.alt.en': meta.ImageDescription.value,
      'authors': [], //'array', of: [{type: 'reference', to: [{type: 'person'}, {type: 'organization'}]}]
      'source': '', //'url',
      'license': meta.License.value, //'string',
      'notes': '', //'simpleBlockContent',
      ...date(meta)
    }
  }

  // const postedDoc = await client.create(doc)

  // const docRef = postedDoc._id

  // return docRef

  console.log(doc(testMeta))
}

const fetchWikiCommonsImage = async(fileName) => {

  //const sanityImageRef = fetchSanityImageRef(fileName)
  //Used for testing only
  const sanityImageRef = {
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
  const wikimediaImageMetaData = fetchImageMetaData(fileName) 

  const imageDocRef = postImageDocToSanity({imageRef: sanityImageRef, imageMetaData: wikimediaImageMetaData})

  //The API call to upload the image to sanity and the one to get metadata from WMC 
  //can happen at the same time.
  //Maybe I can use Promise.all?
  //let values = await Promise.all([coffee, tea, description])

  return imageDocRef
}

export default fetchWikiCommonsImage