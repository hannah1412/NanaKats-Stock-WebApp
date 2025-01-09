import React, { useEffect, useState } from 'react'
import globalStyles from '../../../../global.module.css'
import styles from './recipePage.module.css'
import NewIngredientRow from './NewIngredientRow'
import axios from 'axios'

const NewRecipeForm = () => {

    // inputs
    const [ recipeName, setRecipeName ] = useState('');

    const [ products, setProducts ] = useState([]); 
    const [ chosenP, setChosenP ] = useState('');       //product_sku

    const [ countR, setRows ] = useState(0);

    const [ errMsg, setErrMsg ] = useState(false);

    const url = 'http://localhost:3001/nkProducts';
    const pUrl = 'http://localhost:3001/recipes/add';

    const incRow = () => {
        setRows(countR + 1);
    }
    
    const handleAddIngre = () => {
        let count = 0;
        let rows = [];
        while( count < countR){
            count++;
            rows.push(<tbody> <NewIngredientRow recipeID={recipeName}/> </tbody>)
        }
        return rows;
    }

    const submitRecipe =  ()=> {
        try{
            const res = axios.post(pUrl, {recipeName, chosenP});
        }catch(err){
            setErrMsg(err.message)
        }
    }
    
    useEffect(() => {
        // fetch products NAME list 
        axios.get(url).then(res => setProducts(res.data))
                    .catch(err => console.log(err))
    })

  return (
    <main id={globalStyles['text']} className={styles['div']}>

        <div>
            Recipe ID: <input className={globalStyles['input']} 
                                onChange={(e) => {setRecipeName(e.target.value)}}/>
            <p style={{fontSize: "15px", fontStyle: "italic"}}>*recipe ID format: 'RECIPE_0000'</p>
            {/* {recipeName} */}
            for product: <select className={styles['dropdown']} onChange={(e) => {setChosenP(e.target.value)}}>
                            <option> --- </option>
                            {products.map((p) => {
                                return (<option value={p.product_sku}> {p.product_name} </option>)
                            })}
                        </select>

                        {recipeName.length !== 0 && chosenP.length !== 0 &&
                            <button style={{backgroundColor: 'inherit', opacity:'70%', fontSize:'20px'}} onClick={submitRecipe}> 
                                Submit Name
                            </button>
                        }

            <div>
                <button className={styles['addIngreButton']} onClick={incRow}>
                    + Ingredient
                </button>
            </div>
        </div>

        <div>
            {/* {chosenP} */}
            <table>
                <tr>
                    <th className={globalStyles['th']}>Ingredient Type</th>
                    <th className={globalStyles['th']}>Ingredient</th>
                    <th className={globalStyles['th']}>Quantity</th>
                    <th className={globalStyles['th']}>Unit</th>
                    <th className={globalStyles['th']}>Cost</th>
                    <th className={globalStyles['th']}>% in recipe</th>
                    <th className={globalStyles['th']}>Action</th>
                </tr>
            </table>
            <tbody>
                {handleAddIngre()}  
            </tbody>
        </div>
        
        {/* ERROR MESSAGE */}
        {errMsg && <p> Duplicated RECIPE_ID, please reenter!</p>}
    </main>
  )
}

export default NewRecipeForm