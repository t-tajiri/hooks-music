import React from 'react'
import { Header } from './Header.jsx'
import './App.css'

export function App() {
  return (
    <div className="App">
      <Header />
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}
