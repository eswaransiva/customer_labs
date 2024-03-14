

import React, { useState } from 'react';
import './Home.css';
import { Grid, Typography } from '@mui/material';
import Sidebar from '../Component/Sidebar';

const Home = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <Grid container  md={12} sm={12} lg={12} xs={12} className="app">
            <Grid item md={12} sm={12} lg={12} xs={12} className='headers' pt={5}>
                <Typography variant='h6' className='headings'>
                    Screen-1
                </Typography>
                <Typography variant='h6' className='headings'>
                  Popup Screen And Get Dropdown
                </Typography>
            </Grid>
            <Grid container  md={12} sm={12} lg={12} xs={12} className='segmentButton'>
                <button onClick={toggleSidebar} className='saveSegment'>Save Segment</button>

            </Grid>
            {isSidebarOpen && <Sidebar />}

        </Grid>
    );
};

export default Home;
