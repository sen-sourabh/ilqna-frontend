import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../../../../../Loaders/loader';
import './categories.scss';

export default function Categories() {
  const [isLoading, setIsLoading] = useState(true);
  const { allCategoriesData } = useSelector((state) => state.category);
  console.log('cate: ', allCategoriesData);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <Fragment>
      {isLoading && <Loader />}
      {allCategoriesData?.length && <div>{JSON.stringify(allCategoriesData)}</div>}
    </Fragment>
  );
}
