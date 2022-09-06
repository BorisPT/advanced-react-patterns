// Compound Components
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {Switch} from '../switch'

function Toggle(props) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  // 🐨 replace this with a call to React.Children.map and map each child in
  // props.children to a clone of that child with the props they need using
  // React.cloneElement.
  // 💰 React.Children.map(props.children, child => {/* return child clone here */})
  // 📜 https://reactjs.org/docs/react-api.html#reactchildren
  // 📜 https://reactjs.org/docs/react-api.html#cloneelement
  
  
  // interessante : React.Children.map applies a method to every child in the collection.
  // Here, we are cloning each child and passing additional props, which are related to the overall state
  // of the parent component.
  return React.Children.map(props.children, (child, index) => {
    return React.cloneElement(child, {
      on : on,
      toggle : toggle
    })
  })

  // return <Switch on={on} onClick={toggle} />
}

// Accepts `on` and `children` props and returns `children` if `on` is true
// interessante : decide whether to show the content or not according to the "state" received as a prop.
const ToggleOn = ({on, children}) => {
  return on ? <p>{children}</p> : null;
};

// Accepts `on` and `children` props and returns `children` if `on` is false
// interessante : decide whether to show the content or not according to the "state" received as a prop.
const ToggleOff = ({on, children}) => {
  return !on ? <p>{children}</p> : null;
};

// Accepts `on` and `toggle` props and returns the <Switch /> with those props.
// interessante : wraps around the Switch component and pass the appropriate state/props
const ToggleButton = ({on, toggle}) => {
  return <Switch on={on} onClick={toggle} />
}

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <ToggleButton />
      </Toggle>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
