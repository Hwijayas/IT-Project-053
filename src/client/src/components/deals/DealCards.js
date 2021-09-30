
import { Button } from '@mui/material';
import { Card, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Draggable } from 'react-beautiful-dnd';
import {deleteDeal, setDelete} from "./crudFunctions"
import {useDispatch} from 'react-redux';

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
    delete_button: {
        float: 'right',
    }
}));


export const DealCards = ({ deal, index }) => {

    const dispatch = useDispatch();
    const classes = useStyles();

    const onDelete = async () =>{

        if(typeof(deal._id) !== "undefined"){

            dispatch(deleteDeal(deal._id))
            dispatch(setDelete(deal._id))
        }
    }
    
    return (
        

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
                                </Typography>
                            </div>
                            <Grid container justifyContent="flex-end">
                                <Button 
                                    className={classes.delete_button} 
                                    onClick={onDelete}
                                    variant="contained"
                                    >
                                        Delete
                                </Button> 
                            </Grid>
                            
                        </div>
                    </Card>
                </div>
            )}
        </Draggable>
    )
}

