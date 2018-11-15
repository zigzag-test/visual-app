import * as d3 from 'd3';
import data from '../../utils/handleData';

const size = {
  width: 1400,
  height: 600,
  margin: 80,
};

const legends = {
  all: {
    name: '전체',
    color: 'blue',
  },
  iOS: {
    name: 'iOS',
    color: 'orange',
  },
  android: {
    name: '안드로이드',
    color: 'red',
  },
};

const allData = data.allUsers;
const iOSData = data.iOSUsers;
const andData = data.androidUsers;

const xMin = d3.min(allData, d => new Date(d.date));
const xMax = d3.max(allData, d => new Date(d.date));
const yMax = d3.max(allData, d => d.users);

const xScale = d3
  .scaleLinear()
  .domain([xMin, xMax])
  .range([0, size.width - size.margin]);
const yScale = d3
  .scaleLinear()
  .domain([0, yMax + 5])
  .range([size.height - size.margin, size.margin]);

const xAxis = d3
  .axisBottom(xScale)
  .ticks(8)
  .tickFormat(d3.timeFormat('%Y년 %m월 %d일 %p %I시'));
const yAxis = d3.axisLeft(yScale).ticks(10);

const line = d3
  .line()
  .x(d => xScale(new Date(d.date)))
  .y(d => yScale(d.users))
  .curve(d3.curveMonotoneX);

export default {
  size,
  legends,
  allData,
  iOSData,
  andData,
  xAxis,
  yAxis,
  line,
};
