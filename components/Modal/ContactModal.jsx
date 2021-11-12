import React, { useState } from 'react';
import { Modal, Button, Form, Input, Select} from 'antd';
import imgContacto from '../../images/contacto.jpg'
import './ContactModal.css'
import emailjs from 'emailjs-com';
import icon from '../../images/logo.png'

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const { Option } = Select;

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select style={{ width: 70 }}>
      <Option value="Fijo">Fijo</Option>
      <Option value="Cel">Cel</Option>
    </Select>
  </Form.Item>
);

const onFinish = (values) => {
  console.log(values);
};

const ContactModal = (visible) => {
  const [isModalVisible, setIsModalVisible] = useState(visible);
  console.log('modal visible', visible)
  

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('gmail', 'YOUR_TEMPLATE_ID', e.target, 'user_BOJeRzFp358nxIsJ63hF4')
      .then((result) => {
          console.log('enviado',result.text);
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset()
  }

  return (
       <div>

        <img className="img-contact" src={imgContacto} alt="" />

      <Modal icon= {icon} title="Contacto" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
          <Form.Item
            name={['user', 'name']}
            label="Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={['user', 'email']}
            label="Email"
            rules={[
              {
                type: 'email',
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item 
            name={['user', 'introduction']} 
            label="Mensaje"
            rules={[
              {
                required: true,
              },
            ]}
            >
            <Input.TextArea />
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit" onSubmit={sendEmail}>
              Enviar
            </Button>
          </Form.Item>
      </Form>
      </Modal>
      </div>
  );
};

export default ContactModal