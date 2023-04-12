import {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css';
import { UUID, pseudoRandomBytes } from 'crypto';
import Card from './card'

interface Fetched {
    data: Data[];
    paging: Paging;
    statusCode: number;
    message: string
}

interface Data {
    id: UUID; 
    amount: number; 
    created_at: string; 
    category: {name: string}
}

interface Paging {
    itemCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean
}

function Home() {

    const params = useParams()
    const navigate = useNavigate()

    const [data, setData] = useState<Fetched>()
    const [total, setTotal] = useState<number>()
    const [page, setPage] = useState<number>(0)
    const [filterMin, setFilterMin] = useState<number>(0)
    const [filterMax, setFilterMax] = useState<number>(0)

    const [housing, housingToggle] = useState (false)
    const [food, foodToggle] = useState (false)
    const [transportation, transportationToggle] = useState (false)
    const [personal, personalToggle] = useState (false)


    const fetchData = () => {

        var endpoint = `https://utbmu5o3smxuba2iverkgqqj440temhn.lambda-url.ap-southeast-1.on.aws/expenses/` + 
                       `?limit=4&page=${page}&min_price=${filterMin}&max_price=${filterMax}`

        if (food || transportation || personal || housing){
            endpoint += '&category_id='

            if (food)
                endpoint += 'f12399a7-302c-452a-89d8-5ec21c4514e8,'
            if (transportation)
                endpoint += 'd8e6963a-b544-4c31-bc90-6bb3e15203e2,'
            if (personal)
                endpoint += '6bcd7235-717e-43b9-bed1-13e0b04e4c0b,'
            if (housing)
                endpoint += 'afc106af-2790-4df0-8ed2-473d6ef4b595,'

            endpoint = endpoint.slice(0, endpoint.length - 1)
        }
        
        console.log(endpoint)

        fetch(endpoint)
        .then(response => {
            return response.json()
        })
        .then(data => {
            setData(data)
        })
    }

    const fetchFilter = () => {
        if (params.page !== undefined &&
            params.min_price !== undefined &&
            params.max_price !== undefined){
                setPage(+params.page)
                setFilterMin(+params.min_price)
                setFilterMax(+params.max_price)
                foodToggle(params.food === "true")
                transportationToggle(params.transport === "true")
                personalToggle(params.personal === "true")
                housingToggle(params.housing === "true")
        } else {
            navigate(`/1/0/0/false/false/false/false`) // Default URL
            setPage(1)
            setFilterMin(0)
            setFilterMax(0)
            foodToggle(false)
            transportationToggle(false)
            personalToggle(false)
            housingToggle(false)
        }
    }

    const fetchTotal = () => {
        var endpoint = `https://utbmu5o3smxuba2iverkgqqj440temhn.lambda-url.ap-southeast-1.on.aws/expenses/total`

        fetch(endpoint)
        .then(response => {
            return response.json()
        })
        .then(data => {
            setTotal(data.total)
        })
    }

    const handleChangeMin = ({currentTarget: input}: any) => {
        setFilterMin(input.value)
    }
    
    const handleChangeMax = ({currentTarget: input}: any) => {
        setFilterMax(input.value)
    }

    useEffect(() => {
        fetchFilter()
        fetchTotal()
    },[])

    useEffect(() => {
        if (page !== 0 && filterMin.toString() !== "" && filterMax.toString() !== ""){
            navigate(`/${page}/${filterMin}/${filterMax}/${food}/${transportation}/${personal}/${housing}`)
            fetchData()}
    },[page, filterMin, filterMax, food, transportation, personal, housing])

    return (
        <div className='container'>
            <div className='card-container'>
                
                {(data?.statusCode === 400)? <p>{data?.message}</p> : 
                 (data?.data === undefined)? <p>Loading...</p> :
                 (data?.paging.itemCount === 0)? <p> No Items Found</p> :
                 data?.data.map((a) => (

                    <div>
                        <Card id = {a.id}/>
                    </div>

                ))}
            
                <button onClick={() => setPage((prev) => prev - 1)} 
                        disabled = { (data?.statusCode === 400) || 
                                     (data?.data !== undefined && 
                                     !data?.paging.hasPreviousPage)}>Prev Page
                </button>

                <button onClick={() => setPage((prev) => prev + 1)} 
                        disabled={ (data?.statusCode === 400) || 
                                   (data?.data !== undefined && 
                                   !data?.paging.hasNextPage)}>Next Page
                </button>
                
            </div>

            <div className='filter-container'>
            <h3>{total}</h3>

                <input type="checkbox" checked={housing} onChange={()=>{housingToggle(!housing); setPage(1)}} ></input>
                <p>Housing</p>
                <input type="checkbox" checked={food} onChange={()=> {foodToggle(!food); setPage(1)}} ></input>
                <p>Food</p>
                <input type="checkbox" checked={transportation} onChange={()=> {transportationToggle(!transportation); setPage(1)}} ></input>
                <p>Transportation</p>
                <input type="checkbox" checked={personal} onChange={()=> {personalToggle(!personal); setPage(1)}} ></input>
                <p>Personal Spending</p>
                <form>
                    <input onChange = {handleChangeMin} value={filterMin}></input>
                    <input onChange = {handleChangeMax} value={filterMax}></input>
                </form>
                
            </div>

        </div>
    );
}

export default Home;
