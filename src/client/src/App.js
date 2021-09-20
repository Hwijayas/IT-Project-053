//this entire chunk of code is slightly modified from https://github.com/zeroabsolute/MonorepoHerokuDeployment/blob/master/src/web-client/src/App.js
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch , Link} from 'react-router-dom';
import './css/App.css';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Form from './components/pages/Form'

class App extends Component {
  render() {
    const App = () => (
      <div>
        <Router>
        <Navbar/>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/about' component={About}/>
          <Route path="/Form" component={Form} />
          <Route path='/contact'>
            <Contact/>
            </Route>
        </Switch>
        </Router>
      </div>
    )
    return (
      
        <div>
        <App/>
        </div>
      
    );
  }
}
const Contact = () => {
  return(
    <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'>Contact Us</a>
  )
}
export default App;