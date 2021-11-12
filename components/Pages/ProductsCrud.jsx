import React, { useEffect, useState } from 'react'
import { Table , Button, message} from 'antd'
import axios from 'axios'
import {DeleteOutlined , EditOutlined, PlusCircleOutlined} from '@ant-design/icons'
import ProductModal from '../../components/Modal/ProductModal'
import ModalConfirm from '../../components/Modal/ModalConfirm'
import ModalUpDate from '../../components/Modal/ModalUpDate'
import GoToMain from '../../components/GoToMain'
import './ProductsCrud.css'


const ProductsCrud = () => {

  const [products, setProducts] = useState([])
  const [isModalVisibleDelete, setIsModalVisibleDelete] = useState(false);
  const [isModalVisibleUpDate, setIsModalVisibleUpDate] = useState(false);
  const token = localStorage.getItem('Token') 
  
   const getAllProducts = async () => {
    if (token){
    try{
      const resp = await axios.get('http://localhost:8080/api/admin/products',{headers: {Authorization: 'Bearer ' + token}});
      console.log(resp.headers)
      setProducts(resp.data)
      
    }
      catch(error){
        localStorage.removeItem('Token')
        GoToMain()   
        message.error("Sesión expirada. Inicie sesión nuevamente", 4)
        throw error        
      }
           
    }
    else{
      alert ('Debe iniciar sesion como usuario administrador para acceder a esta ruta')
      GoToMain()
    }
  }

  useEffect(() =>{
    getAllProducts()
  },[]
  )

  const [productmodal, setProductModal] = useState(false)
  
  const openModal = ()=>{
    setProductModal(true)
   }
 
  const [ productdetails, setProductdetails]  = useState({})
    
  const handleOnDelete = (event) => {
        //antes de borrar llamar a un modal que confirme que quiere borrar ese libro
    setProductdetails (event)
       // console.log('books-handleOnDelete', bookdetails)
    setIsModalVisibleDelete(true)
    //const deleteId = event._id
          /*  const response = await axios.delete('http://localhost:8080/api/books/' + deleteId)
            //validar que salio ok el delete para refrescar la tabla
            console.log(response)
            getAllBooks()*/
    } 

  const handleOnUpDate= (event) => {
      //antes de borrar llamar a un modal que confirme que quiere borrar ese libro
    setProductdetails (event)
     // console.log('books-handleOnDelete', bookdetails)
     setIsModalVisibleUpDate(true)
    //const deleteId = event._id
        /*  const response = await axios.delete('http://localhost:8080/api/books/' + deleteId)
          //validar que salio ok el delete para refrescar la tabla
          console.log(response)
          getAllBooks()*/
  } 

  const columns = [
    {
      title: 'Producto',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Marca',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'Categoria',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Descripcion',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Dimensiones',
      dataIndex: 'dimensions',
      key: 'dimensions',
    },
    {
      title: 'Uso',
      dataIndex: 'use',
      key: 'use',
    },
    {
      title: 'Imagen',
      dataIndex: 'photo_url',
      key: 'photo_url',
    },
    {
      title: 'Precio',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, row) =>
        <>
          <DeleteOutlined style={{fontSize:'25px', color:'#666600'}} onClick={()=>handleOnDelete(row)}/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <EditOutlined style={{fontSize:'25px', color:'#663399'}} onClick={() =>handleOnUpDate(row)} />
        </>
    },

  ];
  
    if (token){
      return(
    <div>
      <Button type="primary" icon={<PlusCircleOutlined/>} onClick={openModal} >Nuevo Producto</Button>
      <ProductModal productmodal={productmodal} setProductModal={setProductModal} getAllProducts={getAllProducts} />
      <ModalConfirm isModalVisible={isModalVisibleDelete} setIsModalVisible={setIsModalVisibleDelete} getAllProducts={getAllProducts} productdetails={productdetails} />
      <ModalUpDate isModalVisible={isModalVisibleUpDate} setIsModalVisible={setIsModalVisibleUpDate} getAllProducts={getAllProducts} productdetails={productdetails}/>
      <Table dataSource={products} columns={columns} rowKey="_id"/>
    </div>)}
    else {
      return null
    }}



export default ProductsCrud