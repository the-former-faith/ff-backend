import { useMachine } from '@xstate/react'
import { createMachine, assign, interpret } from 'xstate'
import React, {useEffect} from 'react' 
import styles from './index.css'
import BoxLabel from './BoxLabel'

const Box = (props) => {

  const { mouseStatus, x, y, _key, containerSize } = props

  const assignPoint = assign({
    px: (context, event) => event.clientX,
    py: (context, event) => event.clientY,
  })
  
  const assignPointTouch = assign({
    px: (context, event) => event.touches[0].clientX,
    py: (context, event) => event.touches[0].clientY,
  })
  
  const assignPosition = assign({
    x: (context, event) => {
      let pos = context.x + (context.dx / event.containerSize.x)
      let newValue
      if ( pos < 0 ) {
        newValue = 0
      } else if ( (pos + 0.12) > 1 ) {
        newValue = 0.88
      } else {
        newValue = pos
      }
      props.handleReposition(["faces",{"_key": _key},"x"], newValue)
      return newValue
    },
    y: (context, event) => {
      let pos = context.y + (context.dy / event.containerSize.y)
      let newValue
      if ( pos < 0 ) {
        newValue = 0
      } else if ( (pos + 0.12) > 1 ) {
        newValue = 0.88
      } else {
        newValue = pos
      }
      props.handleReposition(["faces",{"_key": _key},"y"], newValue)
      return newValue
    },
    dx: 0,
    dy: 0,
    px: 0,
    py: 0,
  });
  
  const assignDelta = assign({
    dx: (context, event) => {
      return event.clientX - context.px
    },
    dy: (context, event) => event.clientY - context.py,
  })
  
  const assignDeltaTouch = assign({
    dx: (context, event) => event.touches[0].clientX - context.px,
    dy: (context, event) => event.touches[0].clientY - context.py,
  })
  
  const resetPosition = assign({
    dx: 0,
    dy: 0,
    px: 0,
    py: 0,
  })
  
  const machine = createMachine({
    initial: 'idle',
    context: {
      x: 0,
      y: 0,
      dx: 0,
      dy: 0,
      px: 0,
      py: 0
    },
    states: {
      idle: {
        on: {
          mousedown: {
            actions: assignPoint,
            target: 'dragging',
          },
          touchstart: {
            actions: assignPointTouch,
            target: 'dragging',
          },
        },
      },
      dragging: {
        on: {
          mousemove: {
            actions: [assignDelta],
            // no target!
          },
          touchmove: {
            actions: [assignDeltaTouch],
            // no target!
          },
          mouseup: {
            actions: assignPosition,
            target: 'idle',
          },
          mouseleave: {
            actions: assignPosition,
            target: 'idle',
          },
          touchend: {
            actions: assignPosition,
            target: 'idle',
          },
          'keyup.escape': {
            target: 'idle',
            actions: resetPosition,
          },
        },
      },
    },
  })

  const [state, send] = useMachine(machine, { 
    context: {
      x: x ? x : 0,
      y: y ? y : 0,
      dx: 0,
      dy: 0,
      px: 0,
      py: 0
    }
  })

  useEffect(() => {
    if (mouseStatus) {
      send({...mouseStatus, containerSize: containerSize})
    }
  }, [mouseStatus])

  let boxStyle = {
    '--dx': state.context.dx,
    '--dy': state.context.dy,
    '--x': state.context.x,
    '--y': state.context.y,
    '--size': props.size
  }

  return (
    <div 
      style={boxStyle}
      className={styles.boxwrapper}
      onMouseDown={(event) => {
        event.persist()
        send(event)
      }}
      onTouchStart={(event) => {
        event.persist()
        send(event)
      }}
      onTouchMove={(event) => {
        event.persist()
        send(event)
      }}
      onTouchEnd={(event) => {
        event.persist()
        send({...event, containerSize: containerSize})
      }}
      data-state={state.value}
    >
      <div className={styles.box}>
        {props.person &&
          <BoxLabel _ref={props.person._ref} />
        }
      </div>
    </div>
  )
}

export default Box