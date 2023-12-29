import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../../../../../Loaders/loader';
import './languages.scss';

export default function Languages() {
  const [isLoading, setIsLoading] = useState(true);
  const { allLanguagesData } = useSelector((state) => state.language);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <Fragment>
      {isLoading && <Loader />}
      {allLanguagesData?.length > 0 && <div>{JSON.stringify(allLanguagesData)}</div>}
    </Fragment>
  );
}
