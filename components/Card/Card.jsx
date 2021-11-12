import React from 'react'
import './Card.css'
import { Card } from 'antd';
import 'antd/dist/antd.css';
import './Card.css'
const { Meta } = Card;

const MyCard = ({info}) =>  {
  //  console.log("dentro e Mycard - info que recibe url ",info.info_url)
  return (
    <Card
      className="cardCss"
        hoverable
        style={{ width: "fit-content(100)"  }}
        cover={<img alt={""} src={info.info_url} style= {{ width:"auto" , height: "auto" }}/>}
        size={"default"}
        title={info.title}
    >
        <Meta title={info.subtitle} description={info.details} />
    </Card> 
  )
}

export default MyCard;