import React, { useState, useEffect} from 'react'
import { Button, Layout, Menu, message } from 'antd'
import './Layout.css'
//import './Layout_1.css'
import  {NavLink,  Routes, Route} from 'react-router-dom'
import AboutUs from '../Pages/AboutUs'
import ContactModal from '../Modal/ContactModal'
import imgHeader from '../../images/LOGO_EVER_GARDEN_APAISADO.jpg'
import iconFacebook from "../../images/facebook.png"
import iconInstagram from "../../images/instagram.png"
import iconMail from "../../images/mail.png"
import iconMap from "../../images/ubicacion.png"
import logoPlanta from '../../images/logo.png'

import {
  HomeOutlined,
  IdcardOutlined,
  PictureOutlined,
  TeamOutlined,
  ShopOutlined,
  SettingOutlined
} from '@ant-design/icons'
import MyCarousel from '../Carousel/Carousel'
import IndexPage from '../Pages/Index'
import MyLogin from '../Login/Login'
import Products from '../Pages/products'
import ProductsCrud from '../Pages/ProductsCrud'
import MenuAdmin from '../Pages/MenuAdmin'
import Users from '../Pages/Users'
import GoToMain from '../GoToMain'
import Error404 from '../Pages/Error404'

const { Header, Content, Footer, Sider } = Layout;
const {SubMenu} = Menu

const MyLayout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(true);

  
// quizas haya que hacerlo directamente en App asociado a las credenciales de usuario como le dijo 
// Ramiro a Santi en la consulta (Ver el video de youtube)
//la condicion deberia ir mas alla de la sola existencia del token, permisos!

     useEffect(()=>{
    if (localStorage.getItem('Token')){ 
      setIsConfigHidden (false)
    } else {
      setIsConfigHidden(true)
    }
  })
 
  const [isConfigHidden, setIsConfigHidden] = useState(true);
 
  const token = () =>{ if (localStorage.getItem('Token'))
  return  true} 

  console.log("estado del token:", token())
  
  const handleOnCollapsed = (collapsed) => {
    console.log(collapsed);
    setCollapsed(collapsed);
       
  };

   const HandleOnClick =() => {
    setIsModalVisible(true)
    console.log('visible:', isModalVisible)
  }

  const HandleConfig = () => {
    setIsConfigHidden(false)
    console.log("llegue hasta aca!")
  }

  const handleLogOutClick = () => {
    localStorage.removeItem('Token')
    message.success('Cerrando sesión. Gracias por su visita',5)
    setTimeout(GoToMain, 2000);
    }

  const onLogin=()=>{
    window.location.href = '/admin'
  }

   return (
    <Layout style={{ minHeight: '100vh' }}>
      
      <Layout>

        <Sider className="sider" collapsible collapsed={collapsed} onCollapse={handleOnCollapsed}>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">

          <Menu.Item className="item" key="1" icon={<HomeOutlined />}>
              <NavLink to="/"  style= {{fontWeight:'bolder'}}>
                Inicio
              </NavLink>
            </Menu.Item>

            <Menu.Item className="item" key="2" icon={<TeamOutlined />}>
              <NavLink to="/aboutus" style= {{fontWeight:'bolder'}}>
                Nosotros
              </NavLink>
            </Menu.Item>

            <Menu.Item className="item" key="3" icon={<PictureOutlined />}>
              <NavLink to="/galery"  style= {{fontWeight:'bolder'}}>
                Galeria
              </NavLink>
            </Menu.Item>

            <Menu.Item className="item" key="4" icon={<ShopOutlined />} >
              <NavLink to="/products"   style= {{fontWeight:'bolder'}}>
                Producto
              </NavLink>
            </Menu.Item>

            <Menu.Item className="item" key="5" icon={<IdcardOutlined />}>
              <NavLink to="/contact" onClick={() => HandleOnClick()}   style= {{fontWeight:'bolder'}}>
                Contacto
              </NavLink>
            </Menu.Item>  

            <SubMenu style={{ margin: '0px' }} key="conf_menu" icon={<SettingOutlined />} 
              title="Configuraciones"  hidden= {isConfigHidden}  style= {{fontWeight:'bolder'}}
            >
              <Menu.Item style={{ margin: '0px' }} key="6">
                <NavLink hidden={isConfigHidden} id="crudproduct" to="/ProductsCrud"  >
                  Adm.Productos
                </NavLink>
              </Menu.Item>
              <Menu.Item style={{ margin: '0px' }} key="7">
                <NavLink hidden={isConfigHidden} id="crudusers" to="/Users"  >
                  Adm.Usuarios
                </NavLink>
              </Menu.Item>
              <Menu.Item style={{ margin: '0px' }} key="8">
                <NavLink hidden={isConfigHidden} id="cerrar" to="/" onClick={handleLogOutClick}  >
                  Cerrar Sesión
                </NavLink>
              </Menu.Item>
            </SubMenu>
            </Menu>
        </Sider>

        <Layout>
          <Header>
            <div>
              <img className="img" src={imgHeader} alt=""/>
            </div>
          </Header>
          <Content>

            <Routes> 
                <Route exact path="/" element= {<IndexPage/>} />
                <Route exact path="/aboutus" element= {<AboutUs/>} />
                <Route exact path="/galery" element= {<MyCarousel/>} />
                <Route exact path="/products" element= {<Products/>} />
                <Route exact path="/contact" element= {<ContactModal/>} />
                <Route exact path="/admin" element= {<MyLogin HandleConfig= {HandleConfig}/>} />
                <Route exact path="/MenuAdmin" element= {<MenuAdmin/>}  />
                <Route exact path="/ProductsCrud" element= {<ProductsCrud/>} />
                <Route exact path="/Users" element= {<Users/>} />
                <Route exact path="*" element= {<Error404/>} />
            </Routes>
          </Content>

          <Footer>
            <div className="container-all">
              <div className="container-body">
               
              <div class="column1">
                <img src={logoPlanta}/>
                <div className="site-button-ghost-wrapper">
                  <Button type="primary" ghost onClick={onLogin} >
                    Acceso
                  </Button>
                </div>
              </div>
                <div className="column2">
                <h4>Redes Sociales</h4>
                    <div className="row">
                      <img src={iconFacebook}/>
                      <label>Seguinos en Facebook</label>
                    </div>

                    <div class="row">
                      <img src={iconInstagram}/>
                      <label>Seguinos en Instagram</label>
                    </div>
                </div>

                <div className="column3">
                  <h4>Informacion Contactos</h4>
                    <div class="row2">
                        <img src={iconMail}/>
                        <label>skamelka@gmail.com</label>
                    </div>

                    <div class="row2">
                        <img src={iconMap}/>
                        <label>Tucuman Argentina</label>
                    </div>
                </div>
              </div>

              <div class="container-footer">
                <div class="footer">
                  <div class="copyright">
                    Developed By GAS © 2021 Todos los Derechos Reservados | <a href="/">Inicio</a>
                  </div>

                  <div class="information">
                    <a href="/aboutus">Informacion de la Empresa</a> | 
                    <a href="">Politicas y Privacidad</a> |
                    <a href="">Terminos y Condiciones</a>   
                  </div>
                </div>
              </div>

            </div>
          </Footer>
        </Layout>
      </Layout>

    </Layout>
  );
}

  export default MyLayout