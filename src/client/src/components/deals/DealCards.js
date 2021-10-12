
import { Button, Card, Typography, Grid, Divider} from '@mui/material';
import { makeStyles } from '@material-ui/core/styles'
import { Draggable } from 'react-beautiful-dnd';
import {deleteDeal, setCurrent, setDelete, setEdit, setViewing} from "./crudFunctions"
import {useDispatch, useSelector} from 'react-redux';

const useStyles = makeStyles(theme => ({
    root: {
        marginBottom: theme.spacing(1),
    },
    cardContent: {
        padding: theme.spacing(1),
        display: 'flex',
        height: 70,
    },
    cardText: {
        marginLeft: theme.spacing(1),
        height: 100
    },
    button: {
        
    }
}));


export const DealCards = ({ deal, index }) => {

    const dispatch = useDispatch();
    const classes = useStyles();

    const userReducer = useSelector(state => state.userReducer)

    const onDelete = async () =>{

        if(typeof(deal._id) !== "undefined"){

            dispatch(deleteDeal(deal._id))
            dispatch(setDelete(deal._id))
        }
    }

    const onEdit = async () =>{

        if(typeof(deal._id) !== "undefined"){
            dispatch(setEdit(true))
            dispatch(setCurrent(deal._id))
        }
    }

    const onView = async () => {
        dispatch(setViewing(true))
        dispatch(setCurrent(deal._id))
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
                            <Typography variant="body2" gutterBottom>
                                {/* {deal.customer.company} */}
                            </Typography>

                            <div className={classes.cardText}>
                                <Typography variant="body2">
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
                            {/*<Divider orientation='vertical'/>*/}
                            {/*<div className={classes.cardText}>*/}
                            {/*<Typography variant="body2">*/}
                            {/*        Client: {deal.customer.name ? deal.customer.name : 'N/A'}*/}
                            {/*    </Typography>*/}
                            {/*    <Typography*/}
                            {/*        variant="body2"*/}
                            {/*    >*/}
                            {/*        Company: <br/> {deal.customer.company}*/}
                            {/*    </Typography>*/}
                            {/*</div>*/}
                            <Grid 
                            container
                            justifyContent="flex-end"
                            >
                                
                                <Button 
                                    className={classes.button}
                                    style={{height: '30px', width : '50px'}}
                                    onClick={onView}
                                    variant="contained"
                                    >
                                        View
                                </Button>
                                {
                                !userReducer.user.isAdmin ?
                                <Button 
                                    className={classes.button}
                                    style={{height: '30px', width : '50px'}}
                                    onClick={onEdit}
                                    variant="contained"
                                    orientation="horizontal"
                                    >
                                        Edit
                                </Button>
                                : null}
                                <Button 
                                    className={classes.button}
                                    style={{height: '30px', width : '50px'}}
                                    onClick={onDelete}
                                    variant="contained"
                                    orientation="horizontal"
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


