import React from "react";
import './App.css';
import axios from "axios";

import logo from "./mag.svg.svg";

function App() {

  const [data, setData] = React.useState(null);
  const [input,setInput] =React.useState('');
  const [isComplete,setComplete] = React.useState('');
  const state = {
    DONE : 'DONE',
    LOADING : 'LOADING'
  }

  const callData =()=>{
    setComplete(state.LOADING);
    axios.get("/pepStatus?name="+input)
    .then((res) => {
      if(res.data){
        setData(res.data);
        setComplete(state.DONE);
      } 
    })
    .catch((res)=>{
      setComplete(state.DONE);
      console.log("error",res)
    });
  }
  const DisplayData= data && !data.message && data.map(
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
  
  const Display = ({data}) => {
    if(isComplete === state.LOADING){
      return "Loading..."
    }
    if(isComplete === state.DONE){
      if(data && data.message){
        return data.message
      }
      else{
        return (<table id="customers">
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
        )
      }
    } 
     else
      return null      
  } 
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
    <div>
          <Display data={data}/>
    </div>
    </div>
  );
}

export default App;
