import React, { useEffect, useState } from 'react'
import NavBar from '../../NavBar'
import globalStyles from '../../../../global.module.css'
import styles from './recipePage.module.css'
import NewRecipeForm from './NewRecipeForm'
import axios from 'axios'

const RecipePage = () => {
    const [ isNewRecipe, setNewRecipe ] = useState(false);

    const [ data, setData ] = useState([])

    // {recipe_id, material_sku, name, quantity, cost, percent_per_recipe,
    //  r.product_sku, r.date, p.product_name}
    const [ chosenP, setChosenP ] = useState('')

    const [ totalCost, setTotalCost] = useState([]);

    const baseUrl = 'http://localhost:3001/recipes';
    // API 
    const displayRecipes = () => {
      try{
        axios.get(baseUrl).then(res => setData(res.data))
      }catch(err){
        
      }
    }

    const calTotalCost = async() => {
      try{
        const response = await axios.post(baseUrl + '/totalCost', {chosenP});
        setTotalCost(response.data)
      }catch(err){

      }
    }
    
    useEffect(() => {
      displayRecipes();
      if(chosenP.length  !== 0) calTotalCost();
    })

  return (
    <main id={globalStyles['text']} >
        <NavBar/>
        <div style={{position:'absolute', left:'40vh'}}>
          <select className={styles['dropdown']} onChange={(e) => {setChosenP(e.target.value)}}>
            <option> --- </option>
            {data.map((r) => {
              return <option value={r.recipe_id}>{r.product_name}</option>
            })}
          </select>
        </div>

        {/* DISPLAY SCREEN  */}
        {chosenP.length > 0 &&
          <div className={styles['display']}>
              RECIPE ID: {data.map((res) => {
                return <p>{res.recipe_id}</p>
              })}
              
              {/* Date Created: {data.map((res) => {
                return <p> {res.date} </p>
              })} */}
              
              <table>
                <thead>
                  <th className={styles['td']}> Name </th>
                  <th className={styles['td']}> Quantity </th>
                  <th className={styles['td']}> Cost </th>
                  <th className={styles['td']}> % per recipe </th>
                </thead>
                <tbody>
                    {data.map((rows) => {
                      return <tr>
                        <td className={styles['td']}> {rows.name}</td>
                        <td className={styles['td']}> {rows.quantity} </td>
                        <td className={styles['td']}> {rows.cost} </td>
                        <td className={styles['td']}> {rows.percent_per_recipe}</td>
                      </tr>
                    })}
                </tbody>
              </table>

              {totalCost.map((r) => {
                return <div>
                  <p> Total Cost: {r.total_cost}</p>
                  <p> Total quantity: {r.total_quan}</p>
                </div>
              })}
          </div>
        }


        <button className={styles['button']} onClick={() => {setNewRecipe(true)}}>
            + 
        </button>

        {/* FORM */}
        <div >
            {isNewRecipe && <NewRecipeForm/>}
        </div>

        {isNewRecipe && 
          <button className={styles['submitButton']} onClick={() => {setNewRecipe(false)}}>
            SUBMIT
          </button>
        }
    </main>
  )
}

export default RecipePage