import Moment from 'moment';

const truncate = (input: string, limit: number, dot: boolean) => {
  if (input.length > 5) {
    return input.substring(0, limit) + (dot ? '...' : '');
  }
  return input;
};

const money = (input: number) => {
  return input
    ? input.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '₫'
    : '';
};

const dateJS = (input: string) => {
  return input ? Moment(input).format('DD/MM/YYYY') : '';
};

const dateTimeJS = (input: string) => {
  return input ? Moment(input).format('DD/MM/YYYY hh:mm:ss') : '';
};

const dateMySQL = (input: string) => {
  return Moment(input).format('YYYY/MM/DD');
};

const exportFunc = {
  truncate,
  money,
  dateMySQL,
  dateJS,
  dateTimeJS,
};

export default exportFunc;
