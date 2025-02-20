// Flexible Compound Components
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'
import {Switch} from '../switch'

// 🐨 create your ToggleContext context here
// 📜 https://reactjs.org/docs/context.html#reactcreatecontext

const ToggleContext = React.createContext(/*{ on : false, toggle : () => {}}*/);


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

const useToggleContext = () => { 

  const context = React.useContext(ToggleContext);

  // interessante : if there is no context, throw an error
  if (!context)
    throw new Error("Cannot use this component without an enclosing context");

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

// function App() {
//   return (
//     <div>
//       <Toggle>
//         <ToggleOn>The button is on</ToggleOn>
//         <ToggleOff>The button is off</ToggleOff>
//         <div>
//           <ToggleButton />
//         </div>
//       </Toggle>
//     </div>
//   )
// }

// interessante : provoke the error ->  we need to have an enclosing <Toggle> component.
const App = () => <ToggleButton />

export default App

/*
eslint
  no-unused-vars: "off",
*/
