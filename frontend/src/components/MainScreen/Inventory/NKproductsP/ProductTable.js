import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ProductTable = () => {
    const [ products, setProducts ] = useState([])
    
    useEffect(() => {
        axios.get('http://localhost:3001/nkProducts').then((response) => {
            setProducts(response.data)
        }).catch((err) => {
            console.log(err)
        })
    })

  return (
    {products}
  )
}

export default ProductTable