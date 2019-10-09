import React from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

const LogoContainer = styled.div`
  display: block;
  margin-right: 30px;
  text-decoration: none;

  .logo-link {
    display: block;
    text-decoration: none;
  }
`;

const LogoText = styled.span`
  flex: 0;
  font-family: 'Montserrat', sans-serif;
  font-size: 22px;
  font-weight: 700;
  text-transform: uppercase;
  color: white;
`;

const Logo = () => (
  <LogoContainer>
    <Link className="logo-link" to="/">
      <LogoText>sparkGNV</LogoText>
    </Link>
  </LogoContainer>
);

export default Logo;