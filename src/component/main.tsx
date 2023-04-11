import { useEffect, useState } from 'react'
import Card from './card'
import '../App.css';
import { UUID } from 'crypto';

interface Data {
    id: UUID; 
    amount: number; 
    created_at: string; 
    category: {name: string}
}

interface Paging {
    hasPreviousPage: boolean;
    hasNextPage: boolean
}

interface Fetched {
    data: Data[];
    paging: Paging
}

const Main = () => {
    
    const [data, setData] = useState<Fetched>()
    const [page, setPage] = useState<number>(1)
    const [total, setTotal] = useState<number>(0)
    const [filterMin, setFilterMin] = useState<number>(100)
    const [filterMax, setFilterMax] = useState<number>(200)

    const [housing, housingToggle] = useState (false)
    const [food, foodToggle] = useState (false)
    const [transportation, transportationToggle] = useState (false)
    const [personal, personalToggle] = useState (false)


    const fetchData = (): void => {
        fetch(`https://utbmu5o3smxuba2iverkgqqj440temhn.lambda-url.ap-southeast-1.on.aws/expenses?page=${page}&min_price=${filterMin}&max_price=${filterMax}`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            setData(data)
        })
    }

    const fetchCategoryFilteredData = (housing : boolean, food: boolean, transportation: boolean, personal: boolean): void => {

        let a : string = ""

        if (housing){
            a += "afc106af-2790-4df0-8ed2-473d6ef4b595,"
        }
        if (food){
            a += "f12399a7-302c-452a-89d8-5ec21c4514e8,"
        }
        if (transportation){
            a += "d8e6963a-b544-4c31-bc90-6bb3e15203e2,"
        }
        if (personal){
            a += "6bcd7235-717e-43b9-bed1-13e0b04e4c0b,"
        }

        let b : string = a.slice(0, a.length-1)

        fetch(
            `https://utbmu5o3smxuba2iverkgqqj440temhn.lambda-url.ap-southeast-1.on.aws/expenses?page=${page}&min_price=${filterMin}&max_price=${filterMax}&category_id=${b}`
        )
        .then(response => {
            return response.json()
        })
        .then(data => {
            setData(data)
        })
    }

    // const fetchCategoryID = (category: string) : void => {
    //     fetch(
    //         "https://utbmu5o3smxuba2iverkgqqj440temhn.lambda-url.ap-southeast-1.on.aws/expenses/category"
    //         )
    //     .then(response => {
    //         return response.json()
    //     })
    //     .then(data => {
    //         for (let index = 0; index < data.length; index++) {
    //             if (data[index].name === category){
    //                 setCategoryID(data[index].id)
    //                 break
    //             } 
    //         }
    //     })
    // }


    useEffect(()=>{

        if (housing || food || transportation || personal) {
            fetchCategoryFilteredData(housing, food, transportation, personal)
        } else {
            fetchData()
        }

    },[ page, 
        filterMin, 
        filterMax,
        housing,
        food,
        transportation,
        personal ])
    
    useEffect(()=>{
        fetch(`https://utbmu5o3smxuba2iverkgqqj440temhn.lambda-url.ap-southeast-1.on.aws/expenses/total`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            setTotal(data.total)
        })
    },[])

    const handleChangeMin = ({currentTarget: input}: any) => {
        setFilterMin(input.value)
    }
    
    const handleChangeMax = ({currentTarget: input}: any) => {
        setFilterMax(input.value)
    }

    return (

        <div>

            {(data?.data === undefined) ? <p>Loading...</p> : data?.data.map((a) => (

                <Card id = {a.id}/>

            ))}

            <button onClick={() => setPage((prev) => prev - 1)} disabled={(data?.data !== undefined) && !data?.paging.hasPreviousPage}>Previous Page</button>
            <button onClick={() => setPage((prev) => prev + 1)} disabled={(data?.data !== undefined) && !data?.paging.hasNextPage}>Next Page</button>

            <form>
                <input onChange = {handleChangeMin} placeholder='100'></input>
                <input onChange = {handleChangeMax} placeholder='200'></input>
            </form>

            <h1>{total}</h1>
            <h1>{page}</h1>
            <h1>min {filterMin}</h1>
            <h1>max {filterMax}</h1>
            <input type="checkbox" checked={housing} onChange={()=>housingToggle(!housing)} ></input>
            <p>Housing</p>
            <input type="checkbox" checked={food} onChange={()=>foodToggle(!food)} ></input>
            <p>Food</p>
            <input type="checkbox" checked={transportation} onChange={()=>transportationToggle(!transportation)} ></input>
            <p>Transportation</p>
            <input type="checkbox" checked={personal} onChange={()=>personalToggle(!personal)} ></input>
            <p>Personal Spending</p>

        </div>

    )
}

export default Main