"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const OfferTabs = () => {
   const [value, setValue] = React.useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue:number) => {
    setValue(newValue);

  };
  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={value} onChange={handleChange} centered  TabIndicatorProps={{ style: { display: 'none' } }}>

        <Tab className='offerTabs' label="Best Offers" />
        <Tab className='offerTabs' label="bank Offers" />
        <Tab className='offerTabs' label="Card Offers" />
        <Tab className='offerTabs' label="Hotel Offers" />
        <Tab className='offerTabs' label="Flight Offers" />

      </Tabs>
    </Box>
  )
}

export default OfferTabs

