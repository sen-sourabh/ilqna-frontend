import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Loader from '../../../Loaders/loader';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function UserTabs() {
  const [value, setValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="ilqna-main">
      {isLoading && <Loader />}
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Profile" {...a11yProps(0)} />
            <Tab label="All Users" {...a11yProps(1)} />
            <Tab label="Pending Approvals" {...a11yProps(2)} />
            <Tab label="Categories" {...a11yProps(3)} />
            <Tab label="Languages" {...a11yProps(4)} />
            <Tab label="Activity" {...a11yProps(5)} />
            <Tab label="Logs" {...a11yProps(6)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          Profile
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          All Users
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Pending Approvals
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          Categories
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          Languages
        </CustomTabPanel>
        <CustomTabPanel value={value} index={5}>
          Activity
        </CustomTabPanel>
        <CustomTabPanel value={value} index={6}>
          Logs
        </CustomTabPanel>
      </Box>
    </div>
  );
}
