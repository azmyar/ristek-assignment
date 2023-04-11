import { useEffect, useState } from 'react'
import '../App.css';
import { useNavigate} from "react-router-dom";

interface Data {
    id: string;
    name: string; 
    amount: number; 
    created_at: string; 
    category: {name: string}
}

const Card = ({id}:any): JSX.Element => {

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

    const navigate = useNavigate();

    const openDetails = (id: string) => {
        navigate('/details',{state:{id:id}});
    }

    return(
            <div className='card' onClick={() => openDetails(id)}>
                <p>{data?.category.name}</p>
                <p>{data?.name}</p>
                <p>${data?.amount}</p>
            </div>
    )

}

export default Card
