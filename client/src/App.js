import React from "react";
import './App.css';
import axios from "axios";

import logo from "./mag.svg.svg";

function App() {

  const [data, setData] = React.useState(null);
  const [input,setInput] =React.useState('');


  const callData =()=>{
    console.log("called calldata ?",input)
    axios.get("/pepStatus?name="+input)
    .then((res) => {
      if(res.data){
        console.log(res.data)
        setData(res.data);
      } 
    })
    .catch((res)=>{
      console.log("error",res)
    });
  }
  const DisplayData= !data ? "" : (data.message ? "Person not found!" :data.map(
    (info)=>{
        return(
            <tr>
                <td>{info.name}</td>
                <td>{info.birth_date}</td>
                <td>{info.pepStatus}</td>
                <td>{info.pepScore}</td>
            </tr>
        )
    }
)
  )
  return (
    <div className="App">
      <header className="App-header">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Know your customer - KYC</h2>
      </header>
      </header>
      <div id="display">Enter Customer details:</div>
    <div><input className="textbox" type="text" value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => {if(e.key === 'Enter'){callData();}}}/>
        <button className="send"onClick={callData}>Send</button>
    </div>
    {data ? <div>
             <table id="customers">
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Birth Date</th>
                    <th>PEP Status</th>
                    <th>PEP Score</th>
                    </tr>
                </thead>
                <tbody>
                 
                    
                    {DisplayData}
                    
                </tbody>
            </table>
             
        </div> :null} 
    </div>
  );
}

export default App;
