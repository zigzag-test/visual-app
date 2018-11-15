import _ from 'lodash';
import React from 'react';
import * as d3 from 'd3';
import makeChart from './makeChart';

// Styled
import Styled from './Graph.styled';

class Graph extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      svgChart: null,
      svgLegend: null,
    };

    this.setChartRef = (ref) => {
      this.setState({ svgChart: d3.select(ref) }, () => this.renderChart());
    };

    this.setLegendRef = (ref) => {
      this.setState({ svgLegend: d3.select(ref) }, () => this.renderLegend());
    };
  }

  renderChart() {
    const { svgChart } = this.state;
    const {
      size,
      legends,
      allData,
      iOSData,
      andData,
      xAxis,
      yAxis,
      line,
    } = makeChart;

    svgChart
      .append('g')
      .attr(
        'transform',
        `translate(${size.margin}, ${size.height - size.margin})`,
      )
      .call(xAxis);

    svgChart
      .append('g')
      .attr('transform', `translate(${size.margin}, 0)`)
      .call(yAxis);

    svgChart
      .append('path')
      .datum(allData)
      .attr('fill', 'none')
      .attr('stroke', legends.all.color)
      .attr('transform', `translate(${size.margin}, 0)`)
      .attr('d', line);

    svgChart
      .append('path')
      .datum(iOSData)
      .attr('fill', 'none')
      .attr('stroke', legends.iOS.color)
      .attr('transform', `translate(${size.margin}, 0)`)
      .attr('d', line);

    svgChart
      .append('path')
      .datum(andData)
      .attr('fill', 'none')
      .attr('stroke', legends.android.color)
      .attr('transform', `translate(${size.margin}, 0)`)
      .attr('d', line);
  }

  renderLegend() {
    const { svgLegend } = this.state;
    const { legends } = makeChart;
    const legendArr = _.map(legends, item => item.name);
    const colorArr = _.map(legends, item => item.color);

    const legend = svgLegend
      .selectAll('.legend')
      .data(legendArr)
      .enter()
      .append('g')
      .attr('transform', (d, i) => `translate(0, ${i * 20 + 10})`);

    legend
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 10)
      .attr('height', 10)
      .style('fill', (d, i) => colorArr[i]);

    legend
      .append('text')
      .attr('x', 20)
      .attr('y', 10)
      .text(d => d)
      .style('text-anchor', 'start');
  }

  render() {
    return (
      <Styled.SVGFlexWrapper>
        <Styled.SVGChart ref={this.setChartRef} />
        <Styled.SVGLegend ref={this.setLegendRef} />
      </Styled.SVGFlexWrapper>
    );
  }
}

export default Graph;
