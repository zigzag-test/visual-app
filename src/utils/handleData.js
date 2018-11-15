import _ from 'lodash';
import moment from 'moment';
import users from '../assets/users';

const rawData = users;
const deviceTypes = {
  iOS: 'iOS',
  android: 'Android',
};

const filterByDevice = (data, device) => _.filter(data, item => _.startsWith(item.device, device));
const sortByDate = arr => _.sortBy(arr, item => item.date);
const convertUnixToMoment = arr => _.map(arr, item => ({
  date: moment(item.date),
  device: item.device,
}));
const groupUsersPerHours = arr => _.groupBy(arr, item => item.date.format('YYYY-MM-DDTHH'));
const calcUsersNum = obj => _.map(obj, item => ({
  users: item.length,
  date: item[0].date.format('YYYY-MM-DDTHH:00:00+09:00'),
}));
const dropWhileDate = obj => _.dropWhile(obj, item => item.date !== '2017-09-20T12:00:00+09:00');

const iOSFiltered = filterByDevice(rawData, deviceTypes.iOS);
const androidFiltered = filterByDevice(rawData, deviceTypes.android);

const allUsersConvertedDate = convertUnixToMoment(sortByDate(rawData));
const iOSUsersConvertedDate = convertUnixToMoment(sortByDate(iOSFiltered));
const androidUsersConvertedDate = convertUnixToMoment(
  sortByDate(androidFiltered),
);

const allUsersPerHours = calcUsersNum(
  groupUsersPerHours(allUsersConvertedDate),
);
const iOSUsersPerHours = calcUsersNum(
  groupUsersPerHours(iOSUsersConvertedDate),
);
const androidUsersPerHours = calcUsersNum(
  groupUsersPerHours(androidUsersConvertedDate),
);

const allUsers = dropWhileDate(allUsersPerHours);
const iOSUsers = dropWhileDate(iOSUsersPerHours);
const androidUsers = dropWhileDate(androidUsersPerHours);

export default {
  rawData,
  deviceTypes,
  filterByDevice,
  sortByDate,
  convertUnixToMoment,
  groupUsersPerHours,
  calcUsersNum,
  allUsers,
  iOSUsers,
  androidUsers,
};
