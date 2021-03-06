import _ from 'lodash';
import React, { useState, useContext } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../../../firebase';
import AppContext from '../../AppContext';
import SearchInput from '../UI/SearchInput';
import {
  Filter,
  FilterItem,
  FilterItemCustom,
  onFilterChange
} from '../UI/Filter';
import styled from 'styled-components/macro';

const Label = styled.p`
  font-family: Arial, sans-serif;
  color: rgba(19, 21, 22, 0.6);
  font-size: 14px;
  text-align: right;
`;

const noop = () => {};

const JobsFilter = ({ onChange = noop, filteredCount }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const { companies, companiesLoading } = useContext(AppContext);
  const [categoriesValue, categoriesLoading, categoriesError] = useCollection(
    db.collection('jobCategories')
  );

  if (categoriesLoading || categoriesError || companiesLoading) {
    return false;
  }
  const categoriesSrc = categoriesValue.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  const renderCategories = _.filter(
    categoriesSrc,
    category => !category.parentID
  );

  const onCategoryChange = onFilterChange(
    selectedCategories,
    setSelectedCategories,
    categories => onChange({ categories })
  );

  const onCompanyChange = onFilterChange(
    selectedCompanies,
    setSelectedCompanies,
    companies => onChange({ companies })
  );

  const onTypeChange = onFilterChange(selectedTypes, setSelectedTypes, types =>
    onChange({ types })
  );

  let categoriesBtnLabel = 'Categories';
  if (selectedCategories.length) {
    categoriesBtnLabel += ` (${selectedCategories.length})`;
  }

  let companiesBtnLabel = 'Companies';
  if (selectedCompanies.length) {
    companiesBtnLabel += ` (${selectedCompanies.length})`;
  }

  return (
    <Filter>
      <FilterItem
        label={categoriesBtnLabel}
        title="Job Categories"
        items={renderCategories}
        selectedItems={selectedCategories}
        onChange={onCategoryChange}
      />

      <FilterItem
        label={companiesBtnLabel}
        title="Companies"
        items={companies}
        selectedItems={selectedCompanies}
        onChange={onCompanyChange}
      />

      <FilterItem
        label="Type"
        title="Job Type"
        items={[
          { name: 'Full Time', id: 'fullTime' },
          { name: 'Part Time', id: 'partTime' }
        ]}
        selectedItems={selectedTypes}
        onChange={onTypeChange}
      />

      <FilterItemCustom>
        <SearchInput
          placeholder="Search Jobs"
          name="filter"
          onChange={value => onChange({ search: value })}
        />
      </FilterItemCustom>

      <FilterItemCustom full>
        <Label>
          {filteredCount} {filteredCount !== 1 ? 'Jobs' : 'Job'}
        </Label>
      </FilterItemCustom>
    </Filter>
  );
};

export default JobsFilter;
