import React, {useState, useEffect} from 'react';
import Timer from '../Timer'
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import { withAuthorization } from '../Session';

function HomePage(props){
  const [timerData, setTimerData] = useState([]);
  useEffect(() => {
    props.firebase.getContent().then((querySnapshot) => {
        const beneficiaries = [];
        querySnapshot.forEach((doc) => {
          const beneficiary = { ...doc.data() };
          beneficiaries.push(beneficiary);
        });
        setTimerData(beneficiaries);
        console.log("BENEFICIARIES");
      })
      .catch((error) => {
        // setError(error);
          console.log(error);
      });
  }, [props.firebase]);
  
  
  console.log('%c⧭', 'color: #d90000', timerData);

  return(
  <div>
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>
    <Timer/>
    
    <div>Timer Details</div>
<div>
  {timerData && timerData.map((data,key)=>(

       <div>
         <div>Entry Number- {key}</div>
      <span style={{margin:"5px"}}>Project -</span><span>{data.project}</span>
      <span style={{ margin: "5px" }}>Running Time -</span><span>{data.runningTime}</span>
      <span style={{ margin: "5px" }}>Task Name -</span><span>{data.taskName}</span>
      <span style={{ margin: "5px" }}>Date -</span><span>{data.date}</span>
      <span style={{ margin: "5px" }}>StartTime -</span>{data.statTime}
      <span style={{ margin: "5px" }}>EndTime -</span><span>{data.endTime}</span>
</div>
  ))}
</div>

  </div>
)}

const condition = authUser => !!authUser;

const home = compose(
  withFirebase
)(HomePage)
export default withAuthorization(condition)(home);
