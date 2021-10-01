import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Link } from '@material-ui/core';
import {AttachMoneyIcon} from '@mui/icons-material';
import { ResponsiveBar } from '@nivo/bar';
import {useSelector} from 'react-redux';

export const DealsChart = () => {
    const [data, setData] = useState([]);
    const dealReducer  = useSelector(state => state.dealReducer);
    const deals = dealReducer.dealList;
    const getAccumulatedDeals = (key) => {
        return deals.filter(deal => deal.status===key)
                .reduce((acc, deal) => {
                    acc+=deal.value;
                    return acc;
                }, 0)
    }
    //calculate new values every time
    useEffect(() => {
        // deal state we care about: Pending, Accepted, Declined
        const getDealsByStatus = () => {
            return {
            'Pending': getAccumulatedDeals("Pending"),
            'Accepted': getAccumulatedDeals("Accepted"),
            'Declined': getAccumulatedDeals("Declined"),
            }
        }
        setData(getDealsByStatus);
    }, [dealReducer.dealList]);

    return (
        <>
            <Box display="flex" alignItems="center">
                <Box ml={2} mr={2} display="flex">
                    <AttachMoneyIcon color="disabled" fontSize="large" />
                </Box>
                <Link
                    underline="none"
                    variant="h5"
                    color="textSecondary"
                    component={Link}
                    to="/deals"
                >
                    Deal Overview
                </Link>
            </Box>
            <Box height={500}>
                <ResponsiveBar
                    data={data}
                    keys={['Accepted', 'Pending', 'Declined']}
                    colors={['#61cdbb', '#97e3d5', '#e25c3b']}
                    margin={{ top: 50, right: 50, bottom: 50, left: 0 }}
                    padding={0.3}
                    valueScale={{
                        type: 'linear',
                        min: range.min * 1.2,
                        max: range.max * 1.2,
                    }}
                    indexScale={{ type: 'band', round: true }}
                    enableGridX={true}
                    enableGridY={false}
                    enableLabel={false}
                    axisTop={{
                        tickSize: 0,
                        tickPadding: 12,
                    }}
                    axisBottom={{
                        legendPosition: 'middle',
                        legendOffset: 50,
                        tickSize: 0,
                        tickPadding: 12,
                    }}
                    axisLeft={null}
                    axisRight={{
                        format: (v) => `${Math.abs(v / 1000)}k`,
                        tickValues: 8,
                    }}
                    markers={
                        [
                            {
                                axis: 'y',
                                value: 0,
                                lineStyle: { strokeOpacity: 0 },
                                textStyle: { fill: '#2ebca6' },
                                legend: 'Accepted',
                                legendPosition: 'top-left',
                                legendOrientation: 'vertical',
                            },
                            {
                                axis: 'y',
                                value: 0,
                                lineStyle: {
                                    stroke: '#f47560',
                                    strokeWidth: 1,
                                },
                                textStyle: { fill: '#e25c3b' },
                                legend: 'Declined',
                                legendPosition: 'bottom-left',
                                legendOrientation: 'vertical',
                            },
                        ]
                    }
                />
            </Box>
        </>
    );
};