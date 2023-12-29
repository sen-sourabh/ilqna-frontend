import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../../../../../Loaders/loader';
import './languages.scss';

export default function Languages() {
  const [isLoading, setIsLoading] = useState(true);
  const { allLanguagesData } = useSelector((state) => state.language);

  useEffect(() => {
    if(allLanguagesData.length > 0) {
      setIsLoading(false);
    }
  }, [allLanguagesData]);

  return (
    <Fragment>
      {isLoading && <Loader />}
      {allLanguagesData?.length > 0 && <div>{JSON.stringify(allLanguagesData)}</div>}
    </Fragment>
  );
}
