import React from 'react';
import { useLocation } from 'react-router-dom';
const Task1=()=>{
   const search=useLocation().search;
   const tasks=new URLSearchParams(search).get('task')
    var text="";
    for(var x in tasks){
        
        if(tasks[x]===":"){
            text+=tasks[x]+"\n";
        }
        else{
            text+=tasks[x];
        }
    }
    
 
  
    return(
        <>
       <p >{text}</p>
     
        </>
    )
}
class Tasks extends React.Component{
    constructor(){
        
    }
    
render(){
    return(
        <>
       <p> <Task1/></p>
      
       </>
    )
}
}
export default Tasks;