
// import {React, useState,useEffect } from 'react';
// import ReactLoading from 'react-loading';
// import './LoaderOne.scss'
// function LoaderOne() {
//   const [load,setLoad]=useState([]);
//   const [done,setDone]=useState(undefined);
//   useEffect(()=>{
//     setTimeout(()=>{
//       fetch('https://jsonplaceholder.typicode.com/posts')
//       .then((response) => response.json())
//       .then((json) => {
//       setLoad(json)
//       setDone(true)
//       });
//     },2000);
//   },[])
//   return (
//     <div className={`loader-one ${!done && 'bg-color'}`}>

//       {!done ?<ReactLoading type={"bars"} color={"white"} height={200} width={200} className="react-load"/>
//       :
//       <ul>
//         {load.map(post =>
//           <li key={post.id}>{post.title}</li>)
//         }
//       </ul>
//       }
//     </div>
//   )
// }

// export default LoaderOne;
