/* eslint-disable no-param-reassign */
import HelperUtils from './helperUtils';

const validator = HelperUtils.validate();

export default (key, body, errors) => {
  let value = body[key];
  
  if (validator.emptyBody.test(body)) {
    errors.push('The request body is empty. Please supply arguments to the endpoint.');
  }
  if (!value || value.length === 0) {
    errors.push(`The ${key} field is missing from your input. Please fill it and resend.`);
  } else value = value.toLowerCase().replace(/\s+/g, '');
  
  switch (key) {
    case 'firstName':
    case 'lastName':
      if (!validator.name.test(value)) {
        errors.push(`The ${key} input is invalid. Please correct it and resend.`);
      } else body[key] = value;
      break;
    case 'email':
      if (!validator.email.test(value)) {
        errors.push(`Please supply a valid ${key}`);
      }
      break;
    default:
      break;
  }
  return 1;
};
