import React from 'react';
import { Link } from 'react-router-dom';

// Styled
import Styled from './Header.styled';

const Header = () => (
  <Styled.HeaderFlexWrapper>
    <Link to="/graph">Graph</Link>
    <Link to="/table">Table</Link>
  </Styled.HeaderFlexWrapper>
);

export default Header;
