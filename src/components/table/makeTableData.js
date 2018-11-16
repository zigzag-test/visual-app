import _ from 'lodash';
import moment from 'moment';
import data from '../../utils/handleData';

const allInfo = _.map(data.groupedAllUsers, item => ({
  date: item[0].date,
  all: item.length,
  ios: _.filter(item, atomic => _.startsWith(atomic.device, 'iOS')).length,
  android: _.filter(item, atomic => _.startsWith(atomic.device, 'Android'))
    .length,
}));

const groupByHour = _.groupBy(allInfo, item => item.date.format('HH'));
const sortByHour = _.sortBy(groupByHour, item => item[0].date.format('HH'));
const addDummy = _.map(sortByHour, (item) => {
  if (item[0].date.format('HH') < 13) {
    item.unshift({
      date: moment()
        .year(2017)
        .month(8)
        .date(20)
        .hour(item[0].date.format('HH')),
    });
  }
  return item;
});

const addTimeTable = _.map(addDummy, (item) => {
  item.unshift({ date: item[0].date.format('A hh') });
  return item;
});

export default {
  addTimeTable,
};
