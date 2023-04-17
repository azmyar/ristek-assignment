import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { UUID } from 'crypto'; 
import '../App.css'

import Card from './card'
import Pagination from './pagination'
import Filter from './filter'

interface Fetched {
    data: Data[];
    paging: Paging;
    statusCode: number;
    message: string
}

interface Data {
    id: UUID; 
    name: string;
    amount: number; 
    created_at: string; 
    description: string;
    category: {name: string}
}

interface Paging {
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean
}

const Home = () : JSX.Element => {

    const params = useParams()
    const navigate = useNavigate()

    const [data, setData] = useState <Fetched> ()
    const [total, setTotal] = useState <number> (0)
    const [page, setPage] = useState <number> (0)

    const [filterMin, setFilterMin] = useState <number> (0)
    const [filterMax, setFilterMax] = useState <number> (0)

    const [housing, housingToggle] = useState <boolean> (false)
    const [food, foodToggle] = useState <boolean> (false)
    const [transportation, transportationToggle] = useState <boolean> (false)
    const [personal, personalToggle] = useState <boolean> (false)

    const fetchData = () => {

        let endpoint : string = `https://utbmu5o3smxuba2iverkgqqj440temhn.lambda-url.ap-southeast-1.on.aws/expenses/` + 
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
        
        fetch(endpoint)
        .then(response => {
            return response.json()
        })
        .then(data => {
            setData(data)
        })
    }

    const fetchFilter = () => {
        if (params.page &&
            params.min_price &&
            params.max_price){
                setPage(+params.page)
                setFilterMin(+params.min_price)
                setFilterMax(+params.max_price)
                foodToggle(params.food === "true")
                transportationToggle(params.transport === "true")
                personalToggle(params.personal === "true")
                housingToggle(params.housing === "true")
        }
        else {
            navigate(`/page/1&min_price/0&max_price/0&food/false&transport/false&personal/false&housing/false`)
            setPage(1)
        }
    }

    const fetchTotal = () => {
        let endpoint = `https://utbmu5o3smxuba2iverkgqqj440temhn.lambda-url.ap-southeast-1.on.aws/expenses/total`

        fetch(endpoint)
        .then(response => {
            return response.json()
        })
        .then(data => {
            setTotal(Number(data.total))
        })
    }

    const rangeFilter = ({currentTarget: input}: any) => {

        if (input.name === "Min"){
            setFilterMin(input.value)
        } 
        else if (input.name === "Max") {
            setFilterMax(input.value)
        }
        setPage(1)
    }

    const categoryFilter = (category : string) => {

        if (category === "Housing"){
            housingToggle(!housing)   
        } 
        else if (category === "Food"){
            foodToggle(!food)
        } 
        else if (category === "Transport"){
            transportationToggle(!transportation)        
        } 
        else if (category === "Personal"){
            personalToggle(!personal)        
        }
        setPage(1)
    }

    const filterProps = {
        total : total,
        filterMin : filterMin,
        filterMax : filterMax,
        housing : housing,
        food : food,
        transportation : transportation,
        personal : personal,
        rangeFilter : rangeFilter,
        functHousing : () => categoryFilter("Housing"),
        functFood : () => categoryFilter("Food"),
        functTransport : () => categoryFilter("Transport"),
        functPersonal : () => categoryFilter("Personal")  
    }

    const paginationProps = {
        page : page,
        data : data!,
        setPage : (page:number) => setPage(page)
    }

    useEffect(() => {
        fetchFilter()
        fetchTotal()
    },[])
    
    useEffect(() => {
        if (page !== 0 && filterMin.toString() !== "" && filterMax.toString() !== ""){
            navigate(
                `/page/${page}&min_price/${filterMin}&max_price/${filterMax}` + 
                `&food/${food}&transport/${transportation}&personal/${personal}&housing/${housing}`
            )
            fetchData()
        }
    },[page, filterMin, filterMax, food, transportation, personal, housing])

    return (
        <div className='container'>

            <div className='card-container'>

                <div className='card-anchor'>
                    {(data?.statusCode === 400)? 
                        <div className='error-message'>{data?.message}</div> : 
                     (data?.paging.itemCount === 0)? 
                        <div className='error-message'>No Items Found</div> :
                     (data?.data === undefined)? 
                        <div className='error-message'>Loading...</div> :
                     (data?.data.map((a) => (
                        <Card id = {a.id} data = {data}/>
                    )))}
                </div>

                {(data?.data !== undefined && data?.paging.itemCount !== 0)?  
                    <Pagination {...paginationProps}/> : null
                }
    
            </div>

            <Filter {...filterProps} />

        </div>
    );
}

export type { Fetched, Data } 
export default Home;
