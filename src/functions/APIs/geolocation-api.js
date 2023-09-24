import axios from 'axios';
import ENV from '../../config.json';

export const getIpAddress = async () => {
  return await axios
    .get('https://api.ipify.org?format=json')
    .then(async (res) => {
      return res.data.ip;
    })
    .catch((err) => {
      console.log('Error from getIPAddress: ', err);
    });
};

export const getGeoLocation = async (ip) => {
  return await axios
    .get(ENV.STACKGEO_BASE_URL + ip)
    .then((result) => {
      localStorage.setItem(
        'ipLocationData',
        JSON.stringify({
          ipAddress: ip,
          location: `${result.data.city}, ${result.data.regionName} (${result.data.region}), ${result.data.country} (${result.data.countryCode})`,
        }),
      );
      localStorage.setItem('geoLocationData', JSON.stringify(result.data));
    })
    .catch((err) => {
      console.log('Error from getGeoLocation: ', err);
    });
};
