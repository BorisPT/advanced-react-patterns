// Prop Collections and Getters
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {Switch} from '../switch'

function useToggle() {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  // interessante : also call the onClick handler that the user supplies, if it exists.
  // So the onClick will be a new function that calls our "toggle" state changer, and also the onClick that the 
  // user might supply you with. 
  const getTogglerProps = ({onClick, ...remaining}) => {

    return {
      onClick : () => {
        toggle();
        onClick && onClick();
      }
      ,      
      ...remaining};    
   };

  return {on, getTogglerProps};  
}



function App() {
  const {on, getTogglerProps} = useToggle()
  return (
    <div>
      <Switch {...getTogglerProps({on})} />
      <hr />
      <button
        {...getTogglerProps({
          'aria-label': 'custom-button',
          onClick: () => console.info('onButtonClick'),
          id: 'custom-button-id',
        })}
      >
        {on ? 'on' : 'off'}
      </button>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
