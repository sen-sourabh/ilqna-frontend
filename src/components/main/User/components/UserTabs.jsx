import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, getUser } from '../../../../functions/APIs/user-api';
import { setAllUsersData } from '../../../../redux/allUsersRedux/allusers-slice';
import { setProfileData } from '../../../../redux/profileRedux/profile-slice';
import '../../../../sass/user-tabs.scss';
import Loader from '../../../Loaders/loader';
import AllUsers from './Tabs/AllUsers/AllUsers';
import Profile from './Tabs/Profile/Profile';

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
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.login);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProfileContents();
    loadAllUsersContents();
    setIsLoading(false);
  }, []);

  const loadProfileContents = async () => {
    const response = await getUser(userData);
    dispatch(setProfileData(response?.data));
  };

  const loadAllUsersContents = async () => {
    const response = await getAllUsers();
    dispatch(setAllUsersData(response?.data));
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    loadProfileContents();
    loadAllUsersContents();
  };

  return (
    <div className="ilqna-main">
      {isLoading && <Loader />}
      <Box>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            scrollButtons={true}
            allowScrollButtonsMobile={true}
          >
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
          <Profile />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <AllUsers />
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
