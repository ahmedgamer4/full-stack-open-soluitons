import axios from 'axios'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

axios.defaults.baseURL = 'http://localhost:3003'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
