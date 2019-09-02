import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import StorageImg from './StorageImg';

const ItemContainer = styled.div`
  height: 170px;
  margin-bottom: 30px;
  box-shadow: 3px 0 13px 0 rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  overflow: hidden;

  .company-link {
    font-size: 13px;
    height: 32px;
    text-transform: uppercase;
    font-weight: bold;
    color: ${({ theme }) => theme.purple};
    text-decoration: none;
  }
`;

const Images = styled.div`
  position: relative;
  width: 210px;
  height: 100%;
  float: left;
  background-image: url(${({ coverImg }) => coverImg});
  background-size: cover;
  background-position: center;

  .logo {
    position: absolute;
    width: 50px;
    height: 50px;
    top: 14px;
    right: -26px;
    border: solid 2px white;
    border-radius: 3px;
  }
`;

const CompanyInfo = styled.div`
  padding: 20px 20px 20px 46px;
  overflow: hidden;
`;

const CompanyName = styled.span`
  display: block;
  font-size: 13px;
  color: ${({ theme }) => theme.deepNavy};
  line-height: 16px;
  text-transform: uppercase;
  font-weight: bold;
`;

const ShortDescription = styled.p`
  margin-bottom: 10px;
  font-size: 12px;
`;

const EmployeeCount = styled.span`
  display: block;
  color: ${({ theme }) => theme.textMedium};
`;

const CompaniListItemExpanded = ({
  company: {
    name,
    employeeCount = '',
    slug = '',
    logoPath = '',
    coverImg = '',
    shortDescription = ''
  } = {},
  jobs = []
}) => (
  <ItemContainer>
    <Images coverImg={coverImg}>
      <StorageImg className="logo" alt={name} path={logoPath} />
    </Images>
    <CompanyInfo>
      <CompanyName>{name}</CompanyName>
      <EmployeeCount>{employeeCount} Employees</EmployeeCount>
      <ShortDescription>{shortDescription}</ShortDescription>
      {jobs.length > 0 && (
        <Link className="company-link" to={'/companies/' + slug}>
          View {jobs.length} job{jobs.length !== 1 && 's'}
        </Link>
      )}
    </CompanyInfo>
  </ItemContainer>
);

export default CompaniListItemExpanded;