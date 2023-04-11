import {useEffect, useState } from 'react'
import {useLocation, useNavigate} from 'react-router-dom';
import '../App.css';

interface Data {
    id: string;
    name: string; 
    amount: number; 
    created_at: string; 
    category: {name: string}
    description: string
}

const Details = ({id}:any): JSX.Element => {
    const location = useLocation();
    const navigate = useNavigate();

    const [data, setData] = useState<Data>()

    const fetchData = (): void => {
        fetch(`https://utbmu5o3smxuba2iverkgqqj440temhn.lambda-url.ap-southeast-1.on.aws/expenses/${location.state.id}`)
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

    const back = () => {
        navigate('/',{});
    }

    return(
        <div>
            <p>{data?.category.name}</p>
            <p>{data?.name}</p>
            <p>${data?.amount}</p>
            <p>{data?.description}</p>
            <button onClick={() => back()}>back</button>
        </div>
    )
}

export default Details
