import React, { useEffect, useState } from 'react'
import NavBar from '../../NavBar'
import '../../../../App.css'
import styles from '../materialsPage.module.css'
import axios from 'axios'

const NKProductsPage = () => {
    const [ products, setProducts ] = useState([])

    
    // fetching data
    useEffect(() => {
      axios.get('http://localhost:3001/nkProducts').then((response) => {
          setProducts(response.data)
      }).catch((err) => {
          console.log(err)
      })
    })
    
  return (
    <main>
        <NavBar/>
        <div className={styles['dataTbl']}>
          <table >
              <thead>
                  <tr>
                    <th> Product name</th>
                    <th> Vendor info</th>
                    <th> INCI </th>
                    <th> RRP</th>
                    <th> Product type </th>
                    <th> Product category</th>
                    <th> Standard qunatity</th>
                  </tr>
              </thead>
              <tbody >
                {products.map((product) => {
                  return <tr key={product.product_sku} >
                    <td> <input className={styles['']} name='Product_SKU' value={product.product_sku} type='text' placeholder='Type Name'/> </td>
                    <td> <input className={styles['']} name='Name' value={product.product_name} /> </td>
                    <td> <input className={styles['']} name='Collection' value={product.collection}/> </td>
                    <td> <input className={styles['']} name='RRP' value={product.rrp}/> </td>
                    <td> <input className={styles['']} name='Type' value={product.product_type}/> </td>
                    <td> <input className={styles['']} name='Weight' value={product.product_weight}/> </td>
                    <td> <input className={styles['']} name='Unit' value={product.measuring_unit}/> </td>
                    <td> <input className={styles['']} name='Availability' value={product.product_availability}/> </td>
                  </tr>
                }) }
              </tbody>
            </table>
          </div>
    </main>
  )
}

export default NKProductsPage