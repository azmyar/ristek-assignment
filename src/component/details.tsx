import {useEffect, useState } from 'react'
import {useParams, useNavigate} from 'react-router-dom';
import '../App.css';

interface Data {
    id: string;
    name: string; 
    amount: number; 
    created_at: string; 
    category: {name: string}
    description: string
}

const Details = (): JSX.Element => {
    const params = useParams();

    const navigate = useNavigate();

    const [data, setData] = useState<Data>()

    const fetchData = (): void => {
        fetch(`https://utbmu5o3smxuba2iverkgqqj440temhn.lambda-url.ap-southeast-1.on.aws/expenses/${params.id}`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            setData(data)
        })
    }

    useEffect(()=>{
        fetchData()
    },[])

    return(
        <div className='container'>
            <div className="details">
                <p>{data?.category.name}</p>
                <p>{data?.name}</p>
                <p>${data?.amount}</p>
                <p>{data?.description}</p>
                <button onClick={() => navigate(-1)}>back</button>
            </div>
        </div>
    )
}

export default Details
