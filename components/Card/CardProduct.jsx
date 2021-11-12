import './CardProduct.css'
import React from 'react';
import 'antd/dist/antd.css';
import { Card } from 'antd';

const CardProduct = (props) => {
  const profile = props.profile
  console.log('profile.photo_url',profile.photo_url)
  const { Meta } = Card;

  return (

    <Card className="cardStyle"
      hoverable
      style={{ width: 180 }}
      cover={<img src={profile.photo_url} alt=""/>}
    >
      <Meta classeName="title" title= {profile.product} />
      <Meta title= {profile.brand} />
      <Meta title= {profile.category} />
      
    </Card>

  );
}

export default CardProduct