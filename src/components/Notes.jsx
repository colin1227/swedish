import React from 'react';

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