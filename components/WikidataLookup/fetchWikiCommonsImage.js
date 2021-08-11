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

  const imageFile = await fetch(url).then(x => x.blob())
      
  const imageRef = await client.assets.upload('image', imageFile).then(a => a._id)
  
  return imageRef
}

const postImageDocToSanity = async(mutation) => {

  const postedDoc = await client.create(mutation)

  const docRef = postedDoc._id

  return docRef

}

const createMutation = async(options) => {

  const {imageRef, imageMetaData} = options

  const meta = Object.values(imageMetaData.query.pages)[0].imageinfo[0].extmetadata

  const date = async(x) => { 
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

  return {
    '_type': 'imageDoc',
    'title': {'en': meta.ObjectName.value},
    'slug': {'en': {'current': slugify(meta.ObjectName.value)} },
    'file': {
      asset: {
        _ref: imageRef,
      },
      alt: {'en': meta.ImageDescription ? meta.ImageDescription.value : meta.ObjectName.value},
    },
    'authors': meta.Artist ? [{"_key": "a84c87d2ee6d", "title": {"en": meta.Artist.value.replace(/<[^>]*>?/gm, '') }}] : undefined,
    'source': `https://commons.wikimedia.org/wiki/File:${meta.ObjectName.value.split(' ').join('_')}`,
    'license': meta.License ? meta.License.value : undefined,
    ...await date(meta)
  }
}

const fetchWikiCommonsImage = async(fileName) => {

  const sanityImageRef = await fetchSanityImageRef(fileName)

  const wikimediaImageMetaData = await fetchImageMetaData(fileName) 

  const mutation = await createMutation({imageRef: sanityImageRef, imageMetaData: wikimediaImageMetaData})

  const imageDocRef = await postImageDocToSanity(mutation)

  //The API call to upload the image to sanity and the one to get metadata from WMC 
  //can happen at the same time.
  //Maybe I can use Promise.all?

  return imageDocRef
}

export default fetchWikiCommonsImage