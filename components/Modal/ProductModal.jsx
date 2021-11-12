import React, {useState, useEffect } from 'react'
import { Modal , Button, Form , Input, message, Select, Row, Col} from 'antd'
import axios from 'axios'
import './ProductModal.css'

const {Item}=Form
const { Option } = Select

const ProductModal =({productmodal, setProductModal , getAllProducts}) =>{
    console.log('dentro del product modal- modal', productmodal)
    const token = localStorage.getItem('Token')
    const [formedit] = Form.useForm()
    
    const closeModal = ()=>{
      setProductModal(false)
    }

    const saveModal = async (newproduct)=>{
      try{
          const resp = await axios.post('http://localhost:8080/api/admin/products', newproduct,{headers: {Authorization: 'Bearer ' + token}});
          console.log(resp)
          message.success("Se Creo Nuevo Producto: " + resp.data.product)
          closeModal()
          getAllProducts()
      } catch (error){
          message.error("Fallo la Grabacion del Producto - Error:"  + error)
          throw error
      }
  };

  const formSuccess =(newproduct) =>{
    saveModal(newproduct)
  }

  const formFailed =(error) =>{
    message.error("ERROR en los datos. No cumplen las validaciones que se muestran en rojo")
  }

  const [value, setValue] =  useState("Jardin vertical")
    const onChange =e=>{
      console.log('value', value)
      console.log('e',e)
        setValue(e)
        console.log('value', value)
    }

  const handleCancel = ()=>{
    closeModal()
  }

  useEffect(()=>{
    console.log("EDITMODAL-useEffect de seteo")
    formedit.setFieldsValue ({
      product: '',
      brand: '',
      category: '',
      description: '',
      dimensions: '',
      use: '',
      photo_url: '',
      price:0 })
  })

    /*const handleNewProduct=e=>{
        const {name, value } = e.target ;
        setNewProduct({...newproduct, [name]: value});
        console.log('nuevo producto', newproduct)
    }*/

    
        
    const formview={
        labelCol:{
            span:8},
        wrapperCol:{
            span:16
        },
    }
           
return (
    <div>
      <Modal title='Nuevo Producto' 
        visible={productmodal}
        width={1000}
        footer={null}
        onCancel={closeModal}
      >
        <Row>
            <Col xs={1} sm={2} md={3} lg={4}></Col>
            <Col xs={23} sm={22} md={21} lg={18}>
          <Form {...formview}
            name="formulario" 
            onFinish={formSuccess}
            onFinishFailed={formFailed}
            form={formedit}
          >
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
            <Item label="Producto" 
              name="product" 
              rules={[{ required: true, message: 'Ingrese nombre del PRODUCTO (max:20)' , max:20 }]}
              allowClear
            >
                <Input/>
            </Item>

            <Item label="Marca" 
              name="brand" 
              rules={[{ required: true, message: 'Ingrese la MARCA (max:20)' , max:20}]}
              allowClear
            >
                 <Input/>
            </Item>

            <Item label="Descripcion" 
              name="description" 
              rules={[{ required: true, message: 'Ingrese DESCRIPCION (max:200)' , max:200}]}
              allowClear
            >
              <Input/>
            </Item>

             <Item label="Dimensiones" 
              name="dimensions" 
              rules={[{ required: true, message: 'Ingrese DIMENSIONES (max:15)' , max:15}]}
              allowClear
            >
                 <Input/>
             </Item>

             <Item label="Tipo de Uso" 
              name="use" 
              rules={[{ required: true, message: 'Ingrese tipo de USO (max:15)' , max:15}]}
              allowClear
            >
                 <Input/>
             </Item>

             <Item label="Url Imagen" 
              name="photo_url" 
              rules={[{ required: true, message: 'Ingrese URL (max:200)' , max:200}]}
              allowClear
            >
                 <Input/>
             </Item>

              <Item label="Precio" 
              name="price" 
              rules={[{ required: true, message: 'Ingrese PRECIO'}]}
              allowClear
            >
                 <Input/>
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

export default ProductModal;