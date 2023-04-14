import {useEffect, useState } from 'react'
import {useParams} from 'react-router-dom';

import food from "../icons/Food.png"
import transport from "../icons/Transport.png"
import housing from "../icons/Housing.png"
import personal from "../icons/Personal.png"
import amount from "../icons/Amount.png"

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


    if (data?.created_at !== undefined){
        const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

        var t = new Date(data?.created_at)

        var time = t.getUTCDate() + " " + month[t.getUTCMonth()] + " " + t.getUTCFullYear() + ", " + ("0" + t.getUTCHours()).slice(-2) + ":" + ("0" + t.getUTCMinutes()).slice(-2) + " WIB"

    } else {
        var time = ""
    }

    if (data?.description !== undefined){
        var d = data?.description.split(".")
        var desc = d[0] + ". " + d[1] + "."
    } else {
        var desc = ""
    }

    return(
        <div className='container'>
            <div className='subcontainer'>
                <div className="back">
                    <a href="javascript:history.back()">
                        {"\u2190 Back"}
                    </a>
                </div>
                <div className="details">
                    <div className='details-title'>

                        {
                        (data?.category.name === "Food")? <img src={food} alt="food-icon" className='details-card-icon'></img> :
                        (data?.category.name === "Housing")? <img src={housing} alt="housing-icon" className='details-card-icon'></img> :
                        (data?.category.name === "Transportation")? <img src={transport} alt="transportation-icon" className='details-card-icon'></img> :
                        (data?.category.name === "Personal Spending")? <img src={personal} alt="personal-icon" className='details-card-icon'></img> : ""
                        }

                        <p className='details-subtitle'>{data?.name}</p>

                        <div className='details-amount'>
                            <img src={amount} alt="food-icon" className='details-amount-icon'></img>
                            <p className='details-amount-data'>{data?.amount.toLocaleString("id-ID", {minimumFractionDigits:2})}</p>
                        </div>

                    </div>

                    <hr/>
                    
                    <div className="details-data-container">
                        <p className='details-subtitle' >Transaction Details</p>

                        <div className='transaction-details'>
                            <p className='details-name'>ID</p>
                            <p className='details-data'>{data?.id}</p>
                        </div>

                        <div className='transaction-details'>
                            <p className='details-name'>Type</p>
                            <p className='details-data'>{data?.category.name}</p>
                        </div>

                        <div className='transaction-details'>
                            <p className='details-name'>Time</p>
                            <p className='details-data'>{time}</p>
                        </div>
                    </div>

                    <hr/>

                    <div className="description-container">
                        <p className='details-subtitle'>Notes</p>
                        <p className='description-data'>{desc}</p>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Details
