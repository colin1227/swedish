import React from 'react';
import { selectWord } from '../helper'

const Notes = ({ wordIndex }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFAA'
      }}>
        {selectWord[wordIndex]}
    </div>
  )
}

export default Notes;