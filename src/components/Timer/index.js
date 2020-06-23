import React, {useState, useEffect} from 'react'
import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

function Timer(props){
  const [project, setproject] = useState("a")
  const [runningTime, setrunningTime]= useState(0)
  const[isRunning,setisRunnig]= useState(false)
  const [taskName, settaskName] = useState('')
  const [date, setdate] = useState('')
  const [startTime, setstartTime] = useState('')
  const [endTime, setendTime] = useState('')


  const toggle=()=> {
    setisRunnig(!isRunning);
  }
  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setrunningTime(runningTime => runningTime + 1);
      }, 1000);
    } else if (!isRunning && runningTime !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, runningTime]);

  
 const handleResetClick = () => {
    setisRunnig(false)
    setrunningTime(0)
  }


  // const formatTime=(t)=>{
  //   return (t / 1000).toFixed();

  // }

  const taskHandler=(event)=>{
    settaskName(event.target.value)

  }
  const selectHandler=(event)=>{
    setproject(event.target.value)
  }

  const dateHandler=(event)=>{
    setdate(event.target.value)
  }

  const startTimeHandler=(event)=>{
    setstartTime(event.target.value)
  }
  const endTimeHandler=(event)=>{
    setendTime(event.target.value)
  }
  const saveHandle = e => {
      
      // console.log('%c⧭', 'color: #ff0000',project );
      // console.log('%c⧭', 'color: #00e600', runningTime);
      // console.log('%c⧭', 'color: #00a3cc', taskName);
      // console.log('%c⧭', 'color: #aa00ff', date);
      // console.log('%c⧭', 'color: #e50000', startTime);
      // console.log('%c⧭', 'color: #733d00', endTime);
    const reqStruct = {
      project,
      runningTime,
      taskName,
      date,
      startTime,
      endTime
    }
    const id = props.firebase.generateKey()
    props.firebase.addEntry(id,reqStruct)
      .then(docRef => {
        setproject('')
        setrunningTime(0)
        setisRunnig(false)
        settaskName('')
        setdate('')
        setstartTime('')
        setendTime('')
        console.log('%c⧭', 'color: #733d00', "added");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
    
  }

  return (
    <>
    <div>
      <h1 className="main"> Welcome</h1>
      <label>Task Name</label>
        <input type="text" name="taskName" placeholder="what are you Working on?" value={taskName} onChange={taskHandler}></input>
      <label>Project</label>
      <select value={project} onChange={selectHandler}>
        <option value="a">a</option>
        <option value="b">b</option>
        <option value="c">c</option>
      </select>
      <label>Date</label>
      <input type="date" name="date" value={date} onChange={dateHandler}></input>
      <label>Start Time</label>
      <input type="time" name="startTime" value={startTime} onChange={startTimeHandler}></input>
      <label>End Time</label>
      <input type="time" name="endTime" value={endTime} onChange={endTimeHandler}></input>
      <button className="timer" onClick={saveHandle}>Save</button>
    </div>


    <div>
        <h1 className="main">{runningTime} sec</h1>
      <button className="timer" onClick={toggle}>{isRunning ? "Stop Timer" : "Start Timer"}</button>
      <button className="timer" onClick={handleResetClick}>Reset Timer</button><br></br>
      <br></br>
    </div> 
    </>
  )
}


const condition = authUser => !!authUser;
const TimerPag = compose(
  withRouter,
  withFirebase,
)(Timer);


export default withAuthorization(condition)(TimerPag);