import React, { useState , useEffect} from 'react'
import {setDeal, viewDeals } from "./crudFunctions"
import { DragDropContext, OnDragEndResponder} from "react-beautiful-dnd";
import isEqual from 'lodash/isEqual';
import { stages } from './stages';
import {DealColumn} from "./DealColumn"
import {useDispatch} from 'react-redux';

const Deals = ( handleClose,  open) => {
    const [deals, setDeals] = useState({});
    const dispatch = useDispatch();
    
    useEffect(() => {
        
        async function getDeals() {
            let response = viewDeals()
            
            if(response){
                setDeals(response)
                dispatch(response)
            }
        }

        getDeals();
        
        
    },[]);
    
    console.log(deals)
    
    
    function onDragEnd() {

    }
    

    return (
        
        
        <>
        {/* <DragDropContext onDragEnd={onDragEnd}>
            {stages.map(stage =>{
                <DealColumn
                    stage={stage}
                    //dealIds={deals[stage]}
                    data={deals}
                    key={stage}
                />
            })}
        </DragDropContext> */}
        
        </>
    )   
}

export default Deals
