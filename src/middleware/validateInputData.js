import validator from '../helperUtils/validator';

class InputDataValidator {
  static validateBusData({ body }, res, next) {
    const fields = ['model', 'manufacturer', 'year', 'numberPlate', 'capacity'];
    const errors = [];
    
    fields.forEach(element => validator(element, body, errors));
    
    if (errors.length > 0) return res.status(400).send({ status: 400, errors });
    return next();
  }
  
  static validateTripData({ body }, res, next) {
    const fields = ['busId', 'origin', 'destination', 'tripDate', 'fare'];
    const errors = [];
    
    fields.forEach(element => validator(element, body, errors));
    
    if (errors.length > 0) return res.status(400).send({ status: 400, errors });
    return next();
  }
  
  static validateBookingData({ body }, res, next) {
    const fields = ['userId', 'tripId', 'seatNumber'];
    const errors = [];
    
    fields.forEach(element => validator(element, body, errors));
    
    if (errors.length > 0) return res.status(400).send({ status: 400, errors });
    return next();
  }
}

export default InputDataValidator;
