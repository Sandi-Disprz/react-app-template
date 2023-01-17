import { faChevronLeft,faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { DAYS, monthTitleList } from '../../../../DAYS_MONTHS';
import {DISP_HOLIDAYS} from '../../../../DISP_Holidays'
import './DisprzHolidays.scss'
function DisprzHolidays({i}) {
  const [index,setIndex]=useState(i);
  const [clas,setClass]=useState();
  const [date,setDate]=useState(new Date());
  const [holiday,setHoliday]=useState();
  const [month,setMonth]=useState();
  const [day,setDay]=useState();
  const [txtColor,setColor]=useState("");
  useEffect(()=>{
    setClass(DISP_HOLIDAYS[index].class)
    setDate(DISP_HOLIDAYS[index].date)
    setHoliday(DISP_HOLIDAYS[index].text);
    setColor(DISP_HOLIDAYS[index].fColor);
    setMonth(monthTitleList[(DISP_HOLIDAYS[index].date).getMonth()]);
    setDay(DAYS[(DISP_HOLIDAYS[0].date).getDay()]);
  },[index])
  const prevHoliday=()=>{
    setIndex((prevState)=>{
      let i=prevState-1;
      return i;
    })
  }
  const nextHoliday=()=>{
    setIndex((prevState)=>{
      let i=prevState+1;
      return i;
    })
  }
  const holidayStyle={
    color:`${txtColor==="black"?"#4ae9c4":"#fff"}`
  }
  const borderStyle={
    border:`${txtColor==="black"?"1px solid #d4d4d4":""}`
  }
  return (
    <div className='display-box'>
        <div className={`holiday ${clas}`} style={borderStyle} >
            <div className='holiday-body'>
              <p>Holidays</p>
              <div className='data-body'>
                {index!==0?
                <FontAwesomeIcon icon={faChevronLeft} onClick={prevHoliday} style={holidayStyle} className='prev-holiday'/>:''}
                <div className='data-holiday'>
                  <h5 className='holiday-name' style={holidayStyle}>{holiday}</h5>
                  <p className='holiday-date' style={holidayStyle}>{day}  ,{date.getDate()} {month} ,{date.getFullYear()}</p>
                </div>
                {index!==DISP_HOLIDAYS.length-1?
                <FontAwesomeIcon icon={faChevronRight} onClick={nextHoliday} style={holidayStyle} className='next-holiday'/>:''}
              </div>
            </div>
        </div>
      
    </div>
  )
}

export default DisprzHolidays
