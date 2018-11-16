import _ from 'lodash';
import moment from 'moment';
import users from '../assets/users';

const standardTime = '2017-09-27T13:00:00+09:00';
const timeFormat = 'YYYY-MM-DDTHH:00:00+09:00';
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
const dropDate = (arr, stdTime) => {
  const stdMoment = moment(stdTime);
  const startTime = stdMoment.subtract(7, 'days');
  const dropLeft = _.dropWhile(
    arr,
    item => item.date.format(timeFormat) !== startTime.format(timeFormat),
  );
  return _.dropWhile(
    dropLeft,
    item => item.date.format(timeFormat) !== stdMoment.format(timeFormat),
  );
};

const groupUsersPerHours = arr => _.groupBy(arr, item => item.date.format(timeFormat));
const sumUsersNum = obj => _.map(obj, item => ({
  users: item.length,
  date: item[0].date.format(timeFormat),
}));
const makeGroupedUsers = (data, stdTime) => {
  const sortedByDate = sortByDate(data);
  const convertedDate = convertUnixToMoment(sortedByDate);
  const droppedDate = dropDate(convertedDate, stdTime);
  return groupUsersPerHours(droppedDate);
};

const iOSFiltered = filterByDevice(rawData, deviceTypes.iOS);
const androidFiltered = filterByDevice(rawData, deviceTypes.android);

const groupedAllUsers = makeGroupedUsers(rawData, standardTime);

const allUsers = sumUsersNum(groupedAllUsers);
const iOSUsers = sumUsersNum(makeGroupedUsers(iOSFiltered, standardTime));
const androidUsers = sumUsersNum(
  makeGroupedUsers(androidFiltered, standardTime),
);

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
