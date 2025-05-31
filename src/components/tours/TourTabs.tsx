"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const TourTabs = () => {
   const [value, setValue] = React.useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
  setValue(newValue);

  const sectionIds = ['overview', 'itinerary', 'inclusions', 'info'];
  const sectionId = sectionIds[newValue];
  const element = document.getElementById(sectionId);

  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={value} onChange={handleChange} centered  TabIndicatorProps={{ style: { display: 'none' } }}>

        <Tab className='offerTabs' label="Overview" />
        <Tab className='offerTabs' label="Day wise Itinerary"/>
        <Tab className='offerTabs' label="Inclusion/Exclusions" />
        <Tab className='offerTabs' label="Additional Info" />

      </Tabs>
    </Box>
  )
}

export default TourTabs;
