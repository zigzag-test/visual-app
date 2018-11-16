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
const sumUsersNum = obj => _.map(obj, item => ({
  users: item.length,
  date: item[0].date.format('YYYY-MM-DDTHH:00:00+09:00'),
}));
const makeGroupedUsers = (data) => {
  const sortedByDate = sortByDate(data);
  const convertedDate = convertUnixToMoment(sortedByDate);
  return groupUsersPerHours(convertedDate);
};

const iOSFiltered = filterByDevice(rawData, deviceTypes.iOS);
const androidFiltered = filterByDevice(rawData, deviceTypes.android);

const groupedAllUsers = makeGroupedUsers(rawData);

const allUsers = sumUsersNum(groupedAllUsers);
const iOSUsers = sumUsersNum(makeGroupedUsers(iOSFiltered));
const androidUsers = sumUsersNum(makeGroupedUsers(androidFiltered));

export default {
  rawData,
  deviceTypes,
  filterByDevice,
  sortByDate,
  convertUnixToMoment,
  groupUsersPerHours,
  sumUsersNum,
  groupedAllUsers,
  allUsers,
  iOSUsers,
  androidUsers,
};
