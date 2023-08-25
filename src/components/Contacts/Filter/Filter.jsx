import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { Title, Input, FilterCOntainer } from './filter.styled';

export const Filter = ({ handleChange }) => {
  const filterUniqueId = nanoid(10);

  return (
    <FilterCOntainer>
      <Title>Find contacts by name</Title>
      <label htmlFor={filterUniqueId}></label>
      <Input id={filterUniqueId} type="text" onChange={handleChange} />
    </FilterCOntainer>
  );
};

Filter.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
