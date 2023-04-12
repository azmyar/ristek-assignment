import { useEffect, useState } from 'react'
import '../App.css';
import { useNavigate} from "react-router-dom";
import food from "../icons/Food.png"
import transport from "../icons/Transport.png"
import housing from "../icons/Housing.png"
import personal from "../icons/Personal.png"

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
            <div>
                {
                (data?.category.name === "Food")? <img src={food} alt="food-icon"></img> :
                (data?.category.name === "Housing")? <img src={housing} alt="housing-icon"></img> :
                (data?.category.name === "Transportation")? <img src={transport} alt="transportation-icon"></img> :
                (data?.category.name === "Personal Spending")? <img src={personal} alt="personal-icon"></img> : ""
                }
            </div>

            <div>
                <p>{data?.category.name}</p>
                <p>{data?.name}</p>
            </div>

            <div className='amount'>
                <p>${data?.amount}</p>
            </div>
        </div>  
    )

}

export default Card
