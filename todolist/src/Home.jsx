import React, { useEffect, useState } from'react';
import'./App.css';
import Create from './Create';
import axios from'axios';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs'; // Correct import statements for icons


function Home(){
    const[todos,setTodos]=useState([])
    const[cancel,setCancel]=useState(true)
    useEffect(()=>{
        axios.get('http://localhost:4001/get')
        .then(result=>setTodos(result.data))
        .catch(err=>console.log(err))

    },[])
    const handleEdit=(id)=>{
        axios.put('http://localhost:4001/update/'+id)
        .then(result=>{
            location.reload()
        })
        .catch(err=>console.log(err))
    }
    const handleEdit1=(id)=>{
        axios.put('http://localhost:4001/update1/'+id)
        .then(result=>{
            location.reload()
        })
        .catch(err=>console.log(err))
    }
    const handleDelete=(id)=>{
        axios.delete('http://localhost:4001/delete/'+id)
        .then(result=>{
            location.reload()
        })
        .catch(err=>console.log(err))

    }
    
    return(
        <div>
            <h2 className='empty'>Todo List</h2>
            <Create/>
            <div style={{marginTop:'20px'}}> 
            {
                todos.length === 0
                ?
                <div><h2 className='empty'>No Records</h2></div>
                :
                todos.map(todo=>( 
                    
                    <div className='empty2' key={todo._id}> 
                        <div className='checkbox'onClick={todo.done==false?()=>handleEdit(todo._id):()=>handleEdit1(todo._id)}>
                            {
                            
                            todo.done === true?<BsFillCheckCircleFill className='icon'></BsFillCheckCircleFill>
                            :  <BsCircleFill className='icon'/>  

                            }
                        
                       <div className='empty3'> <p  className={todo.done?"line_through":"line"}>{todo.task}</p></div>
                        </div> 
                        <div>
                            <span><BsFillTrashFill className="icon" onClick={async()=>handleDelete(todo._id)}/></span>
                        </div>
                        </div>
                       
                        
                ))
            } 
             </div>
        </div>
    )
}
export default Home;