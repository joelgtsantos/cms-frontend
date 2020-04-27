let apiFQDN, apiPort, protocol, apiRoute;

const SESSION_STORAGE_KEY = 'access_token';
const PROFILE_STORAGE_KEY = 'profile';

if (process.env.MODE === 'production') {
  // -- Cloud edge server
  // Please do not update these values since the deployment automation relies on them.
  protocol = 'http';
  apiFQDN = 'lets-code.local';
  apiPort = '';
  apiRoute = '/api';
} else {
  // -- Vagrant (cms-boxes) emulated edge server
  // Feel free to change these values for development purposes
  protocol = 'http';
  apiFQDN = '192.168.7.11';
  apiPort = '';
  apiRoute = '/api';
}

const CMS_BASE_URI_PROFILE = `${protocol}://${apiFQDN}${apiPort}${apiRoute}/cmsusers/v1`;
const CMS_BASE_URI_GALATEA = `${protocol}://${apiFQDN}${apiPort}${apiRoute}/galatea/v1`;
const CMS_BASE_URI_SAO = `${protocol}://${apiFQDN}${apiPort}${apiRoute}/sao/v1`;

export {
  CMS_BASE_URI_PROFILE,
  CMS_BASE_URI_GALATEA,
  CMS_BASE_URI_SAO,
  SESSION_STORAGE_KEY,
  PROFILE_STORAGE_KEY
};
