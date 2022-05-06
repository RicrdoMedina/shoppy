import React from 'react';
// components
import { SvgSearch } from '@core/components/svg/svg-search/SvgSearch';
// styles
import styles from './InputSearch.scss';
import classNames from 'classnames';

export const InputSearch = () => {
  return (
    <div
      className={classNames(
        styles[`input-search`],
        'flex',
        'items-center',
        'justify-around',
        'h-10',
        'w-full'
      )}>
      <div
        className={classNames(
          styles[`input-search`],
          'content-field',
          'flex',
          'items-center',
          'w-full',
          'h-full',
          'relative'
        )}>
        <span className="absolute">
          <SvgSearch />
        </span>
        <input
          className={classNames(
            styles[`input-search__content-field--input`],
            'w-full',
            'h-full',
            'pl-12',
            'pr-4'
          )}
          type="text"
        />
      </div>
    </div>
  );
};
