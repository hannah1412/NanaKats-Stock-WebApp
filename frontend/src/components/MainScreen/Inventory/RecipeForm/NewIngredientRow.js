import React, { useEffect, useState } from 'react'
import globalStyles from '../../../../global.module.css'
import styles from './recipePage.module.css'
import axios from 'axios'

const NewIngredientRow = ({recipeID}) => {

    const [ ingreType, setIngreType ] = useState(([])) //ingredient type
    const [ chosenType, setChosenType ] = useState('')

    const [ ingredients, setIngredients ] = useState([]);   //ingredient list
    const [ chosenIngre, setChosenIngre ] = useState(['', '']);   //an array of [material_sku, name] 

    const [material_sku, name] = chosenIngre;       //part of API
    
    // inputs
    const [ quantity, setQuantity ] = useState('');
    const [ percentage, setPercentage ] = useState('');          // % per recipe 

    // cost - DERIVED 
    const [ cost, setCost ] = useState([]);
    const [ calculatedCost, setCalCost ] = useState(0);

    const [ isSuccess, setIsSuccess ] = useState(false)

    // API
    const baseURL = 'http://localhost:3001/recipes'
    const urlIngre = 'http://localhost:3001/materials/distType'
         // 1. Fetch all existing types 
    const fetchType =  ( () => {
        axios.get(urlIngre)
                .then(res => setIngreType(res.data))
                .catch(err => console.log(err));
    })

        // 2.Send request with chosen Type=> return Ingredient lists
    const postType = async () => {
        try{
            const response =  await axios.post(baseURL + '/type', 
                                            {chosenType});
            setIngredients(response.data)
        }catch(err){
            console.error(err)
        }
    }

        // fetching cost + unit : given params
    const calculateCostPerItem = (async () => {
        try{
            // if(quantity !== 0){
                const response = await axios.post(baseURL + '/cost', {quantity, material_sku});
                setCost(response.data)
                cost.map(r => {
                    setCalCost(r.cost)
                })
            // }
        }catch(err){
            console.log(err)
        }
    })
    
    const handleAddIngredient = () => {
        try{
            
            const res = axios.post(baseURL, {recipeID, material_sku, name, quantity, calculatedCost, percentage});
            if (res.data.length > 0) setIsSuccess(true);
        }catch(err){
            console.log(err)
        }
    }

    const handleSplitSKUandName = (e) => {
        const array = JSON.parse(e.target.value)
        setChosenIngre(array)
    }

    useEffect(() => {
        fetchType();
        if(chosenType.length !== 0) postType();
        if(chosenIngre.length !== 0) calculateCostPerItem();
    })
  return (
    // <tbody>

        <tr>
            <td className={styles['td']}>
            
                <select className={styles['dropdown']} onChange={(e) => {setChosenType(e.target.value) && postType()}}>
                    <option>TYPE---</option>
                    {ingreType.map((type) => {
                        return <option value={type.material_type}> {type.material_type} </option>
                    })}
                </select>
            </td>

            {/* column 2 */}
            <td className={styles['td']}>
                <select className={styles['dropdown']} onChange={handleSplitSKUandName}>
                    <option>--- </option>
                    {ingredients.map((item) => {
                        return <option value={JSON.stringify([item.material_sku, item.name])}> {item.name} </option>
                    })}
                </select>
            </td>
            
            {/* column 3 */}
            <td  className={styles['td']}>
                <input className={globalStyles['numberInput']}
                        onChange={(e) => {setQuantity(e.target.value)}}/>
            </td>
            {/* column 4 */}
            <td className={styles['td']}>
                {cost.map((value) => {
                    return <p> {value.measurememnt_unit}</p>
                })}
            </td>

            {/* column 5 */}
            <td className={styles['td']}>
                {cost.map((c) => {
                    return <p>{c.cost}</p>;
                })}
            </td>

            {/* column 6 */}
            <td className={styles['td']}>
                <input className={globalStyles['numberInput']}
                        onChange={(e) => {setPercentage(e.target.value)}}/>
            </td>

            {!isSuccess && 
                <td className={styles['td']}>
                    {chosenType.length !== 0 && chosenIngre.length !== 0 && quantity.length > 0 && percentage.length > 0 &&
                        <button onClick={handleAddIngredient}> add</button>
                    }
                </td>
            }
        </tr>
    // </tbody>
  )
}

export default NewIngredientRow