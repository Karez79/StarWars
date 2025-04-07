import React from 'react';
import Select from 'react-select';
import './Filter.css';

export type FilterOption = 'all' | 'male' | 'female' | 'n/a';

interface Option {
  value: FilterOption;
  label: string;
}

interface FilterProps {
  options: FilterOption[];
  value: FilterOption;
  onChange: (value: FilterOption) => void;
  language: 'en' | 'wookiee';
}

const dictionary: Record<'en' | 'wookiee', Record<FilterOption, string>> = {
  en: {
    all: 'All',
    male: 'Male',
    female: 'Female',
    'n/a': 'N/A',
  },
  wookiee: {
    all: 'Arr...',
    male: 'Scraanwo',
    female: 'Wwoscraanwo',
    'n/a': 'wh/ra',
  },
};

const Filter: React.FC<FilterProps> = ({ options, value, onChange, language }) => {
  const selectOptions: Option[] = options.map((opt) => ({
    value: opt,
    label: dictionary[language][opt],
  }));

  const selectedOption = selectOptions.find((o) => o.value === value);

  const handleChange = (selected: Option | null) => {
    if (selected) onChange(selected.value);
  };

  return (
    <Select
      className={`filter-select ${language === 'wookiee' ? 'filter-select--wookiee' : ''}`}
      classNamePrefix='filter-select'
      options={selectOptions}
      value={selectedOption}
      onChange={handleChange}
      isSearchable={false}
      menuPortalTarget={document.body}
    />
  );
};

export default Filter;
