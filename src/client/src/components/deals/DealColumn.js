import * as React from 'react';
import { Typography} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Droppable } from 'react-beautiful-dnd';
import {DealCards} from "./DealCards"
import { stageNames } from './stage';

const useStyles = makeStyles({
    root: {
        flex: 1,
        paddingTop: 8,
        paddingBottom: 16,
        backgroundColor: 'lavender',
        '&:first-child': {
            paddingLeft: 5,
            borderTopLeftRadius: 5,
        },
        '&:last-child': {
            paddingRight: 5,
            borderTopRightRadius: 5,
        },
    },
    droppable: {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 10,
        padding: 5,
        '&.isDraggingOver': {
            backgroundColor: '#dadadf',
        },
    },
}, {index: 1});

export const DealColumn = ({stage , dealIds, data}) => {
    //console.log(dealIds)
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography align="center" variant="subtitle1">
                {/* @ts-ignore */}
                <h4 className="fw-bold">
                {stageNames[stage]}
                </h4>
            </Typography>
            <Droppable droppableId={stage}>
                {(droppableProvided, snapshot) => (
                    <div
                        ref={droppableProvided.innerRef}
                        {...droppableProvided.droppableProps}
                        className={
                            classes.droppable +
                            (snapshot.isDraggingOver ? ' isDraggingOver' : '')
                        }
                    >
                        {dealIds.map((id, index) => (
                            <DealCards key={id._id} index={index} deal={id} />
                        ))}
                        {/* {dealIds.map((id, index) =>{
                            console.log(id)
                        })} */}
                        
                        {droppableProvided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};
