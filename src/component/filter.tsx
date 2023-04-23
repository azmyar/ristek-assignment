import { ChangeEventHandler } from 'react';
import '../App.css';

import amount_icon from "../icons/Amount.png"
import food_icon from "../icons/Food.png"
import transport_icon from "../icons/Transport.png"
import housing_icon from "../icons/Housing.png"
import personal_icon from "../icons/Personal.png"
import filter_icon from "../icons/Filter.png"
import range_icon from "../icons/Range.png"

interface filterProps {
    total : number;
    filterMin : number;
    filterMax : number;
    housing : boolean;
    food : boolean;
    transportation : boolean;
    personal : boolean;
    functHousing : Function;
    functFood : Function;
    functTransport : Function;
    functPersonal : Function  
    rangeFilter : ChangeEventHandler<HTMLInputElement>;
}

const Filter = (props: filterProps): JSX.Element => {

    return(
        <div className='filter-container'>

                <div className='total'>
                    <p className='expenses-title'>Current Expenses</p>
                    <div className='expenses-container'>  
                        <img src={amount_icon} alt="food-icon" className='amount-icon-filter'></img>                  
                        <p className='expenses'>{props.total.toLocaleString("id-ID", {minimumFractionDigits:2})}</p>
                    </div>
                </div>

                <div className='filter'>
                    <div className="filter-title-container">
                        <img src={filter_icon} alt="filter-icon" className='filter-icon'></img>
                        <p className='filter-title'>Filters</p>
                    </div>

                    <p className='filter-subtitle'>Filter by Transaction Category</p>
                    <p className='filter-subtitle-tab'>Category</p>

                    <div className='category-wrapper'>
                        <div className="category">
                            <input type="checkbox" className = "input" checked={props.housing} onChange={()=>{props.functHousing()}} ></input>
                            <img src={housing_icon} alt="food-icon" className='category-filter-icon'></img>
                            <p className='category-name-small' >Housing</p>
                        </div>

                        <div className="category">
                            <input type="checkbox"className = "input"  checked={props.food} onChange={()=> {props.functFood()}} ></input>
                            <img src={food_icon} alt="food-icon" className='category-filter-icon'></img>
                            <p className='category-name-small'>Food</p>
                        </div>

                        <div className="category">
                            <input type="checkbox" className = "input" checked={props.transportation} onChange={()=> {props.functTransport()}} ></input>
                            <img src={transport_icon} alt="food-icon" className='category-filter-icon'></img>
                            <p className='category-name-small'>Transportation</p>
                        </div>

                        <div className="category">
                            <input type="checkbox" className = "input" checked={props.personal} onChange={()=> {props.functPersonal()}} ></input>
                            <img src={personal_icon} alt="food-icon" className='category-filter-icon'></img>
                            <p className='category-name-small'>Personal Spending</p>
                        </div>
                    </div>

                    <hr className='long-line'/>

                    <p className='filter-subtitle'>Filter by Expense Range</p>
                    <p className='filter-subtitle-tab'>Range</p>

                    <form>
                        <div className='range-filter-container'>

                            <div className='range-filter-min'>
                                <p className='minmax'>Min</p>
                                <div className="range-filter">
                                    <img src={range_icon} alt="filter-icon" className='range-icon'></img>
                                    <input name = "Min" className='range-input' onChange = {props.rangeFilter} value={props.filterMin}></input>
                                </div>
                            </div>

                            <div className="line-container">
                                <hr className='short-line'/>
                            </div>

                            <div className='range-filter-max'>
                                <p className='minmax'>Max</p>
                                <div className="range-filter">
                                    <img src={range_icon} alt="filter-icon" className='range-icon'></img>
                                    <input name = "Max" className='range-input' onChange = {props.rangeFilter} value={props.filterMax}></input>
                                </div>
                            </div>

                        </div>
                    </form>
                    
                </div>
                
            </div>
    )

}

export default Filter
