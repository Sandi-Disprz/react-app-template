import React from 'react'

function QuickOptions({quickOptions}) {
  return (
    <>
    {quickOptions?
        <div className='quick-options'>
          <p>edit</p>
          <p>delete</p>
        </div>:''
    }</>
  )
    
}

export default QuickOptions
