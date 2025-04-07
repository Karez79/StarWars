import React from 'react';
import './Pagination.css';

interface PaginationProps {
  onLoadMore: () => void;
  disabled: boolean;
  language: 'en' | 'wookiee';
}

const Pagination: React.FC<PaginationProps> = ({ onLoadMore, disabled, language }) => {
  const btnText = language === 'wookiee' ? 'rcwochuanaoc' : 'Load more';
  return (
    <div className='pagination'>
      <button className='pagination__button' onClick={onLoadMore} disabled={disabled}>
        {btnText}
      </button>
    </div>
  );
};

export default Pagination;
