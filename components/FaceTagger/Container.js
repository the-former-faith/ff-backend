import React, {useState, useEffect, useRef } from 'react' 
import Box from './Box'
import styles from './index.css'
import PatchEvent, {set, unset} from 'part:@sanity/form-builder/patch-event'

const createPatchFrom = (value, path) => PatchEvent.from(value === '' ? unset() : set(value, path))

function Container(props) {
  const [mouseStatus, setMouseStatus] = useState(undefined)

  const faces = props.value ? props.value.faces : []

  const [containerSize, setContainerSize] = useState({x: 0, y:0})

  const containerRef = useRef(null)

  const ro = new ResizeObserver(entries => {
    for (let entry of entries) {
      setContainerSize({
        x: entry.contentRect.width,
        y: entry.contentRect.height
      })
    }
  })

  useEffect(() => {
    if(containerRef !== null) {
      ro.observe(containerRef.current)
    }
  }, [])

  const handleReposition = (path,value) => {
    props.onChange(createPatchFrom(value, path))
  }

  const faceBoxes = faces.map((face) =>
    <Box 
      key={face._key}
      mouseStatus={mouseStatus} 
      containerSize={containerSize}
      handleReposition={handleReposition}
      {...face}
    />
  )

  return (
    <div 
      className={styles.container}
      onMouseMove={(event) => {
        event.persist()
        setMouseStatus(event)
      }}
      onMouseUp={(event) => {
        event.persist()
        setMouseStatus(event)
      }}
      onMouseLeave={(event) => {
        event.persist()
        setMouseStatus(event)
      }}
    >
      <img className={styles.image} ref={containerRef} src={props.src} />
      {faceBoxes}
    </div>
  )
}

export default Container
