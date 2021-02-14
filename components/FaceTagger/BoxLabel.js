import React, {useState} from 'react' 
import styles from './index.css'
import client from 'part:@sanity/base/client'

const BoxLabel = (props) => {

  const query = `*[_type == "person" && _id == "${props._ref}"]{title}[0]`

  const [title, setTitle] = useState('Loading...')

  const resolveTitle = (query) => {
    client.fetch(query).then(res => {
      setTitle(res.title.en)
      return
    })
  }

  resolveTitle(query)

  return (
    <div className={styles.boxlabel} >
      {title &&
        title
      }
    </div>
  )
}

export default BoxLabel