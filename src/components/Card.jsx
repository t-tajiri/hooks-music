import React from 'react'

export function Card ({ song }) {
  return (
    <div className={'card'}>
      <img src={song.albumArt} alt="" />
      <div className={'content'}>
        <h2>{song.name}</h2>
        <span>BY: {song.artist}</span>
      </div>
    </div>
  )
}