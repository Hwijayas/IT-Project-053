import React, { useState , useEffect} from 'react'
import {setDeal, viewDeals } from "./crudFunctions"
import { DragDropContext, OnDragEndResponder} from "react-beautiful-dnd";
import isEqual from 'lodash/isEqual';
import { stages } from './stages';
import {DealColumn} from "./DealColumn"
import {useDispatch, useSelector} from 'react-redux';
import { defaults } from 'lodash';

const Deals = ( handleClose,  open) => {
    //const [deals, setDeals] = useState({});
    const deals = useSelector(state => state.dealReducer)
    const dispatch = useDispatch();
    //console.log(Object.keys(deals).length === 0)
    useEffect(() => {
        
        
        async function getDeals() {
            let response = viewDeals();
            
            if(typeof(response) !== "undefined"){
                dispatch(response)
            }
            
        }

        getDeals(); 
        
    },[deals.dealList, dispatch]);
    
    console.log(deals.dealList)
    
    
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
