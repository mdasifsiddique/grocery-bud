import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage=()=>{
  let list=localStorage.getItem("list")

  if(list){
    return JSON.parse(localStorage.getItem("list"))
  }
  else{
    return []
  }
}

function App() {
const [name,setName]=useState("")
const [list,setList]=useState(getLocalStorage())
const [isEditing,setIsEditing]=useState(false)
const [editId,setEditId]=useState(null)
const [alert,setAlert]=useState({
  show:false,
  msg:"",
  type:""
})

const handleSubmit=(e)=>{
  e.preventDefault();

  if(!name){
    //alert print
    showAlert(true,"danger","Enter a valid Grocery")

    
  }
  else if(name && isEditing){
    //Edit pe kaam

    setList(list.map((item)=>{
      if(item.id===editId){
        return {...item,title:name}
      }
      return item
    }
 
    ))

    setName("")
    setEditId(null)
    setIsEditing(false)
    showAlert(true,"success","value changed")
  }
  else{
    const newItem={
      id:new Date().getTime().toString(),
      title:name
    }
   setList([...list,newItem]);
   setName("")
   showAlert(true,"success","item added to list")
  }
}

const showAlert=(show=false,type="",msg="")=>{
setAlert({show:show,type:type,msg:msg})
}

const clearItem=()=>{
  showAlert(true,"danger","Empty list")
  setList([])
}

const removeItem=(id)=>{
  showAlert(true,"danger","item removed")
  setList(list.filter((item)=>item.id!==id))
}

const editItem=(id)=>{
const specificItem=list.find((item)=>item.id===id)

setIsEditing(true)
setEditId(id)
setName(specificItem.title)
}

useEffect(() => {
localStorage.setItem("list",JSON.stringify(list))
  
}, [list])

  return <section className="section-center">
    <form className="grocery-form" onSubmit={handleSubmit}>
      {
        alert.show&& <Alert {...alert} removeAlert={showAlert} list={list} />
      }
      <h3>Grocery Bud</h3>
      <div className="form-control">
        <input type="text" className="grocery"
        placeholder="eg.Eggs" value={name} onChange={(e)=>setName(e.target.value)}>
        </input>
        <button type="submit" className="submit-btn">
          {
            isEditing?"Edit":"submit"
          }

        </button>

      </div>

    </form>
    <div className="grocery-container">
      <List items={list} removeItem={removeItem}editItem={editItem} />
      <button className="clear-btn" onClick={clearItem}>
        Clear Items

      </button>

    </div>

  </section>
}

export default App
