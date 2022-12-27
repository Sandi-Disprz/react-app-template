import React from 'react'
import { weekTitles} from '../../../DAYS_MONTHS'
import '../CalenderLeftStyles/CalenderWeek.scss'
function CalenderWeek() {
  return (
    <table className='week-table mw-350'>
        <thead>
        {
        weekTitles.map((value)=>{
            return(
            <button className='btn-week'><li className='week-name'>{value}</li></button>)
        })
      }
        </thead>
     
    </table>
  )
}

export default CalenderWeek
