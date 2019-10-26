let domainProfile, domainGalatea, domainSao, protocol;

const SESSION_STORAGE_KEY = 'access_token';
const PROFILE_STORAGE_KEY = 'profile';

/* if (process.env.MODE === 'production') {
  domainProfile = 'fa-backend.herokuapp.com';
  domainGalatea = 'fa-backend.herokuapp.com';
  protocol = 'https';
} else { */
  domainProfile = 'localhost:9000/cmsusers/cmsusers/api/v1';
  domainGalatea = 'localhost:9000/galatea/galatea/v1';
  domainSao = 'localhost:9000/sao/sao/v1';
  protocol = 'http';
/* } */

const CMS_BASE_URI_PROFILE = `${protocol}://${domainProfile}`;
const CMS_BASE_URI_GALATEA = `${protocol}://${domainGalatea}`;
const CMS_BASE_URI_SAO = `${protocol}://${domainSao}`;

export {
        CMS_BASE_URI_PROFILE, 
        CMS_BASE_URI_GALATEA, 
        CMS_BASE_URI_SAO, 
        SESSION_STORAGE_KEY, 
        PROFILE_STORAGE_KEY
      };