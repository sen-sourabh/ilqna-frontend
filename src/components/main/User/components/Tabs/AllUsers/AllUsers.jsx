import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../../../../../Loaders/loader';

export default function AllUsers() {
  const [isLoading, setIsLoading] = useState(true);
  const { allUsersData } = useSelector((state) => state.all_users);
  console.log('allUsersData: ');
  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <Fragment>
      {isLoading && <Loader />}
      {allUsersData?.length && <div>{JSON.stringify(allUsersData)}</div>}
    </Fragment>
  );
}
