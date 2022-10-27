const moment = require('moment');

const IS_VALID = '';
const IS_NULL_ERROR = 'Không được để trống';
const IS_INVALID_ERROR = 'Giá trị không hợp lệ';

const isNotNull = (input: any) => {
  if (input !== '') {
    return IS_VALID;
  } else {
    return IS_NULL_ERROR;
  }
};

const isNotSpecialChar = (input: string) => {
  if (input) {
    if (/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(input)) {
      return IS_INVALID_ERROR;
    } else {
      return IS_VALID;
    }
  } else {
    return IS_NULL_ERROR;
  }
};

const isDate = (input: string) => {
  if (input) {
    if (moment(input, 'YYYY/MM/DD', true).isValid()) {
      return IS_VALID;
    } else {
      return IS_INVALID_ERROR;
    }
  } else {
    return IS_NULL_ERROR;
  }
};

const isPhoneNumberVN = (input: string) => {
  if (input) {
    if (/^[0-9]{10}$/.test(input)) {
      return IS_VALID;
    } else {
      return IS_INVALID_ERROR;
    }
  } else {
    return IS_NULL_ERROR;
  }
};

const isInteger = (input: any) => {
  if (input !== '') {
    if (Number(input) >= 0) {
      return IS_VALID;
    } else {
      return IS_INVALID_ERROR;
    }
  } else {
    return IS_NULL_ERROR;
  }
};

const exportFunc = {
  isInteger,
  isPhoneNumberVN,
  isDate,
  isNotSpecialChar,
  isNotNull,
};

export default exportFunc;
