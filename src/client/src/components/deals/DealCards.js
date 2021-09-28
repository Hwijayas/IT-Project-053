import React from 'react'
import { Button } from '@mui/material';
import { Card, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Draggable } from 'react-beautiful-dnd';

const useStyles = makeStyles(theme => ({
    root: {
        marginBottom: theme.spacing(1),
    },
    cardContent: {
        padding: theme.spacing(1),
        display: 'flex',
    },
    cardText: {
        marginLeft: theme.spacing(1),
    },
}));

export const DealCards = ({ deal, index }) => {

    const classes = useStyles();
    //console.log(deal)
    return (
        
        // <div className={classes.root}>
        //     <h1>Test</h1>
        // </div>

        <Draggable draggableId={String(deal._id)} index={index}>
            {(provided, snapshot) => (
                <div
                    className={classes.root}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    //onClick={handleClick}
                >
                    <Card
                        style={{
                            opacity: snapshot.isDragging ? 0.9 : 1,
                            transform: snapshot.isDragging
                                ? 'rotate(-2deg)'
                                : '',
                        }}
                        elevation={snapshot.isDragging ? 3 : 1}
                    >
                        <div className={classes.cardContent}>
                            {/* <ReferenceField
                                source="company_id"
                                record={deal}
                                reference="companies"
                                resource="deals"
                                basePath="/deals"
                            >
                                <LogoField size="small" />
                            </ReferenceField> */}
                            <div className={classes.cardText}>
                                <Typography variant="body2" gutterBottom>
                                    {deal.dealName}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    color="textSecondary"
                                >
                                    {deal.value.toLocaleString('en-US', {
                                        notation: 'compact',
                                        style: 'currency',
                                        currency: 'USD',
                                        currencyDisplay: 'narrowSymbol',
                                        minimumSignificantDigits: 3,
                                    })}
                                    {/* , {deal.type} */}
                                </Typography>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </Draggable>
    )
}


