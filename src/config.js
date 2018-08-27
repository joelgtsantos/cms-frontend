let domainProfile, domainGalatea, domainSao, protocol;

/* if (process.env.MODE === 'production') {
  domainProfile = 'fa-backend.herokuapp.com';
  domainGalatea = 'fa-backend.herokuapp.com';
  protocol = 'https';
} else { */
  domainProfile = 'localhost:8080/cmsusers/api/v1';
  domainGalatea = 'localhost:8081/galatea/v1';
  domainSao = 'localhost:8000/sao/v1';
  protocol = 'http';
/* } */

const CMS_BASE_URI_PROFILE = `${protocol}://${domainProfile}`;
const CMS_BASE_URI_GALATEA = `${protocol}://${domainGalatea}`;
const CMS_BASE_URI_SAO = `${protocol}://${domainSao}`;

export {CMS_BASE_URI_PROFILE, CMS_BASE_URI_GALATEA, CMS_BASE_URI_SAO};