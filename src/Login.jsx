import React from 'react'
import { AuthContext } from './App.jsx'

export function Login () {
  const { dispatch } = React.useContext(AuthContext)

  const initalState = {
    email: '',
    password: '',
    isSubmitting: false,
    errorMessage: null
  }

  const [data, setData] = React.useState(initalState)

  const onInputChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    })
  }

  const onFormSubmit = async event => {
    event.preventDefault()

    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null
    })

    try {
      let response = await fetch('https://hookedbe.herokuapp.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: data.email,
          password: data.password
        })
      })

      let result
      if (response.ok) {
        result = await response.json()
      } else {
        throw response
      }

      dispatch({
        type: 'LOGIN',
        payload: result
      })
    } catch (error) {
      setData({
      ...data,
        isSubmitting: false,
        errorMessage: error.message || error.statusText
      })
    }
  }

  return (
    <div className={'login'}>
      <div className={'card'}>
        <div className={'container'}>
          <form onSubmit={onFormSubmit}>
            <h1>Login</h1>
            <label htmlFor={'email'}>
              Email
              <input type="text" name="email" id="email" value={data.email} onChange={onInputChange} />
            </label>
            <label htmlFor={'password'}>
              Password
              <input type="text" name="password" id="password" value={data.password} onChange={onInputChange} />
            </label>
            {data.errorMessage && (<span className="form-error">{data.errorMessage}</span>)}
            <button disabled={data.isSubmitting}>
              {data.isSubmitting ? ("Loading...") : ("Login")}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
