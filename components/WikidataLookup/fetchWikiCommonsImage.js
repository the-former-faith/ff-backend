import client from 'part:@sanity/base/client'
import md5 from 'md5'

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

  const doc = {
    _type: imageDoc,
    
  }

  const postedDoc = await client.create(doc)

  const docRef = postedDoc._id

  return docRef
}

const fetchWikiCommonsImage = async(name) => {

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