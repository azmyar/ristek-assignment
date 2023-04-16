import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { UUID } from 'crypto';

import amount_icon from "../icons/Amount.png"
import food_icon from "../icons/Food.png"
import transport_icon from "../icons/Transport.png"
import housing_icon from "../icons/Housing.png"
import personal_icon from "../icons/Personal.png"
import filter_icon from "../icons/Filter.png"
import range_icon from "../icons/Range.png"

import Card from './card'
import '../App.css'

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
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean
}

function Home() {

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
            navigate(`/page/1&min_price/0&max_price/0&food/false&transport/false&personal/false&housing/false`) // Default URL
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

    const handleChangeMin = ({currentTarget: input}: any) => {
        setFilterMin(input.value)
        setPage(1)
    }
    
    const handleChangeMax = ({currentTarget: input}: any) => {
        setFilterMax(input.value)
        setPage(1)
    }

    useEffect(() => {
        fetchFilter()
        fetchTotal()
    },[])

    useEffect(() => {
        if (page !== 0 && filterMin.toString() !== "" && filterMax.toString() !== ""){
            navigate(`/page/${page}&min_price/${filterMin}&max_price/${filterMax}&food/${food}&transport/${transportation}&personal/${personal}&housing/${housing}`)
            fetchData()}
    },[page, filterMin, filterMax, food, transportation, personal, housing])


    let pagination = []


    if ((data?.paging!== undefined) && (data?.paging.pageCount <= 6)){

        for (let index = 1; index <= data?.paging.pageCount; index++) {
            pagination.push (
                <button style={(page === index) ? {borderColor:"#4200FF", color:"#4200FF"}: {}} onClick={() => setPage(index)}>{index}</button>
            )            
        }

    } else if ((data?.paging !== undefined) && (data?.paging.pageCount > 5)) {

        if (page <= 4){
            for (let index = 1; index <= 5; index++) {
                pagination.push (
                    <button style={(page === index) ? {borderColor:"#4200FF", color:"#4200FF"}: {}} onClick={() => setPage(index)}>{index}</button>
                )            
            }

            pagination.push (
                <div>
                    <button>...</button>
                    <button onClick={() => setPage(data?.paging.pageCount)}>{data?.paging.pageCount}</button>
                </div>
            ) 

        } else if ( page >= data?.paging.pageCount - 3) {

            pagination.push (
                <div>
                    <button onClick={() => setPage(1)}>1</button>
                    <button>...</button>
                    <button style={(page === data?.paging.pageCount-4) ? {borderColor:"#4200FF", color:"#4200FF"}: {}} onClick={() => setPage(data?.paging.pageCount-4)}>{data?.paging.pageCount-4}</button>
                    <button style={(page === data?.paging.pageCount-3) ? {borderColor:"#4200FF", color:"#4200FF"}: {}} onClick={() => setPage(data?.paging.pageCount-3)}>{data?.paging.pageCount-3}</button>
                    <button style={(page === data?.paging.pageCount-2) ? {borderColor:"#4200FF", color:"#4200FF"}: {}} onClick={() => setPage(data?.paging.pageCount-2)}>{data?.paging.pageCount-2}</button>
                    <button style={(page === data?.paging.pageCount-1) ? {borderColor:"#4200FF", color:"#4200FF"}: {}} onClick={() => setPage(data?.paging.pageCount-1)}>{data?.paging.pageCount-1}</button>
                    <button style={(page === data?.paging.pageCount) ? {borderColor:"#4200FF", color:"#4200FF"}: {}} onClick={() => setPage(data?.paging.pageCount)}>{data?.paging.pageCount}</button>
                </div>
            ) 

        } else {

            pagination.push (
                <div>
                    <button onClick={() => setPage(1)}>1</button>
                    <button>...</button>
                    <button onClick={() => setPage(page-1)}>{page-1}</button>
                    <button style ={{borderColor: "#4200FF", color:"#4200FF"}} onClick={() => setPage(page)}>{page}</button>
                    <button onClick={() => setPage(page+1)}>{page+1}</button>
                    <button>...</button>
                    <button onClick={() => setPage(data?.paging.pageCount)}>{data?.paging.pageCount}</button>
                </div>
            ) 
        }
    }

    return (
        <div className='container'>

            <div className='card-container'>

                <div className='card-anchor'>
                {(data?.statusCode === 400)? <div className='error-message'>{data?.message}</div> : 
                 (data?.data === undefined)? <div className='error-message'>Loading...</div> :
                 (data?.paging.itemCount === 0)? <div className='error-message'>No Items Found</div> :
                  data?.data.map((a) => (

                    <div>
                        <Card id = {a.id}/>
                    </div>

                ))}
                </div>

                <div className='pagination-container'>
                    <button onClick={() => setPage((prev) => prev - 1)} 
                            disabled = { (data?.statusCode === 400) || 
                                         (data?.data !== undefined && 
                                         !data?.paging.hasPreviousPage)}>{"\<"}
                    </button>
                    
                    <div className='pagination-divs'>
                        {pagination} 
                    </div>

                    <button onClick={() => setPage((prev) => prev + 1)} 
                            disabled={ (data?.statusCode === 400) || 
                                    (data?.data !== undefined && 
                                    !data?.paging.hasNextPage)}>{"\>"}
                    </button>
                </div>
                
            </div>

            <div className='filter-container'>

                <div className='total'>
                    <p className='expenses-title'>Current Expenses</p>
                    <div className='expenses-container'>  
                        <img src={amount_icon} alt="food-icon" className='amount-icon'></img>                  
                        <p className='expenses'>{total.toLocaleString("id-ID", {minimumFractionDigits:2})}</p>
                    </div>
                </div>

                <div className='filter'>
                    <div className="filter-title-container">
                        <img src={filter_icon} alt="filter-icon" className='filter-icon'></img>
                        <p className='filter-title'>Filters</p>
                    </div>

                    <p className='filter-subtitle'>Filter by Transaction Category</p>

                    <div className="category">
                    <input type="checkbox" className = "input" checked={housing} onChange={()=>{housingToggle(!housing); setPage(1)}} ></input>
                    <img src={housing_icon} alt="food-icon" className='category-filter-icon'></img>
                    <p>Housing</p>
                    </div>

                    <div className="category">
                    <input type="checkbox"className = "input"  checked={food} onChange={()=> {foodToggle(!food); setPage(1)}} ></input>
                    <img src={food_icon} alt="food-icon" className='category-filter-icon'></img>
                    <p>Food</p>
                    </div>

                    <div className="category">
                    <input type="checkbox" className = "input" checked={transportation} onChange={()=> {transportationToggle(!transportation); setPage(1)}} ></input>
                    <img src={transport_icon} alt="food-icon" className='category-filter-icon'></img>
                    <p>Transportation</p>
                    </div>

                    <div className="category">
                    <input type="checkbox" className = "input" checked={personal} onChange={()=> {personalToggle(!personal); setPage(1)}} ></input>
                    <img src={personal_icon} alt="food-icon" className='category-filter-icon'></img>
                    <p>Personal Spending</p>
                    </div>

                    <hr className='long-line'/>

                    <p className='filter-subtitle'>Filter by Expense Range</p>

                    <form>
                        <div className='range-filter-container'>

                            <div className='range-filter-min'>
                                <p className='minmax'>Min</p>
                                <div className="range-filter">
                                    <img src={range_icon} alt="filter-icon" className='range-icon'></img>
                                    <input className='range-input' onChange = {handleChangeMin} value={filterMin}></input>
                                </div>
                            </div>

                            <div className="line-container">
                                <hr className='short-line'/>
                            </div>

                            <div className='range-filter-max'>
                                <p className='minmax'>Max</p>
                                <div className="range-filter">
                                    <img src={range_icon} alt="filter-icon" className='range-icon'></img>
                                    <input className='range-input' onChange = {handleChangeMax} value={filterMax}></input>
                                </div>
                            </div>

                        </div>
                    </form>
                </div>
                
            </div>

        </div>
    );
}

export default Home;
