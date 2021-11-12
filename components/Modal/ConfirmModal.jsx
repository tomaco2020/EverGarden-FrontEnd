import React from 'react';
import {Modal, message} from 'antd';
import axios from 'axios'

const ConfirmModal = ({isModalVisible ,setIsModalVisible ,  getAllUsers , userdetails}) => {
 // console.log('ConfirmModal-usertails - 1', userdetails)
  const userid =  'http://localhost:8080/api/admin/users/' + userdetails._id
 // console.log('ConfirmModal-bookdetails -2 ',userid)
 const token = localStorage.getItem('Token') 

  const handleCancel = () => {
    setIsModalVisible(false)
  };

  const handleOnDelete = async (hhh) => {
    //console.log('ModalConfirm-3 ',hhh)
    try{
      const response = await axios.delete(userid,{headers: {Authorization: 'Bearer ' + token}});
      //validar que salio ok el delete para refrescar la tabla
      //console.log('despues de borrar',response)
      message.success('Usuario Borrado con Exito')
      getAllUsers()
      setIsModalVisible(false)
    } catch (error){
      message.error('Error de borrado de Usuario: ' + error)
      throw error
    }
  } 
  return (
      <Modal title="Confirma Borrar este Usuario ?" visible={isModalVisible} onOk={handleOnDelete} onCancel={handleCancel}>
        <h3 >{userdetails.firstName +" "+ userdetails.lastName}</h3>
        <p>{userdetails.userName}</p>
        <p>{userdetails.email}</p>
      </Modal>
  );
};

export default ConfirmModal;
