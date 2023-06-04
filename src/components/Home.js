import React, { useEffect, useState } from 'react'
import { Button, Panel,Modal,Form,useToaster } from 'rsuite'
import Notification from 'rsuite/Notification'
import TaskItem from './TaskItem'
import { endpoint } from '../App'
import axios from 'axios'




const Home = () => {
  const [IsOpen,setIsOpen]=useState(false)
  const [tasks,setTasks]=useState(null)
  const [IsFilterModalOpen,setIsFilterModalOpen]=useState(false)
  const [data,setCurrentData]=useState(null)
  const [filterDate,setFilterDate]=useState(null)
  const [filterApplied,setFilterApplied]=useState(false)
  const [dateFilter,setDateFilter]=useState(null)

  const toaster=useToaster();

  const alertMessage=(info)=>{
    toaster.push(<Notification type="info">{info}</Notification>,{
      placement:'topCenter',
      duration:1500
    })
  }

  const applyFilter=(data)=>{

    if(data!==null){
      setDateFilter(data)
    setTasks(tasks.filter((item)=>item.taskDate===data))
    setIsFilterModalOpen(false)
    setFilterApplied(true)
    alertMessage('Filter applied!')
    }else{
      alertMessage('Empty filter !!')
    }
    
  }


  const fetchTasks=()=>{
    //changes
    axios.get(endpoint).then(res=>{
      setTasks(res.data)
    })
  }

  
  useEffect(()=>{
    try{
      fetchTasks()

    // console.log(tasks)
    }catch(err){
      
    }
  },[])

  const saveTask=(data)=>{
  
    setTasks([...tasks,data])
    
   try{
    // changes
    axios.post(endpoint,data).then(res=>{
      fetchTasks()
      alertMessage('Task added!')
    })
   }catch(err){

   }
    setIsOpen(false)
  }

  return (
    <div style={{display:'flex',justifyContent:'center',background:'wheat',height:'100vh'}}>
        <Panel bordered shaded style={{width:'50em',background:'white',height:'90vh',alignSelf:'center'}}>
            <h3 align="center" style={{fontWeight:'300'}}>Taskify</h3>
            <hr/>
           <div className="no-overflow">
           <div className='centered' >
            {tasks && tasks.map((item,idx)=>{
              return <TaskItem id={item._id} key={idx} idx={idx+1} date={item.taskDate} time={item.taskTime} title={item.taskName} setTasks={setTasks}/>
            })}
            {(!tasks || tasks.length===0) &&(!filterApplied) && <div style={{marginTop:'15em'}}><i>Add some tasks to view them here</i></div>}
            {filterApplied && tasks.length===0 && <div style={{marginTop:'15em'}}><i>No tasks due in {dateFilter}</i></div>}
            </div>
           </div>
           <Button block appearance="primary" color="violet" onClick={()=>{
            setIsFilterModalOpen(true)
            
            }} style={{marginTop:'15px'}}>Sort Task</Button>
            <Button appearance="primary" block onClick={()=>{
                setIsOpen(true)
            }}>New Task</Button>
        </Panel>
        <Modal open={IsFilterModalOpen} onClose={()=>{
          setIsFilterModalOpen(false)
        }}>
          <Form fluid>
          <Modal.Header>
            <h4>Apply a filter</h4>
          </Modal.Header>
          <Modal.Body>
          <Form.Group>
            <Form.ControlLabel>Tasks of a date to filter out</Form.ControlLabel>
            <input type="date" style={{width:'100%',border:'1px solid #ccc',fontSize:'14px',padding:'7px 11px',borderRadius:'6px'}} onChange={(event)=>{
              setFilterDate(event.target.value)
            }}/>
            </Form.Group>
          
          </Modal.Body>
          </Form>
          <Modal.Footer>
          {filterApplied && <Button block appearance="subtle" color="red" onClick={()=>{
            fetchTasks()
            setFilterApplied(false)
            setIsFilterModalOpen(false)
            alertMessage('Filter removed!')
            setFilterDate(null)}}>Remove Filter</Button>}
          <Button block appearance="primary" color="green" onClick={()=>{
              applyFilter(filterDate)
            }}>Apply Filter</Button>
            
          </Modal.Footer>
         
        </Modal>
        <Modal open={IsOpen} onClose={()=>{
          setIsOpen(false)
        }}>
          
          <Modal.Header><h4>Add a new task</h4></Modal.Header>
          <Modal.Body>
            <Form fluid>
            <Form.Group>
            <Form.ControlLabel>Task Info</Form.ControlLabel>
            <Form.Control name="title" onChange={(val)=>{
                setCurrentData({...data,taskName:val})
            }}/>
            </Form.Group>
            <Form.Group>
            <Form.ControlLabel>To be completed on</Form.ControlLabel>
            <input type="date" style={{width:'100%',border:'1px solid #ccc',fontSize:'14px',padding:'7px 11px',borderRadius:'6px'}} onChange={(event)=>{
              setCurrentData({...data,taskDate:event.target.value})
            }}/>
            </Form.Group>
            <Form.Group>
            <Form.ControlLabel>To be completed at</Form.ControlLabel>
            <input type="time" style={{width:'100%',border:'1px solid #ccc',fontSize:'14px',padding:'7px 11px',borderRadius:'6px'}} onChange={(event)=>{
              setCurrentData({...data,taskTime:event.target.value})
            }}/>
            </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
          
            <Button block appearance="primary" color="green" onClick={()=>{
              saveTask(data);
            }}>SAVE TASK</Button>
           
          </Modal.Footer>
          
        </Modal>
    </div>
    
  )
}

export default Home