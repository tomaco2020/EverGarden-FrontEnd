import React, { useEffect, useState } from 'react'
import { Modal , Button, Form , Input, message, Radio, Col , Row} from 'antd'
import axios from 'axios'
import './UserModal.css'

const { Item } = Form
const { Group } = Radio

const EditModal =({isEditModalVisible, setIsEditModalVisible, getAllUsers,  usereditdetails, setUserEditdetails}) => {
    //console.log('EDIT modal - userEDITtails =========', usereditdetails )
    const token = localStorage.getItem('Token')
    const [formedit] = Form.useForm()
   
    const closeModal = ()=>{
        setUserEditdetails({})
        setIsEditModalVisible(false)
    }
 
    const saveModal = async (edituser)=>{
        try{ 
            const senduser={...edituser , password : '123456' }
            //console.log("por grabar ==",'http://localhost:8080/api/admin/users/'+ usereditdetails._id)
            const response = await axios.put('http://localhost:8080/api/admin/users/'+ usereditdetails._id , senduser,{headers: {Authorization: 'Bearer ' + token}});
            //console.log("put de usuario-response",response)
            message.success("Se Actualizo usuario: " + senduser.userName)
            closeModal()
            getAllUsers()
        } catch (error) {
            message.error("Fallo la Grabacion del usuario - Error:"  + error)
            throw error
        }
    }
    
    const formSuccess =(edituser) =>{
        saveModal(edituser)
    } 
    const formFailed =(error) =>{
        message.error("ERROR en los datos. No cumplen las validaciones que se muestran en rojo")
    } 

    const [value, setValue] = useState("admin")
    const onChange =e=>{
        setValue(e.target.value)
    }

    const onCancel = ()=>{
        closeModal()
    }

    useEffect(()=>{
        //console.log("EDITMODAL-useEffect de seteo")
        if (typeof usereditdetails.firstName !== undefined){
            formedit.setFieldsValue ({
                firstName : usereditdetails.firstName,
                lastName : usereditdetails.lastName,
                userName: usereditdetails.userName,
                type : usereditdetails.type,
                email : usereditdetails.email  })
        } else {
            formedit.setFieldsValue ({
                firstName : '',
                lastName : '',
                userName :'',
                type : '',
                email : '' })
        }
    } , [formedit,usereditdetails])


    return (
    <div>
      <Modal title='Edicion de datos del Usuario' 
        visible={isEditModalVisible}
        width={700}
        footer={null}
        onCancel={closeModal}
      >
        <Row>
            <Col xs={1} sm={2} md={3} lg={4}></Col>
            <Col xs={23} sm={22} md={21} lg={18}>
        <Form 
            name="formulario" 
            onFinish={formSuccess}
            onFinishFailed={formFailed}
            form={formedit}
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
            >
                <Input />
            </Item>
            <Item label="Apellido" 
                name="lastName" 
                rules={[{ required: true, message: 'Ingrese el APELLIDO (max:20)' , max:20}]}
            >
                <Input />
            </Item>
            <Item label="Usuario" 
                name="userName" 
            >
                <p>{usereditdetails.userName}</p> 
            </Item>
           
            <Item 
                label="Mail" 
                name="email" 
                rules={[{ required: true, message: 'Ingrese el Mail (max:70)' , max:70}]}
            >
                <Input />
            </Item>
            <Item style={{textAlign:'center'}}>
                <Button type="primary" htmlType="submit">Guardar</Button>
                &nbsp;&nbsp;&nbsp;
                <Button htmlType="button" onClick={onCancel}>Cancelar</Button>
            </Item>
        </Form>
       </Col>
      </Row>
    </Modal>
    </div>
)
}

export default EditModal;