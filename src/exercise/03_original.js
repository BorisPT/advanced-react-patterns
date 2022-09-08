// Flexible Compound Components
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'
import {Switch} from '../switch'

// 🐨 create your ToggleContext context here
// 📜 https://reactjs.org/docs/context.html#reactcreatecontext

const ToggleContext = React.createContext({
  on : false,
  toggle : () => {}
});

// interessante : setting a display name for debugging purposes in the components window
ToggleContext.displayName = "ToggleContext";

// interessante : flexible compound components get the state from the enclosing context and not by passing props around. 
function Toggle({children}) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  const context = {
    on : on,
    toggle : toggle    
  };

  return <ToggleContext.Provider value={context}>
    {children}
  </ToggleContext.Provider>

}

// interessante : custom hook for getting the context.
const useToggleContext = () => { 

  const context = React.useContext(ToggleContext);

  return {
    on : context.on,
    toggle : context.toggle
  };
 };



// 📜 https://reactjs.org/docs/hooks-reference.html#usecontext
function ToggleOn({children}) {  
  const {on} = useToggleContext();
  return on ? children : null
}

// 🐨 do the same thing to this that you did to the ToggleOn component
function ToggleOff({children}) {  
  const {on} = useToggleContext();
  return on ? null : children
}

// 🐨 get `on` and `toggle` from the ToggleContext with `useContext`
function ToggleButton({...props}) {  
  const {on, toggle} = useToggleContext();
  return <Switch on={on} onClick={toggle} {...props} />
}

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <div>
          <ToggleButton />
        </div>
      </Toggle>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
