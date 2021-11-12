import React, { useEffect, useState } from 'react'
import { Modal , Button, Form , Input, message, Radio, Col , Row} from 'antd'
import axios from 'axios'
import Password from 'antd/lib/input/Password'
import './UserModal.css'

const { Item } = Form
const { Group } = Radio
const UserModal = ({usermodal, setModal , getAllUsers}) => {
    //console.log('EDIT modal - userEDITtails =========', usereditdetails )
    const token = localStorage.getItem('Token')
    const [formedit] = Form.useForm()
   
    const closeModal = ()=>{
        setModal(false)
    }
 
    const saveModal = async (newuser)=>{
        try{ 
            //console.log("por grabar ==",'http://localhost:8080/api/admin/users/' , newuser)
            const response = await axios.post('http://localhost:8080/api/admin/users/', newuser,{headers: {Authorization: 'Bearer ' + token}});
            //console.log("post de usuario-response",response)
            message.success("Se CREO usuario: " + response.data.userName)
            closeModal()
            getAllUsers()
        } catch (error) {
            message.error("Fallo la Grabacion del usuario - Error:"  + error)
            throw error
        }
    }
    
    const formSuccess =(newuser) =>{
        saveModal(newuser)
    } 
    const formFailed =(error) =>{
        message.error("ERROR en los datos. No cumplen las validaciones que se muestran en rojo")
    } 

    const [value, setValue] = useState("admin")
    const onChange =e=>{
        console.log('value', value)
        console.log('e.target.value', e.target.value)
        setValue(e.target.value)
    }

    const handleCancel = ()=>{
        closeModal()
    }

    useEffect(()=>{
        //console.log("EDITMODAL-useEffect de seteo")
        formedit.setFieldsValue ({
                firstName : '',
                lastName : '',
                userName :'x',
                type : '',
                email : '',
            password :'' })
    })

    const formview={
        labelCol:{ span:4}, 
        wrapperCol:{span:20},
      }

    return (
    <div>
      <Modal title='Creacion de nuevo Usuario' 
        visible={usermodal}
        width={700}
        footer={null}
        onCancel={closeModal}
      >
        <Row>
            <Col xs={4} sm={4} md={2} lg={2}></Col>
            <Col xs={20} sm={20} md={22} lg={22}>
        <Form 
            name="formulario" 
            onFinish={formSuccess}
            onFinishFailed={formFailed}
            form={formedit}
            {...formview}
        >
             <Item label="Tipo" 
                name="type" 
                rules={[{ required: true, message: 'Seleccione el TIPO de usuario' }]}
            >
                <Group noStyle onChange={onChange} value={value} name="radioButton" >
                    <Radio value={"admin"}>Administrador</Radio>
                    <Radio value={"visitor"}>Visita</Radio>
                </Group>
            </Item>
            <Item label="Nombre" 
                name="firstName" 
                rules={[{ required: true, message: 'Ingrese el NOMBRE (max:20)' , max:20 }]}
                allowClear
            >
                <Input/>
            </Item>
            <Item label="Apellido" 
                name="lastName" 
                rules={[{ required: true, message: 'Ingrese el APELLIDO (max:20)' , max:20}]}
                allowClear
            >
                <Input  />
            </Item>
           
            <Item 
                label="Mail" 
                name="email" 
                rules={[{ required: true, message: 'Ingrese el Mail (max:70)' , max:70}]}
            >
                <Input />
            </Item>
            <Item
             label="Contraseña" 
             name="password" 
             rules={[{ required: true, message: 'Ingrese Contraseña(max:10-min:3)' , min:3 ,max:10}]}
            >
                <Password  />
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

export default UserModal;