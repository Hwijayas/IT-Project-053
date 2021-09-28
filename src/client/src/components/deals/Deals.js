import React, { useState , useEffect} from 'react'
import {setDeal, viewDeals } from "./crudFunctions"
import { DragDropContext, OnDragEndResponder} from "react-beautiful-dnd";
import isEqual from 'lodash/isEqual';
import { stages } from './stage';
import {DealColumn} from "./DealColumn"
import {useDispatch, useSelector} from 'react-redux';
import {Box} from '@mui/material'
import { defaults } from 'lodash';
import { DealCards } from './DealCards';
import { DealCard } from './DealCard';

const Deals = ( handleClose,  open) => {
    //const [deals, setDeals] = useState({});
    const deals = useSelector(state => state.dealReducer)
    const dispatch = useDispatch();
    //console.log(Object.keys(deals).length === 0)
    useEffect(() => {
        //viewDeals()
        
        async function getDeals() {
            let response = viewDeals();
            
            if(typeof(response) !== "undefined"){
                dispatch(response)
            }
            
        }

        getDeals();
        
        
    },[dispatch]);
    
    
    if(Object.keys(deals.dealList).length !== 0){
        console.log(deals.dealList)
    }
    
    function onDragEnd() {

    }
    

    return(
        //<DealCards key={index}>{item}</DealCards>
        
        <DragDropContext onDragEnd={onDragEnd}>
            <Box sx={{height:20} }/>
            <Box display="flex">
                {stages.map((stage, index) => {
                    
                    return(
                        <DealColumn
                            stage={stage}
                            data={deals}
                            //dealIds= {deals.dealList.filter(function(e))}
                            key={index}
                        />
                    )
                })}
                
            </Box>
        </DragDropContext>
        
    )
 
}

export default Deals
