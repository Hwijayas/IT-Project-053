import React, {useEffect, useState} from 'react'
import {setUpdate, viewDeals, deleteDeal} from "./crudFunctions"
import { DragDropContext} from "react-beautiful-dnd";
import { stages } from './stage';
import {DealColumn} from "./DealColumn"
import {useDispatch, useSelector, connect} from 'react-redux';
import {Box} from '@mui/material'


const Deals = () => {
    
    const deals = useSelector(state => state.dealReducer)
    const dispatch = useDispatch();
    
    useEffect(() => {
        async function getDeals() {
        
            let response = viewDeals();
            
            if(typeof(response) !== "undefined"){
                dispatch(response)
                
            }
        }

        getDeals();
        
    },[dispatch]);

    const onDragEnd = () => async result => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }
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
                            dealIds= {deals.dealList.filter(function(e){
                                if(e.status === stage){
                                    return e
                                }
                            })}
                            key={index}
                        />
                    )
                })}
                
            </Box>
        </DragDropContext>
        
    )
 
}

export default Deals

