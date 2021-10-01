import React from 'react';
import { Box } from '@mui/material';
import { DealsChart as Chart } from './GraphDeals';

const Dashboard = () => {
    return (
        <>
            <Box display="flex" mt="2em">
                <Box flex="3" mr="1em">
                    <Chart />
                </Box>
                <Box flex="1">
                    
                </Box>
            </Box>
            <Box display="flex" mt="2em">
                <Box flex="1" mr="1em">
                    
                </Box>
                <Box flex="1" display="flex">
                    <Box flex="1" mr="1em">
                       
                    </Box>
                    <Box flex="1">

                    </Box>
                </Box>
            </Box>
        </>
    );
};
export default Dashboard