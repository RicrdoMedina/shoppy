import React from 'react';
// styles
import styles from './CircularButton.scss';
import classNames from 'classnames';

type Props = {
  onClick: Function;
  urlImg: string;
  ClassName?: string;
};

export const CircularFillButton = ({ onClick, urlImg, ClassName }: Props) => {
  const handleClick = () => {
    onClick();
  };
  return (
    <div
      className={classNames(styles[`cirular-button`])}
      onClick={() => handleClick()}>
      <div className={classNames(styles[`cirular-button__content`])}>
        <div className={classNames(styles[`icon-container`])}>
          <div
            className={classNames(
              styles[`icon`],
              styles[`icon-fill`],
              ClassName
            )}>
            <img className="w-8 z-20" src={urlImg} />
          </div>
        </div>
      </div>
    </div>
  );
};
