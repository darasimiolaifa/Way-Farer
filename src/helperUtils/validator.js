import HelperUtils from './helperUtils';

const validator = HelperUtils.validate();

export default (key, body, errors) => {
  const value = body[key];
  const optionalFields = ['seat_number'];
  
  if (validator.emptyBody.test(body)) {
    errors.push('The request body is empty. Please supply arguments to the endpoint.');
  }
  if ((!value || value.length === 0) && !optionalFields.includes(key)) {
    errors.push(`The ${key} field is missing from your input. Please fill it and resend.`);
  }
  
  switch (key) {
    case 'first_name':
    case 'last_name':
      if (!validator.name.test(value)) {
        errors.push(`The ${key} input is invalid. Please correct it and resend.`);
      } else body[key] = value ? value.toLowerCase().replace(/\s+/g, '') : undefined;
      break;
    case 'email':
      if (!validator.email.test(value)) {
        errors.push(`Please supply a valid ${key}`);
      }
      break;
    case 'capacity':
      if (!validator.integer.test(value)) {
        errors.push(`Please supply a valid ${key}`);
      }
      break;
    case 'year':
      if (!validator.year.test(value)) {
        errors.push(`Please supply a valid ${key}`);
      }
      break;
    case 'origin':
    case 'destination':
    case 'model':
    case 'manufacturer':
    case 'number_plate':
      if (!validator.string.test(value)) {
        errors.push(`Please supply a valid ${key}`);
      } else body[key] = value ? value.toLowerCase().replace(/\s+/g, '') : undefined;
      break;
    case 'seat_number':
      if (value && !(validator.integer.test(value) && value > 0)) {
        errors.push(`Please supply a valid ${key}`);
      }
      break;
    case 'fare':
      if (!validator.float.test(value)) {
        errors.push(`Please supply a valid ${key}`);
      }
      break;
    default:
      break;
  }
  return 1;
};
