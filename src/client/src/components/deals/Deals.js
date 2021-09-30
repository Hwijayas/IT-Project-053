import React, {useEffect, useState} from 'react'
import {setDeal, viewDeals, setEdit, updateDeal, updateDealStatus} from "./crudFunctions"
import { DragDropContext} from "react-beautiful-dnd";
import { stages } from './stage';
import {DealColumn} from "./DealColumn"
import {useDispatch, useSelector} from 'react-redux';
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

        if(deals.update){
            showModalWindow()
        }

        //console.log(deals.dealList)
        
    },[dispatch, deals.update]);

    function onDragEnd (result) {
        
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
        
        // within same column
        if (source.droppableId === destination.droppableId){

            const allDeals = Array.from(deals.dealList);
            const [reorderedItem] = allDeals.splice(source.index, 1);
            allDeals.splice(destination.index, 0, reorderedItem);

            //update local state
            dispatch(setDeal(allDeals))
        }

        //other column
        else{
            //const sourceColumnAllDeals = Array.from(deals.dealList);
            //sourceColumnAllDeals.splice(source.index, 1);

            //update local state
            dispatch(updateDeal(draggableId, destination.droppableId))
            dispatch(updateDealStatus(draggableId, destination.droppableId))
        }


    }

    const showModalWindow = () => {
        SetShowModal(true)
    };
    
    const hideModalWindow = () => {
        SetShowModal(false)
        dispatch(setEdit(false))
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

            <Modal open={showModal} handleClose={hideModalWindow} edit={deals.update} currentId={deals.currentDeal}></Modal>
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

