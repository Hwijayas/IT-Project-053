import React from 'react'
import Navbar from './components/Navbar';
import './App.css'
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Settings from './components/Settings';
import About from './components/About';
import Contact from './components/Contact'
import Graph from './components/Graph';
import Logo from './components/Logo'
import {Route} from 'react-router-dom'

const App = () => {
  return (
    <>
      <Navbar/>

      <Logo/>

      <Route exact path='/'>
        <Dashboard/>
      </Route>

      <Route path='/settings'>
        <Settings/>
      </Route>

      <Route path='/login'>
        <Login/>
      </Route>

      <Route path='/about'>
        <About/>
      </Route>

      <Route path='/contact'>
        <Contact/>
      </Route>

      <Route path='/graph'>
        <Graph/>
      </Route>

    </>
  )
}

export default App
