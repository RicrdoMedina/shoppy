import React from 'react';
//  Styles
import styles from './CardContainer.scss';
import classNames from 'classnames';

type CardContainerProps = {
  title?: string;
  children: React.ReactNode;
  ClassName?: string;
  withBg?: boolean;
};

export const CardContainer: React.FC<CardContainerProps> = ({
  children,
  title = '',
  ClassName = '',
  withBg = false
}): JSX.Element => {
  return (
    <div
      className={classNames(
        styles[`card-container`],
        { [`${styles[`bg-card`]}`]: withBg },
        ClassName,
        'w-full'
      )}>
      {title && !withBg && (
        <h2
          className={classNames(
            styles[`title`],
            'w-full',
            'text-left',
            'text-3xl',
            'mb-8'
          )}>
          {title}
        </h2>
      )}
      {children}
    </div>
  );
};
