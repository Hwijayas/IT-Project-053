import React, {useEffect, useState} from 'react'
import {setUpdate, viewDeals, deleteDeal} from "./crudFunctions"
import { DragDropContext} from "react-beautiful-dnd";
import { stages } from './stage';
import {DealColumn} from "./DealColumn"
import {useDispatch, useSelector, connect} from 'react-redux';
import {Box, Button, Grid } from '@mui/material'
import Modal from "./Modal"


const Deals = () => {
    
    const deals = useSelector(state => state.dealReducer)
    const dispatch = useDispatch();
    const [showModal, SetShowModal] = useState(false)
    
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

    const showModalWindow = () => {
        SetShowModal(true)
    };
    
    const hideModalWindow = () => {
        SetShowModal(false)
    };
    

    return(
        
        <DragDropContext onDragEnd={onDragEnd}>
            
            <Box sx={{height:20} }/>
            <Grid container justifyContent="flex-end">
                <Button 
                    onClick={showModalWindow} 
                    variant="contained"
                    > 
                    Add Deals 
                </Button>
            </Grid>

            <Modal open={showModal} handleClose={hideModalWindow}></Modal>
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

