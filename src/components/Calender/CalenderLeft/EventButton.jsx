
import React from 'react'
import '../CalenderLeftStyles/Event.scss'
function Event({AddEvent}) {

  return (
    <div className='event-btn' onClick={AddEvent}>
      <h4 className='event-tag'>Create</h4>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='plus-logo'>
        <path  d="M24 9h-9v-9h-6v9h-9v6h9v9h6v-9h9z"/>
      </svg>
    </div>
  )
}

export default Event
