import React,{ useState} from 'react'
import { Button,Form,Modal,useToaster} from 'rsuite'
import Notification from 'rsuite/Notification'
import {FaEdit} from 'react-icons/fa'
import {endpoint} from '../App'
import {RiDeleteBin2Line} from 'react-icons/ri'
import axios from 'axios'
const TaskItem = ({id,idx,date,time,title,setTasks}) => {

  
  const [IsOpen,setIsOpen]=useState(false)
  const [data,setCurrentData]=useState(null)

  const toaster=useToaster();

  const alertMessage=(info)=>{
    toaster.push(<Notification type="info">{info}</Notification>,{
      placement:'topCenter'
    })
  }

  

  const saveEdited=(id)=>{
    axios.patch(`${endpoint}/${id}`,data).then(res=>{

      axios.get(endpoint).then(res=>{
        setTasks([...res.data])
      })
      alertMessage(`Task updated successfully!`)
    })
    setIsOpen(false);
  }

  const deleteTask=(id)=>{
    axios.delete(`${endpoint}/${id}`).then(res=>{
      
      axios.get(endpoint).then(res=>{
        setTasks([...res.data])
      })
       
      alertMessage('Task Deleted!')
    })

  
  }

  const fetchTask=(id)=>{
    
      axios.get(`${endpoint}/${id}`).then(res=>{
        setCurrentData(res.data)
      })      
  }


  return (
    <div className="item">
        <div style={{display:'flex'}}>
            <div className="item_index"><b>{idx}</b></div>
            <div className="item_info">
               <div style={{fontStyle:"italic",fontSize:'12px'}}>{`Valid Till : ${date}  ${time}`}</div>
                <p align="left" style={{fontSize:'1.3em'}}>{title}</p>
            </div>
            <div style={{display:'flex',alignSelf:'center',padding:'0.4em'}}><Button appearance="subtle" onClick={()=>{
              deleteTask(id)
            }}><RiDeleteBin2Line size={20}/></Button></div>
            <div style={{display:'flex',alignSelf:'center',padding:'0.4em'}}><Button appearance="subtle" onClick={()=>{
              fetchTask(id)
              setIsOpen(true)
            }}><FaEdit size={20}/></Button></div>
        </div>
       {data &&  <Modal open={IsOpen} onClose={()=>{
          setIsOpen(false)
        }}>
          
          <Modal.Header><h4>Edit Task</h4></Modal.Header>
          <Modal.Body>
            <Form fluid>
            <Form.Group>
            <Form.ControlLabel>Task Info</Form.ControlLabel>
            <Form.Control name="title" value={data.taskName} onChange={(val)=>{
                setCurrentData({...data,taskName:val})
            }}/>
            </Form.Group>
            <Form.Group>
            <Form.ControlLabel>To be completed on</Form.ControlLabel>
            <input type="date" value={data.taskDate} style={{width:'100%',border:'1px solid #ccc',fontSize:'14px',padding:'7px 11px',borderRadius:'6px'}} onChange={(event)=>{
              setCurrentData({...data,taskDate:event.target.value})
            }}/>
            </Form.Group>
            <Form.Group>
            <Form.ControlLabel>To be completed at</Form.ControlLabel>
            <input type="time" value={data.taskTime} style={{width:'100%',border:'1px solid #ccc',fontSize:'14px',padding:'7px 11px',borderRadius:'6px'}} onChange={(event)=>{
              setCurrentData({...data,taskTime:event.target.value})
            }}/>
            </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button block appearance="primary" color="green" onClick={()=>{
              saveEdited(id)
            }}>SAVE TASK</Button>
          </Modal.Footer>
          
        </Modal>}
      
    </div>
  )
}

export default TaskItem