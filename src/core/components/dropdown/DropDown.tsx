import React from 'react';
import { Link } from 'react-router-dom';
// types
import { DropDownItemInterface } from '@core/features/types/';
// Styles
import styles from './DropDown.scss';
import classNames from 'classnames';

type DropDownProps = {
  title: string;
  list: Array<DropDownItemInterface>;
};

export const DropDown = ({ title, list }: DropDownProps) => {
  return (
    <div className={classNames(styles['c-dropdown'])}>
      <p className="text-base">{title}</p>
      <div className={classNames(styles['c-dropdown__content'])}>
        {list.map((item, i) => {
          if (item.url) {
            return (
              <div
                className={classNames(styles['c-dropdown__content--item'])}
                key={i}>
                <Link to={`/${item.url}`}>{item.name}</Link>
              </div>
            );
          }

          return (
            <div
              className={classNames(styles['c-dropdown__content--item'])}
              onClick={() => item.handleClick()}
              key={i}>
              {item.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};
