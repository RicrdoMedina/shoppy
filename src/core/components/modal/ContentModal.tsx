import React, { useEffect, useState } from 'react';
// Context
import { useModalBloc } from '@core/bloc/ModalBlocContext';
// Components
import { ComponentCollection } from './ComponentCollection';
import { SimpleButton } from '@core/components/button/simple-button/SimpleButton';
import { SvgClose } from '@core/components/svg/svg-close/SvgClose';
// types
import { ModalInterface } from '@core/features/types/';
// Styles
import classNames from 'classnames';
import styles from './Modal.scss';

export const ContentModal = ({
  open,
  fadeOut,
  contentModal = {
    title: '',
    component: { config: { img: '', text: '' }, name: 'confirmation' },
    buttonCancel: { callback: () => undefined, title: 'Cancelar' },
    buttonSuccess: { callback: () => undefined, title: 'Aceptar' }
  }
}: ModalInterface) => {
  const bloc = useModalBloc();

  const [showLines, setShowLines] = useState<boolean>(false);
  const [closeModal, setCloseModal] = useState<boolean>(false);

  const callbackCancelButton = contentModal?.buttonCancel
    ? contentModal.buttonCancel.callback
    : () => undefined;
  const callbackSuccessButton = contentModal?.buttonSuccess
    ? contentModal.buttonSuccess.callback
    : () => undefined;

  useEffect(() => {
    setShowLines(true);

    setTimeout(() => {
      setShowLines(false);
    }, 1000);
  }, [closeModal]);

  useEffect(() => {
    if (fadeOut) {
      handleCloseModal();
    }
  }, [fadeOut]);

  const handleCloseModal = () => {
    setCloseModal(true);

    setTimeout(() => {
      bloc.closeModal();
    }, 1000);
  };

  return (
    <div className="w-full">
      <div className={classNames(styles[`overlay-glass-effect`], 'z-30')} />
      <div className={styles[`modal-overlay`]}>
        <div
          className={classNames(
            styles[`modal-custom`],
            { [`${styles[`active`]}`]: open },
            { [`${styles[`out`]}`]: closeModal },
            'flex',
            'flex-col',
            'w-full',
            'h-full',
            'fixed',
            'z-40',
            'inset-0',
            'items-center',
            'justify-center'
          )}>
          <div
            className={classNames(
              styles[`modal-custom-background`],
              'flex',
              'flex-col',
              'items-center',
              'justify-center',
              'rounded-lg',
              'overflow-hidden',
              'w-11/12',
              'md:w-3/6',
              'lg:w-3/6',
              'xl:w-4/12'
            )}>
            <div
              className={classNames(
                styles[`modal-custom-background__modal`],
                'flex',
                'flex-col',
                'items-center',
                'justify-start',
                'bg-white',
                'relative',
                'rounded-lg',
                ' w-full'
              )}>
              {showLines && (
                <svg
                  className={classNames(
                    styles[`modal-custom-background__modal--svg`]
                  )}
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  preserveAspectRatio="none">
                  <rect
                    x="0"
                    y="0"
                    fill="none"
                    width="100%"
                    height="100%"
                    rx="3"
                    ry="3"
                  />
                </svg>
              )}

              <div
                className={classNames(
                  styles[`modal-custom-background__modal--close`],
                  'absolute',
                  'w-full',
                  'z-20'
                )}>
                <span
                  className="absolute outline-none cursor-pointer flex items-center justify-center h-6 w-6"
                  onClick={() => handleCloseModal()}>
                  <SvgClose />
                </span>
              </div>
              {contentModal.title && (
                <div
                  className={classNames(
                    styles[`modal-custom-background__modal--header`],
                    'w-full'
                  )}>
                  {!fadeOut && (
                    <h3 className="w-full text-3xl text-center px-4">
                      {contentModal.title}
                    </h3>
                  )}
                </div>
              )}
              <div
                className={classNames(
                  styles[`modal-custom-background__modal--content`],
                  'w-full'
                )}>
                {!fadeOut && (
                  <ComponentCollection
                    name={contentModal.component.name}
                    config={contentModal.component.config}
                  />
                )}
              </div>
              <div
                className={classNames(
                  styles[`modal-custom-background__modal--footer`],
                  'w-full'
                )}>
                <div className="w-full flex justify-center items-center">
                  {!fadeOut &&
                    contentModal?.buttonCancel &&
                    contentModal.buttonCancel.title && (
                      <div className="mr-4">
                        <SimpleButton
                          title={contentModal.buttonCancel.title}
                          onClick={() => {
                            callbackCancelButton();
                          }}
                          ClassName={styles[`simple-button--cancel`]}
                          size="s-md"
                        />
                      </div>
                    )}
                  {!fadeOut &&
                    contentModal?.buttonSuccess &&
                    contentModal.buttonSuccess.title && (
                      <div className="ml-4">
                        <SimpleButton
                          title={contentModal.buttonSuccess.title}
                          onClick={() => {
                            callbackSuccessButton();
                          }}
                          ClassName={styles[`simple-button--success`]}
                          size="s-md"
                        />
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
