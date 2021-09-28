import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@mui/material';

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

export const DealCards = ({ data }) => {

    const classes = useStyles();

    return (
        
        <div className={classes.root}>
            <Button>Test</Button>
            {/* <h1> test </h1> */}
        </div>
    )
}


