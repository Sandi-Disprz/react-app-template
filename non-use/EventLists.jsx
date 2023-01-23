import {React,useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import QuickOptions from './QuickOptions'
import '../CalenderLeftStyles/EventLists.scss'
function EventLists({key,title,startTime,endTime,desc}) {
    const [quickOptions,setQuickOptions]=useState(false)
    const OpenQuickOptions=()=>{
        setQuickOptions(!quickOptions)
    }
    // const st=startTime.getTime();
    return (
        <>
        {(startTime&&endTime&&title)?
        <>
        <div className='events'key={key} >
            <p>{title}</p>
            <p>{startTime} - {endTime}</p>
            <FontAwesomeIcon icon={faEllipsis} className='quick-option-bar' onClick={OpenQuickOptions}/> 
        </div>
        <QuickOptions quickOptions={quickOptions}/>
        </>:''
        }
        </>
    

        
        
    )
}
export default EventLists
