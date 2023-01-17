// import React from 'react'
// import CalenderLeft from '../src/components/Calender/CalenderLeft/CalenderLeft'
// import CalenderRight from '../src/components/Calender/CalenderRight/CalenderRight'
// function CalenderContent() {
//   return (
//     <div>
//       <CalenderLeft/>
//       <CalenderRight/>
//     </div>
//   )
// }

// export default CalenderContent
var UTCStartTime,UTCEndTime;
const tDate=new Date(new Date(selectedDate).toISOString());
tDate.setHours(tDate.getHours()+5);
tDate.setMinutes(tDate.getMinutes()+30);
UTCStartTime=(tDate.toISOString().slice(0,16));
console.log(UTCStartTime);
tDate.setMinutes(tDate.getMinutes()+30);
UTCEndTime=tDate.toISOString().slice(0,16);