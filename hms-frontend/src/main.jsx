import React from 'react'
import ReactDOM from 'react-dom/client'
//import { BrowserRouter as Router } from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css';

import App from './App.jsx'
import App1 from './App1.jsx'
import './index.css'
import GlobalStyles from './Component/GlobalStyles/index.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyles>
      <App1 />
    </GlobalStyles>
  </React.StrictMode>,
)
