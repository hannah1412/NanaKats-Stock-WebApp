import React, { useEffect, useState } from 'react'
import NavBar from '../NavBar'
import styles from './materialsPage.module.css'
import globalStyles from '../../../global.module.css'
import axios from 'axios'

const MaterialPage = () => {
  // fetching data 
  const [ data, setData ] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/materials').then((response) => {
      setData(response.data)
    }).catch((err) => {
      console.log(err);
    })
  })

  const onChangeInput = (() =>{
    
  })
  return (
    <main>
      <NavBar />
      <div id={globalStyles['text']} className={styles['table']}>
          <table >
            <thead>
              <tr> 
                <th className={styles['th']}>Name</th>
                <th className={styles['th']}>Vendor</th>
                <th className={styles['th']}>INCI</th>
                <th className={styles['th']}>Type</th>
                <th className={styles['th']}>Category</th>
                <th className={styles['th']}>StdQuantity</th>
                <th className={styles['th']}>Unit</th>
              </tr>
            </thead>
            <tbody >
              {data.map((material) => {
                return <tr key={material.material_sku} >
                  <td> <input className={styles['input']} name='Name' value={material.name} type='text' onChange={onChangeInput} placeholder='Type Name'/> </td>
                  <td> <input className={styles['input']} name='Vendor_ID' value={material.vendor_id} /> </td>
                  <td> <input className={styles['input']} name='INCI' value={material.INCI}/> </td>
                  <td> <input className={styles['input']} name='Type' value={material.material_type}/> </td>
                  <td> <input className={styles['input']} name='Category' value={material.material_category}/> </td>
                  <td> <input className={styles['input']} name='Quantity' value={material.standard_quantity}/> </td>
                  <td> <input className={styles['input']} name='Unit' value={material.measurememnt_unit}/> </td>
                </tr>
              }) }
            </tbody>
          </table>
      </div>
    </main>
  )
}

export default MaterialPage