import React  from 'react'
import { Menu, Dropdown, Button, Space } from 'antd'
import gardenImages from '../Carousel/GardenImages'
import armadoImages from '../Carousel/ArmadoImages'

const MyDropDown = ( {galeryImages, setGaleryImages} ) => {
  const onMenuClick = e => {
    //console.log('menu click', e.target.target)
    // en target.target viene el valor de la propiedad target del menu
    if (e.target.target === "1" ) {
      setGaleryImages(gardenImages)
    } else {
      setGaleryImages(armadoImages)
    }
  }

 const menu = (
  <Menu>
    <Menu.Item>
      <a target="1" rel="noopener noreferrer" onClick={onMenuClick}>
        Jardines
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="2"  rel="noopener noreferrer"  onClick={onMenuClick}>
        Pasos de Armado
      </a>
    </Menu.Item>
   </Menu>
  );

  return (
    <Space direction="vertical">
    <Space wrap>
      <Dropdown overlay={menu} placement="bottomLeft">
        <Button>Seleccion de Colecciones</Button>
      </Dropdown>
    </Space>
  </Space>
  )
}

export default MyDropDown