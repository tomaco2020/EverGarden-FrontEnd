import React from 'react';
import {Modal} from 'antd';
import axios from 'axios'

const ModalConfirm = ({isModalVisible ,setIsModalVisible ,  getAllProducts , productdetails}) => {
  console.log('ModalConfirm-bookdetails - 1', productdetails)
  const productid =  'http://localhost:8080/api/admin/products/' + productdetails._id
  console.log('ModalConfirm-productdetails -2 ',productid)
  const token = localStorage.getItem('Token')

  const handleCancel = () => {
    setIsModalVisible(false)
  };

  const handleOnDelete = async (hhh) => {
    console.log('ModalConfirm-productdetails -3 ',hhh)
    try{
      const response = await axios.delete(productid,{headers: {Authorization: 'Bearer ' + token}});
      //validar que salio ok el delete para refrescar la tabla
      console.log('despues de borrar',response)
      getAllProducts()
      setIsModalVisible(false)
    } catch (error){
      console.log('handleOndelete-error', error)
      throw error
    }
  } 

  return (
      <Modal 
        title="Desea Eliminar un Producto ?" 
        visible={isModalVisible} 
        onOk={handleOnDelete} 
        onCancel={handleCancel}
      >
        <p>{productdetails.product}</p>
        <p>{productdetails.brand}</p>
        <p>{productdetails.category}</p>
      </Modal>
  );
};

export default ModalConfirm;
