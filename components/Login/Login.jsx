import React , {useState } from 'react';
import { Form, Input, Button, Checkbox, Space } from 'antd';
import './Login.css'
import axios from 'axios'
import { message } from 'antd';
import ConfirmLogin from '../Modal/ConfirmLogin'

const layout = {
  labelCol: {
    span:4,
  },
  wrapperCol: {
    span: 20,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 20,
  },
};


const MyLogin = ({HandleConfig}) => {
  let readyToRedirect = false 
  const [userLogin ,setUserLogin] = useState("");
  const [isModalLogin ,setIsModalLogin] = useState(false);
  const onFinish = async(values) => {
   // console.log('Success:', values);
    const userObject = 
      {
        userName: values.username,
        password: values.password
      }
    //console.log ('userObject:', userObject)
    try{
    const response = await axios.post('http://localhost:8080/api/admin/users/login/', userObject );
     localStorage.setItem("Token", response.data.token) 
     readyToRedirect = true
    } catch(err){
      message.error('Error de inicio de sesión. Verifique usuario y contraseña ingresados',5)
    }
    finally{
      if (readyToRedirect === true){
        //console.log("finally" , values)
        //activo el modal
        setUserLogin(values)
        setIsModalLogin(true)
        HandleConfig()
        //GoToMain()
      }
    };
  }

  const onFinishFailed = (errorInfo) => {
    message.error('LOGIN Failed: ' + errorInfo);
  };
 
  return (
    <Space>
      <ConfirmLogin 
        isModalLogin = {isModalLogin} 
        setIsModalLogin ={setIsModalLogin} 
        userLogin={userLogin}/>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true, }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Usuario"
        name="username"
        rules={[
          {
            required: true,
            message: 'Ingrese su nombre de usuario',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Contraseña"
        name="password"
        rules={[
          {
            required: true,
            message: 'Ingrese su contraseña',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Recordarme</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>

        <Button type="primary" htmlType="submit" style={{backgroundColor: '#666600', border: 'none'}}>
          Ingresar
        </Button>
      </Form.Item>
    </Form>
    </Space>
  );
};

export default MyLogin
