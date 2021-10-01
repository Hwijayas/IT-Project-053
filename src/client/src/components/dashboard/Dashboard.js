import React from 'react';
import { Box } from '@material-ui/core';
import { GraphDeals as Chart } from './GraphDeals';

export const Dashboard = () => {
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