import { useEffect, useState } from 'react'
import { Data } from './home'
import { UUID } from 'crypto';
import '../App.css';

import food from "../icons/Food.png"
import transport from "../icons/Transport.png"
import housing from "../icons/Housing.png"
import personal from "../icons/Personal.png"
import amount from "../icons/Amount.png"

interface cardProps {
    id: UUID;
}

const Card = (props: cardProps): JSX.Element => {

    const [data, setData] = useState<Data>()

    const fetchData = (): void => {
        fetch(`https://utbmu5o3smxuba2iverkgqqj440temhn.lambda-url.ap-southeast-1.on.aws/expenses/${props.id}`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            setData(data)
        })
    }

    useEffect(()=>{
        fetchData()
    },[props.id])
    
    return(
        <div className='card'>
            <a href={`/details/${props.id}`}>
                <div className='card-icon-container'>
                    {
                    (data?.category.name === "Food")? 
                        <img src={food} alt="food-icon" className='card-icon'></img> :
                    (data?.category.name === "Housing")? 
                        <img src={housing} alt="housing-icon" className='card-icon'></img> :
                    (data?.category.name === "Transportation")? 
                        <img src={transport} alt="transportation-icon" className='card-icon'></img> :
                    (data?.category.name === "Personal Spending")? 
                        <img src={personal} alt="personal-icon" className='card-icon'></img> : null
                    }
                </div>

                <div className='card-name-container'>
                    <p className='category-name' >{data?.category.name}</p>
                    <p className='name' >{data?.name}</p>
                </div>

                <div className='amount'>
                    <img src={amount} alt="food-icon" className='amount-icon'></img>
                    <p>{data?.amount.toLocaleString("id-ID", {minimumFractionDigits:2})}</p>
                </div>
            </a>
        </div>  
    )

}

export default Card
