// import {React,useState} from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronCircleLeft,faChevronCircleRight} from "@fortawesome/free-solid-svg-icons";
// // import './CalenderMonth.scss'
// function CalendarMonths(props) {
//   const monthTitle = [
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "Jun",
//     "Jul",
//     "Aug",
//     "Sep",
//     "Oct",
//     "Nov",
//     "Dec",
//   ];
//   const [month,setMonth]=useState(null);

//   const minusMonthClick = (event) => {
//     props.changeDate((prevState) => {
//       let month = prevState.getMonth() - 1,
//         year = prevState.getFullYear();
//       if (month <= 0) {
//         month = 12;
//         year--;
//       }
//       return new Date(year, month, prevState.getDate());
//     });
//   };
//   const addMonthClick = (event) => {
//     // consider Add Month will affect Year
//     props.changeDate((prevState) => {
//       let month = prevState.getMonth() + 1,
//         year = prevState.getFullYear();
//       if (month > 12) {
//         month = 1;
//         year++;
//       }
//       return new Date(year, month, prevState.getDate());
//     });
//   };

//   const monthList = monthTitle.map((elem, index) => {
//     return (
//       <li key={index}>
//         <label title={elem} className={props.month === index ? "selected" : ""}>
//           {elem}
//         </label>
//       </li>
//     );
//   });

//   return (
//     <div className="month-bar">
//       <button onClick={minusMonthClick} className="btn"><FontAwesomeIcon icon={faChevronCircleLeft}></FontAwesomeIcon></button>
//       <ul className="months">{monthList}</ul>
//       <button onClick={addMonthClick} className="btn"><FontAwesomeIcon icon={faChevronCircleRight}></FontAwesomeIcon></button>
//     </div>
//   );
// }

// export default CalendarMonths;

