import { useEffect, useState } from 'react'
import '../App.css';


const Pagination = (props: any): JSX.Element => {
    
    let pagination = []


    if ((props.data?.paging!== undefined) && (props.data?.paging.pageCount <= 6)){

        for (let index = 1; index <= props.data?.paging.pageCount; index++) {
            pagination.push (
                <button style={(props.page === index) ? {borderColor:"#4200FF", color:"#4200FF"}: {}} onClick={() => props.setPage(index)}>{index}</button>
            )            
        }

    } else if ((props.data?.paging !== undefined) && (props.data?.paging.pageCount > 5)) {

        if (props.page <= 4){
            for (let index = 1; index <= 5; index++) {
                pagination.push (
                    <button style={(props.page === index) ? {borderColor:"#4200FF", color:"#4200FF"}: {}} onClick={() => props.setPage(index)}>{index}</button>
                )            
            }

            pagination.push (
                <div>
                    <button>...</button>
                    <button onClick={() => props.setPage(props.data?.paging.pageCount)}>{props.data?.paging.pageCount}</button>
                </div>
            ) 

        } else if ( props.page >= props.data?.paging.pageCount - 3) {

            pagination.push (
                <div>
                    <button onClick={() => props.setPage(1)}>1</button>
                    <button>...</button>
                </div>
            ) 

            for (let index = 4; index >= 0; index--) {
                pagination.push (
                    <button style={(props.page === props.data?.paging.pageCount-index) ? {borderColor:"#4200FF", color:"#4200FF"}: {}} onClick={() => props.setPage(props.data?.paging.pageCount-index)}>{props.data?.paging.pageCount-index}</button>
                )            
            }

        } else {

            pagination.push (
                <div>
                    <button onClick={() => props.setPage(1)}>1</button>
                    <button>...</button>
                    <button onClick={() => props.setPage(props.page-1)}>{props.page-1}</button>
                    <button style ={{borderColor: "#4200FF", color:"#4200FF"}} onClick={() => props.setPage(props.page)}>{props.page}</button>
                    <button onClick={() => props.setPage(props.page+1)}>{props.page+1}</button>
                    <button>...</button>
                    <button onClick={() => props.setPage(props.data?.paging.pageCount)}>{props.data?.paging.pageCount}</button>
                </div>
            ) 
        }
    }
    return(
        <div className='pagination-container'>
                    
            <button onClick={() => props.setPage((prev:number) => prev - 1)} 
                    disabled = { (props.data?.statusCode === 400) || 
                                (props.data?.data !== undefined && 
                                !props.data?.paging.hasPreviousPage)}>{"\<"}
            </button>
            
            <div className='pagination-divs'>
                {pagination} 
            </div>

            <button onClick={() => props.setPage((prev:number) => prev + 1)} 
                    disabled={ (props.data?.statusCode === 400) || 
                            (props.data?.data !== undefined && 
                            !props.data?.paging.hasNextPage)}>{"\>"}
            </button>
        </div>
    )

}

export default Pagination
