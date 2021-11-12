import React, { useEffect, useState } from 'react'
import {message,Table , Button} from 'antd'
import axios from 'axios'
import {DeleteOutlined , EditOutlined , PlusCircleOutlined} from '@ant-design/icons';
import UserModal from '../Modal/UserModal'
import ConfirmModal from '../Modal/ConfirmModal'
import EditModal from '../Modal/EditModal'
import GoToMain from '../GoToMain'

const UsersCrud = () => {
  const [users, setUsers] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false);
  const token = localStorage.getItem('Token')

  const getAllUsers = async () => {
    if(token){
    try{
      const resp = await axios.get('http://localhost:8080/api/admin/users',{headers: {Authorization: 'Bearer ' + token}});
      //console.log("Nuevo usuario", resp.data)
      setUsers(resp.data)
    } catch(error){
      localStorage.removeItem('Token')
      GoToMain()   
      message.error("Sesión expirada. Inicie sesión nuevamente", 4)
      throw error        
    } }   
    else {
      alert ('Debe iniciar sesion como usuario administrador para acceder a esta ruta')
      GoToMain()
    }
  }

  useEffect(() =>{
    getAllUsers()
  },[]
  )

  const [usermodal, setModal] = useState(false)
  const openModal = ()=>{
      setModal(true)
   }
  const [ userdetails, setUsersdetails]  = useState({})

  const handleOnDelete = (event) => {
    //antes de borrar llamar a un modal que confirme que quiere borrar ese libro
    setUsersdetails (event)
    setIsModalVisible(true)
  } 

  const [ isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [ usereditdetails, setUserEditdetails]  = useState({})

  const handleOnEdit = (row) => {
    //console.log('USERS.jx --handleOnedit====> ROW', row)
    setUserEditdetails (row)
    //console.log('USERS.jx - usereditdetails ===>', usereditdetails)
    setIsEditModalVisible(true)
  } 
  
    const columns = [
    {
      title: 'Nombre',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Apellido',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Usuario',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Mail',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Tipo',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Accion',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, row) =>
        <>
          <DeleteOutlined style={{fontSize:'25px', color:"#666600"}}  onClick={()=>handleOnDelete(row)}/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <EditOutlined style={{fontSize:'25px', color:'#5E498C'}}  onClick={()=>handleOnEdit(row)} />
        </>
    }
        
  ];
 
  if(token){
  return (
    <div>
      <Button type="primary" icon={<PlusCircleOutlined/>} onClick={ openModal} >Agregar Usuario</Button>
      <UserModal 
        usermodal={usermodal} 
        setModal={setModal} 
        getAllUsers={getAllUsers} 
      />
      <ConfirmModal 
        isModalVisible={isModalVisible} 
        setIsModalVisible={setIsModalVisible} 
        getAllUsers={getAllUsers} 
        userdetails={userdetails} 
      />
      <EditModal 
        isEditModalVisible={isEditModalVisible}
        setIsEditModalVisible={setIsEditModalVisible} 
        getAllUsers={getAllUsers} 
        usereditdetails={usereditdetails} 
        setUserEditdetails={setUserEditdetails}
      />
      <Table dataSource={users} columns={columns} rowKey="_id"/>
    </div>)}
    else {
      return null
    }

  
}

export default UsersCrud
