import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CardList from '../Card/CardList'
import './Products.css'
import { Select , message} from 'antd'

const { Option } = Select

const Products = () => {
  const [products, setProducts] = useState([])


  const [value, setValue] =  useState("")
  const onChange =e=>{
    console.log('value', value)
    console.log('e',e)
      setValue(e)
      if (e === "Todas"){
        getAllProducts()
      } else {
        getProducts(e)
        console.log('value', value)
      }
  }

  
  const getProducts = async (e) => {
    try{

      console.log('value del get', e)
      const resp = await axios.get('http://localhost:8080/api/products',{ params: { category: e } })
      console.log('resp.data',resp.data)
      setProducts(resp.data)
      console.log('products',products)
    }catch (error){
      message.error("No hay Productos para mostrar - Error:"  + error)
      throw error
    }
  }

  const getAllProducts = async () => {
    const resp = await axios.get('http://localhost:8080/api/products')
    console.log('resp.data',resp.data)
    setProducts(resp.data)
    console.log('products',products)
    
  }

  useEffect(() =>{
    getProducts()
  },[]
  )
  
  return (
    <div>
      <div className="header">
        <div>
          <h1>PRODUCTOS - Seleccione Categoria</h1>
        </div>
        <div className="divSelect">
          <Select value={value}
                  placeholder="Seleccione categoria"
                  onChange={onChange}
                  name="select"
                  className="selectProduct"
          >
                  <Option value={"Jardin vertical"}>Jardin vertical</Option>
                  <Option value={"repuestos"}>repuestos</Option>
                  <Option value={"armado"}>armado</Option>
                  <Option value={"vegetal"}>vegetal</Option>
                  <Option value={"accesorios riego"}>accesorios riego</Option>
                  <Option value={"tierras"}>tierras</Option>
                  <Option value={"Todas"}>Todas</Option>
          </Select>
        </div>
      </div>
        <CardList data={products}/>
    </div>
  )}
 
  export default Products




