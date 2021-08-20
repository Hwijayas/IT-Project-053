//this entire chunk of code is slightly modified from https://github.com/zeroabsolute/MonorepoHerokuDeployment/blob/master/src/web-client/src/App.js

import React, { useEffect, useState } from 'react';
import Axios from 'axios';

import logo from './logo.svg';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
console.log("the api url is: " + API_URL);

function App() {
  const [apiStatus, setApiStatus] = useState("");

  useEffect(() => {
    Axios({
      method: 'GET',
      url: `${API_URL}/status`
    }).then((response) => {
      setApiStatus({ status: response.status, payload: response.data, error: null });
    }).catch((error) => {
      setApiStatus({ status: error.response?.status, payload: null, error: error.response?.data });
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>API Status:</h3>
        {renderStatus(apiStatus)}
      </header>
    </div>
  );
}

function renderStatus(response) {
  if (!response) {
    return null;
  } else if (response.error) {
    return (
      <div>
        Code: {response.status} <br />
        Message: {response.error?.message}
      </div>
    );
  }

  return (
    <div>
      Code: {response.status} <br />
      Time: {response.payload?.time} <br />
      Message: {response.payload?.status}
    </div>
  );
}

export default App;