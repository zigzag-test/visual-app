import styled from 'styled-components';
import basic from '../../basic.styled';

const HeaderFlexWrapper = styled(basic.BasicFlexWrapper)`
  justify-content: center;
  height: 1.5rem;
  padding: 1.5rem;
  border-bottom: 1px solid lightgray;
  margin-bottom: 5rem;

  a {
    text-decoration: none;
    color: black;
    margin: 0 1rem;

    :hover,
    :focus {
      border-bottom: 4px solid lightgray;
    }
  }
`;

export default {
  HeaderFlexWrapper,
};
