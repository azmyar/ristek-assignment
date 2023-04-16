import { useEffect, useState } from 'react'
import '../App.css';

import amount_icon from "../icons/Amount.png"
import food_icon from "../icons/Food.png"
import transport_icon from "../icons/Transport.png"
import housing_icon from "../icons/Housing.png"
import personal_icon from "../icons/Personal.png"
import filter_icon from "../icons/Filter.png"
import range_icon from "../icons/Range.png"

const Filter = (props: any): JSX.Element => {

    return(
        <div className='filter-container'>

                <div className='total'>
                    <p className='expenses-title'>Current Expenses</p>
                    <div className='expenses-container'>  
                        <img src={amount_icon} alt="food-icon" className='amount-icon'></img>                  
                        <p className='expenses'>{props.total.toLocaleString("id-ID", {minimumFractionDigits:2})}</p>
                    </div>
                </div>

                <div className='filter'>
                    <div className="filter-title-container">
                        <img src={filter_icon} alt="filter-icon" className='filter-icon'></img>
                        <p className='filter-title'>Filters</p>
                    </div>

                    <p className='filter-subtitle'>Filter by Transaction Category</p>

                    <div className="category">
                    <input type="checkbox" className = "input" checked={props.filter.housing} onChange={()=>{props.filter.functHousing()}} ></input>
                    <img src={housing_icon} alt="food-icon" className='category-filter-icon'></img>
                    <p>Housing</p>
                    </div>

                    <div className="category">
                    <input type="checkbox"className = "input"  checked={props.filter.food} onChange={()=> {props.filter.functFood()}} ></input>
                    <img src={food_icon} alt="food-icon" className='category-filter-icon'></img>
                    <p>Food</p>
                    </div>

                    <div className="category">
                    <input type="checkbox" className = "input" checked={props.filter.transportation} onChange={()=> {props.filter.functTransport()}} ></input>
                    <img src={transport_icon} alt="food-icon" className='category-filter-icon'></img>
                    <p>Transportation</p>
                    </div>

                    <div className="category">
                    <input type="checkbox" className = "input" checked={props.filter.personal} onChange={()=> {props.filter.functPersonal()}} ></input>
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
                                    <input className='range-input' onChange = {props.filter.functFilterMin} value={props.filter.filterMin}></input>
                                </div>
                            </div>

                            <div className="line-container">
                                <hr className='short-line'/>
                            </div>

                            <div className='range-filter-max'>
                                <p className='minmax'>Max</p>
                                <div className="range-filter">
                                    <img src={range_icon} alt="filter-icon" className='range-icon'></img>
                                    <input className='range-input' onChange = {props.filter.functFilterMax} value={props.filter.filterMax}></input>
                                </div>
                            </div>

                        </div>
                    </form>
                </div>
                
            </div>
    )

}

export default Filter
