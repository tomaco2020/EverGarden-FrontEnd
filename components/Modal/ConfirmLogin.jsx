import React from 'react';
import {Modal} from 'antd';
import GoToMain from '../GoToMain'

const ConfirmLogin = ({isModalLogin ,setIsModalLogin , userLogin}) => {
  //console.log('ConfirmLogin-', userLogin)
  
  const handleOK =  () => {
    //console.log('ModalConfirm-3 ',hhh)
    GoToMain()
    setIsModalLogin(false)
   } 

  return (
    <Modal 
        title="Acceso Exitoso" 
        visible={isModalLogin} 
        onOk={handleOK} 
        onCancel={handleOK}
        cancelButtonProps={{ style: { display: 'none' } }}
    >
        <h3 > Bienvenido:</h3>
        <h3 color="#666600">{userLogin.username}</h3>
        <p>Utilice la seccion CONFIGURACIONES del menu lateral para realizar acciones de administrador</p>
      </Modal>
  );
};

export default ConfirmLogin;
