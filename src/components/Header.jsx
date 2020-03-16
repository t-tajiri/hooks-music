import React from 'react'
import { AuthContext } from '../App'

export function Header () {
  const { state, dispatch } = React.useContext(AuthContext)
  return (
    <nav id="navigation">
      <h1 className="logo">
        hooks-music
      </h1>
      <button onClick={() => dispatch({ type: 'LOGOUT' })}>
        {state.isAuthenticated && (
          <h1>Hi {state.user.firstName} (LOGOUT)</h1>
        )}
      </button>
    </nav>
  )
}

