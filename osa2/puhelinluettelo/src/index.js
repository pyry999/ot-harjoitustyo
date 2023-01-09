import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './App'
import axios from 'axios'
import './index.css'

axios.get('/api/persons').then(response => {
    console.log(response)
    const persons = response.data
    ReactDOM.createRoot(document.getElementById('root')).render(<App persons={persons}/>)
  })


