import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../../../../../Loaders/loader';

export default function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const { profileData } = useSelector((state) => state.profile);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <Fragment>
      {isLoading && <Loader />}
      {profileData && profileData?._id && <div>{JSON.stringify(profileData)}</div>}
    </Fragment>
  );
}
