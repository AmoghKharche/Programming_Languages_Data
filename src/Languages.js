import React from 'react'
import axios from "axios";
import {useState} from "react";


function Languages() {

    const [name,setName] = useState("")
    const [python,setPython] = useState(false)
    const [java,setJava] = useState(false)
    const [js,setJs] = useState(false)
    const [msg,setMsg] = useState("")
    
    const hName = (event) => [setName(event.target.value)]
    const hPython = (event) => {setPython(!python)}
    const hJava = (event) => {setJava(!java)}
    const hJs = (event) => {setJs(!js)}

    const save = (event) => {
      event.preventDefault();
      let languages = "";
      if (python)      languages += 'Python';
      if (java)      languages += 'Java';
      if (js)      languages += 'Js';
      let data = {name,languages};
      let urladd = "http://localhost:9000/create";
      axios.post(urladd,data)
      .then(res=>{
        if(res.data.affectedRows==1)
        {
          setMsg("Thank You")
          setName("")
          setPython(false)
          setJava(false)
          setJs(false)
        }
      })
      .catch((err) => {
          if(err.code == "ERR_NETWORK")
          {
            setMsg("Server Down Please Try Again After Sometime")
            setName("")
            setPython(false)
            setJava(false)
            setJs(false)
          }
      })
    }

  return (
    <div>
        <center>
            <h1>Languages You Know</h1>
            <form onSubmit={save}>
              <input type={"text"} placeholder="Enter Your name Here" onChange={hName} value={name}/>
              <br/><br/>
              <input type={"checkbox"} value="python" onChange={hPython} checked={python}/>Python
              <input type={"checkbox"} value="java" onChange={hJava} checked={java}/>Java
              <input type={"checkbox"} value="js" onChange={hJs} checked={js}/>Js
              <br></br><br></br>
              <input type={"submit"}/>
            </form>
            <h2>{msg}</h2>
        </center>
    </div>
  )
}

export default Languages