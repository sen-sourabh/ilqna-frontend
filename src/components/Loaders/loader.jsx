import * as React from 'react';
import { ColorRing } from 'react-loader-spinner';
import '../../sass/loader.scss';

export default function Loader() {
  return (
    <ColorRing
      visible={true}
      height="80"
      width="80"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper custom-loader"
      colors={['#1976D2', '#00000099', '#1976D2', '#1976D2', '#1976D2']}
    />
  );
}
