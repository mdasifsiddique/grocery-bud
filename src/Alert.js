import React, { useEffect } from 'react'

const Alert = ({show,msg,type,removeAlert,list}) => {
 useEffect(() => {
   const timeout=setTimeout(()=>{
     return removeAlert()
   },3000)
   return () => {
     clearTimeout(timeout)
   }
 }, [list])
 
 return <p className={`alert alert-${type}`}>
 {msg}
  </p>
}

export default Alert
