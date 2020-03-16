import React from 'react'
import { AuthContext } from '../App.jsx'
import { Card } from './Card.jsx'

const initialState = {
  songs: [],
  isFetching: false,
  hasError: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SONGS_REQUEST':
      return {
        ...state,
        isFetching: true,
        hasError: false
      }
    case 'FETCH_SONGS_SUCCESS':
      return {
        ...state,
        isFetching: false,
        songs: action.payload
      }
    case 'FETCH_SONGS_FAILURE':
      return {
        ...state,
        hasError: true,
        isFetching: false
      }
    default:
        return state
  }
}

export function Home () {
  const { state: authState } = React.useContext(AuthContext)
  const [state, dispatch] = React.useReducer(reducer, initialState)

  React.useEffect(() => {
    dispatch({
      type: 'FETCH_SONGS_REQUEST'
    })

    async function fetchData() {
      try {
        const response = await fetch('https://hookedbe.herokuapp.com/api/songs', {
          headers: {
            Authorization: `Bearer ${authState.token}`
          }
        })
        const result = await response.json()

        dispatch({
          type: 'FETCH_SONGS_SUCCESS',
          payload: result
        })
      } catch (error) {
        console.log(error)
        dispatch({
          type: 'FETCH_SONGS_FAILURE'
        })
      }
    }

    fetchData()
  }, [authState.token, dispatch])

  return (
    <div className="home">
      {state.isFetching ? (
        <span className={'loader'}>LOADING...</span>
        ) : state.hasError ? (
            <span className={'error'}>AN ERROR HAS OCCURED</span>
          ) : (
            <React.Fragment>
              {state.songs.length > 0 &&
                state.songs.map(song => <Card key={song.id.toString()} song={song} />)
              }
            </React.Fragment>
          )
      }
    </div>
  )
}
