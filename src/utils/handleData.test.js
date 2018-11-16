import _ from 'lodash';
import moment from 'moment';
import data from './handleData';

const mockData = [
  { date: 1505847859000, device: 'iOS 10.0' },
  { date: 1505894685000, device: 'Android 5.0' },
  { date: 1505647500000, device: 'iOS 10.0' },
  { date: 1506318472000, device: 'Android 4.4' },
  { date: 1506160041000, device: 'Android 4.4' },
  { date: 1506059609000, device: 'Android 5.0' },
  { date: 1506213155000, device: 'iOS 10.0' },
  { date: 1506087678000, device: 'iOS 10.0' },
  { date: 1506180277000, device: 'Android 5.0' },
  { date: 1505742851000, device: 'iOS 10.0' },
];

const numOfDevice = {
  total: 10,
  iOS: 5,
  android: 5,
};

describe('handleData', () => {
  test('filterByDevice: iOS', () => {
    const result = data.filterByDevice(mockData, data.deviceTypes.iOS);
    expect(result.length).toEqual(numOfDevice.iOS);
    expect(_.startsWith(result[0].device, data.deviceTypes.iOS)).toEqual(true);
  });

  test('filterByDevice: android', () => {
    const result = data.filterByDevice(mockData, data.deviceTypes.android);
    expect(result.length).toEqual(numOfDevice.android);
    expect(_.startsWith(result[0].device, data.deviceTypes.android)).toEqual(
      true,
    );
  });

  test('sortByDate', () => {
    const result = data.sortByDate(mockData);
    expect(result[0].date).toBeLessThan(result[1].date);
    expect(result[8].date).toBeLessThan(result[9].date);
  });

  test('convertUnixToMoment', () => {
    const result = data.convertUnixToMoment(mockData);
    expect(typeof result[0].date).toEqual(typeof moment());
  });

  test('groupUsersPerHours', () => {
    const convertedData = data.convertUnixToMoment(mockData);
    const result = data.groupUsersPerHours(convertedData);
    expect(Object.keys(result)[0]).toEqual('2017-09-20T04:00:00+09:00');
  });

  test('sumUsersNum', () => {
    const convertedData = data.convertUnixToMoment(mockData);
    const groupedData = data.groupUsersPerHours(convertedData);
    const result = data.sumUsersNum(groupedData);
    expect(result[0].date).toEqual('2017-09-20T04:00:00+09:00');
  });
});
