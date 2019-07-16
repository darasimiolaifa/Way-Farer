import validator from '../helperUtils/validator';

class InputDataValidator {
  static validateBusData({ body }, res, next) {
    const fields = ['model', 'manufacturer', 'year', 'number_plate', 'capacity'];
    const error = [];
    
    fields.forEach(element => validator(element, body, error));
    
    if (error.length > 0) return res.status(400).send({ status: 400, error });
    return next();
  }
  
  static validateTripData({ body }, res, next) {
    const fields = ['bus_id', 'origin', 'destination', 'fare'];
    const error = [];
    
    fields.forEach(element => validator(element, body, error));
    
    if (error.length > 0) return res.status(400).send({ status: 400, error });
    return next();
  }
  
  static validateBookingData({ body }, res, next) {
    const fields = ['user_id', 'trip_id', 'seat_number'];
    const error = [];
    
    fields.forEach(element => validator(element, body, error));
    
    if (error.length > 0) return res.status(400).send({ status: 400, error });
    return next();
  }
}

export default InputDataValidator;
