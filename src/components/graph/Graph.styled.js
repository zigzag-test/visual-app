import styled from 'styled-components';
import basic from '../../basic.styled';
import makeChart from './makeChart';

const SVGFlexWrapper = styled(basic.BasicFlexWrapper)`
  justify-content: center;
  align-items: center;
`;

const SVGChart = styled.svg.attrs({
  id: 'chart',
})`
  width: ${makeChart.size.width}px;
  height: ${makeChart.size.height}px;
`;

const SVGLegend = styled.svg.attrs({
  className: 'legend',
})`
  width: 100px;
  height: 100px;
`;

export default {
  SVGFlexWrapper,
  SVGChart,
  SVGLegend,
};
