import {React,useState} from 'react'
import './CalenderHeader.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars,faSnowflake} from '@fortawesome/free-solid-svg-icons'
import logo from  '../images/timetable.png'
import { monthTitleList} from '../../../DAYS_MONTHS'
function Dashborad({date,changeDate,changeday,setChangeDay,yearChange,setYearChange,AddEvent}) {
  const dateNow=new Date();
  const datee=date.getDate();
  const month=monthTitleList[date.getMonth()];
  const year=date.getFullYear()
 
  const [theme,setTheme]=useState(false);
  const changeTheme=()=>{
    setTheme(!theme);
  }
  const changeToday=()=>{
    setChangeDay(false);
    changeDate((current)=>{
      const newDate=new Date(dateNow.getFullYear(),dateNow.getMonth(),dateNow.getDate());
      return newDate;
    });
      
  }
  
  return (
    <div className={`content-header  trans-left  ${theme && 'change-theme'}`}>
      <FontAwesomeIcon icon={faBars} className='ham-menu' /*onClick={hamburgerClick}*/ /><p className='ham-content'>menu</p>
      <a href='http://localhost:3000/'><img src={logo} className="calender-logo" alt="{https://www.flaticon.com/free-icon/timetable_1048953?related_id=1048953&origin=tag} "/></a>
      <h4 className='calendar-name'>Sanz-Calender</h4>
      <button onClick={changeToday} className={`today-btn  ${theme ? 'change-color':'trans'}`} >Today</button>
      {(yearChange===false)?
        <>
          { changeday ?
          <div className='current-day'>
            <p className='current-date'>{datee}  </p>
            <p className='current-month'>{month}</p>
            <p className='current-year'>{year}</p>
          </div>
          :
          <div className='current-day'>
            <p className='current-date'>{dateNow.getDate()}  </p>
            <p className='current-month'>{monthTitleList[dateNow.getMonth()]}</p>
            <p className='current-year'>{dateNow.getFullYear()}</p>
          </div>
          }</>:<div className='current-day'>
          <p className='current-date'>{dateNow.getDate()}  </p>
          <p className='current-month'>{monthTitleList[dateNow.getMonth()]}</p>
          <p className='current-year'>{dateNow.getFullYear()}</p>
        </div>
  
        }
      {/* <FontAwesomeIcon icon ={faChevronRight} color='white'/> */}
      <FontAwesomeIcon icon={faSnowflake} className='theme' onClick={changeTheme}/>
      <p className='theme-content'>changeTheme</p>
    </div>
  )   
}
export default Dashborad;
