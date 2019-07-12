import validator from '../helperUtils/validator';

class InputDataValidator {
  static validateBusData({ body }, res, next) {
    const fields = ['model', 'manufacturer', 'year', 'numberPlate'];
    const errors = [];
    
    fields.forEach(element => validator(element, body, errors));
    
    if (errors.length > 0) return res.status(400).send({ status: 400, errors });
    return next();
  }
}

export default InputDataValidator;
