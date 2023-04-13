import { useEffect, useState } from 'react'
import '../App.css';
import { useNavigate} from "react-router-dom";
import food from "../icons/Food.png"
import transport from "../icons/Transport.png"
import housing from "../icons/Housing.png"
import personal from "../icons/Personal.png"
import amount from "../icons/Amount.png"

interface Data {
    id: string;
    name: string; 
    amount: number; 
    created_at: string; 
    category: {name: string}
}

const Card = ({id}:any): JSX.Element => {

    const navigate = useNavigate()

    const [data, setData] = useState<Data>()

    const fetchData = (): void => {
        fetch(`https://utbmu5o3smxuba2iverkgqqj440temhn.lambda-url.ap-southeast-1.on.aws/expenses/${id}`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            setData(data)
        })
    }

    useEffect(()=>{
        fetchData()
    },[id])

    const openDetails = (id: string) => {
        navigate(`/details/${id}`);
    }
    
    return(
        <div className='card' onClick={() => openDetails(id)}>
            <div className='card-icon-container'>
                {
                (data?.category.name === "Food")? <img src={food} alt="food-icon" className='card-icon'></img> :
                (data?.category.name === "Housing")? <img src={housing} alt="housing-icon" className='card-icon'></img> :
                (data?.category.name === "Transportation")? <img src={transport} alt="transportation-icon" className='card-icon'></img> :
                (data?.category.name === "Personal Spending")? <img src={personal} alt="personal-icon" className='card-icon'></img> : ""
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
        </div>  
    )

}

export default Card
