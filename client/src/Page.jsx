import React, { useEffect, useState } from "react";
import "./Page.css";
import axios from "axios";
export default function Page() {
  const [inputdata, setInputdata] = useState("");
  const [displaydata, setDisplaydata] = useState("");
  const[id,setId]=useState('')

  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    axios
      .get("http://localhost:7777/Todo_Read")
      .then((response) => response.data)
      .then((data) => {
        setDisplaydata(data.read);
      });
  };
  const buttondelete=(delid)=>{
  axios.delete("http://localhost:7777/Todo_Delete/" + delid)
  .then((response)=>response.data)
  .then((data)=>{
    getData()
  })
  }

  const buttonClick=()=>{
   var dat={
    inputdata:inputdata,
    eid:id
   }
   if(inputdata!==" "){
    if(id ===""){
    axios.post("http://localhost:7777/Todo_Create",dat)
    .then((response)=>{
      if(response.data.message==="Data Saved"){
        alert("Data Saved")
        window.location.reload()
      }
      else{
        alert("Failed")
      }
    })
    }
    else{
      axios.put("http://localhost:7777/Todo_Update" , dat)
      .then((response)=>{
        if(response.data.message==="Data Updated"){
          alert("Data Updated")
          window.location.reload()
        }
        else{
          alert("Failed")
        }
      })
    }

   }
   else{
    alert("Enter Data")
   }
  };

  const buttonEdit=(id)=>{
 setId(id)
 axios.get("http://localhost:7777/Todo_Update/"+ id)
 .then((response)=>response.data)
 .then((data)=>{
  setInputdata(data.update[0].data)
 })

  }
  return (
    <div className="PageContainer">
      <div className="todo_Container">
        <input
          type="text"
          placeholder="Reminder!" value={inputdata}
          onChange={(e) => setInputdata(e.target.value)}
        />
        <button className="submitbtn" onClick={buttonClick}>
          Submit
        </button>
        {displaydata &&
          displaydata.map((row, key) => (
            <div className="Container">
             <div> <input type="checkbox" style={{marginLeft:"5px",marginRight:"5px"}} />{row.data}</div>
              <div>
                <button className="editbutton" onClick={()=>buttonEdit(row.data_id)}>Edit</button>
                <button className="deletebutton" onClick={()=>buttondelete(row.data_id)}>X</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
