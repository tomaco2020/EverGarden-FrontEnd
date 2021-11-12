import React, {useEffect, useState } from 'react'
import { Modal , Button, Form , Input, message, Select, Col , Row} from 'antd'
import axios from 'axios'
import './ProductModal.css'


const { Item } = Form
const { Option } = Select

const ModalUpDate = ({isModalVisible ,setIsModalVisible ,  getAllProducts , productdetails}) =>{
  console.log('ModalUpDate-productdetails - 1', productdetails)
  const token = localStorage.getItem('Token')
  const [formedit] = Form.useForm()
 
  const handleCancel = ()=>{
    setIsModalVisible(false)
  }

  const saveModal = async (editproduct)=>{
    try{ 
        const sendproduct={...editproduct}
        console.log("por grabar ==",'http://localhost:8080/api/admin/products/'+ productdetails._id)
        const response = await axios.put('http://localhost:8080/api/admin/products/'+ productdetails._id , sendproduct,{headers: {Authorization: 'Bearer ' + token}});
        console.log("put de producto-response",response)
        message.success("Se Actualizo el producto: " + sendproduct.product)
        handleCancel()
        getAllProducts()
    } catch (error) {
        message.error("Fallo la Actualizacion del Producto - Error:"  + error)
        throw error
    }
} 

const formSuccess =(editproduct) =>{
  saveModal(editproduct)
} 
const formFailed =(error) =>{
  message.error("ERROR en los datos, no pasan las validaciones=>" + error)
}

const [value, setValue] =  useState("Jardin vertical")
    const onChange =e=>{
      console.log('value', value)
      console.log('e',e)
        setValue(e)
        console.log('value', value)
    }

useEffect(()=>{
  if (typeof productdetails._id !== undefined){
      formedit.setFieldsValue ({
        product: productdetails.product,
        brand: productdetails.brand,
        category: productdetails.category,
        description: productdetails.description,
        dimensions: productdetails.dimensions,
        use: productdetails.use,
        photo_url: productdetails.photo_url,
        price: productdetails.price
      } )
  } else {
      formedit.setFieldsValue ({
        product: '',
        brand: '',
        category: '',
        description: '',
        dimensions: '',
        use: '',
        photo_url: '',
        price: ''
      } )
  }
} , [formedit,productdetails])

 const formview={
    labelCol:{
    span:8},
    wrapperCol:{
      span:16
      },
  }


return (
  <div>
    <Modal title='Edición de Datos de Producto' 
      visible={isModalVisible}
      width={1000}
      footer={null}
      onCancel={handleCancel}
    >
      <Row>
        <Col xs={1} sm={2} md={6} lg={7}></Col>
        <Col xs={22} sm={20} md={12} lg={10}>
          <Form 
            name="Formulario" 
            onFinish={formSuccess}
            onFinishFailed={formFailed}
            form={formedit}
            {...formview}
            onCancel={handleCancel}
          >
            <Item label="Producto" 
              name="product" 
              rules={[{ required: true, message: 'Ingrese nombre del PRODUCTO (max:20)' , max:20 }]}
            >
              <Input />
            </Item>

            <Item label="Marca" 
              name="brand" 
              rules={[{ required: true, message: 'Ingrese la MARCA (max:20)' , max:20}]}
            >
              <Input />
            </Item>

            <Item label="Categoria" 
              name="category" 
              rules={[{ required: true, message: 'Seleccione el TIPO de Categoria'}]}
              
            >
                <Select value={value}
                  placeholder="Seleccione categoria"
                  onChange={onChange}
                  
                  name="select"
                >
                  <Option value={"Jardin vertical"}>Jardin vertical</Option>
                  <Option value={"repuestos"}>repuestos</Option>
                  <Option value={"armado"}>armado</Option>
                  <Option value={"vegetal"}>vegetal</Option>
                  <Option value={"accesorios riego"}>accesorios riego</Option>
                  <Option value={"tierras"}>tierras</Option>
                </Select>
            </Item>

            <Item label="Descripcion" 
              name="description" 
              rules={[{ required: true, message: 'Ingrese DESCRIPCION (max:200)' , max:200}]}
            >
              <Input />
            </Item>

            <Item label="Dimensiones" 
              name="dimensions" 
              rules={[{ required: true, message: 'Ingrese DIMENSIONES (max:15)' , max:15}]}
            >
              <Input />
            </Item>

            <Item label="Tipo de Uso" 
              name="use" 
              rules={[{ required: true, message: 'Ingrese tipo de USO (max:15)' , max:15}]}
            >
              <Input />
            </Item>

            <Item label="Url" 
              name="photo_url" 
              rules={[{ required: true, message: 'Ingrese URL (max:200)' , max:200}]}
            >
              <Input />
            </Item>

            <Item label="Precio" 
              name="price" 
              rules={[{ required: true, message: 'Ingrese PRECIO'}]}
            >
              <Input />
            </Item>

            <Item style={{textAlign:'center'}}>
              <Button type="primary" htmlType="submit">Guardar</Button>
                &nbsp;&nbsp;&nbsp;
              <Button htmlType="button" onClick={handleCancel}>Cancelar</Button>
            </Item>

          </Form>
        </Col>
      </Row>
    </Modal>
  </div>
)
}

export default ModalUpDate;