import React from 'react';
import { Box } from '@mui/material';
import { DealsChart as Chart } from './GraphDeals';
import logo from '../../images/Union.svg'

const Dashboard = () => {
    return (
        <>
            <div className="container">
            <figure className="mb-2">
                    <img className="dashboard-logo" src={logo} alt="" srcset="" />
                </figure>
            <Box display="flex">
                <Box flex="3" mr="1em">
                    <Chart />
                </Box>
                <Box flex="1">
                    
                </Box>
            </Box>
            <Box display="flex">
                <Box flex="1" mr="1em">
                    
                </Box>
                <Box flex="1" display="flex">
                    <Box flex="1" mr="1em">
                       
                    </Box>
                    <Box flex="1">

                    </Box>
                </Box>
            </Box>
            </div>
        </>
    );
};
export default Dashboard