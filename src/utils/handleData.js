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
const dropWhileDate = arr => _.dropWhile(
  arr,
  item => item.date.format('YYYY-MM-DDTHH:00:00+09:00')
      !== '2017-09-20T13:00:00+09:00',
);
const groupUsersPerHours = arr => _.groupBy(arr, item => item.date.format('YYYY-MM-DDTHH'));
const calcUsersNum = obj => _.map(obj, item => ({
  users: item.length,
  date: item[0].date.format('YYYY-MM-DDTHH:00:00+09:00'),
}));

const iOSFiltered = filterByDevice(rawData, deviceTypes.iOS);
const androidFiltered = filterByDevice(rawData, deviceTypes.android);

const allUsersConvertedDate = convertUnixToMoment(sortByDate(rawData));
const iOSUsersConvertedDate = convertUnixToMoment(sortByDate(iOSFiltered));
const androidUsersConvertedDate = convertUnixToMoment(
  sortByDate(androidFiltered),
);

const allUsersPerHours = groupUsersPerHours(
  dropWhileDate(allUsersConvertedDate),
);
const iOSUsersPerHours = groupUsersPerHours(
  dropWhileDate(iOSUsersConvertedDate),
);
const androidUsersPerHours = groupUsersPerHours(
  dropWhileDate(androidUsersConvertedDate),
);

const allUsers = calcUsersNum(allUsersPerHours);
const iOSUsers = calcUsersNum(iOSUsersPerHours);
const androidUsers = calcUsersNum(androidUsersPerHours);

export default {
  rawData,
  deviceTypes,
  filterByDevice,
  sortByDate,
  convertUnixToMoment,
  groupUsersPerHours,
  calcUsersNum,
  allUsersPerHours,
  allUsers,
  iOSUsers,
  androidUsers,
};
