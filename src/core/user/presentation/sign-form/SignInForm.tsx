import React, { useEffect } from 'react';
// Types
import { UserSign } from '../../domain/User';
import {
  InputValuesInterface,
  ComponentFormValidatorInterface
} from '@core/features/types/';
// State
import { CommonUserState, UserState } from '../UserState';
// BLoC
import { useUserBloc } from '@core/bloc/UserBlocContext';
import { BlocBuilder } from '@core/bloc';
// Components
import { Form } from '@core/components/form/Form';
import { RedirectTo } from '@core/features/routes/Redirect';
import { CircularEnterButton } from '@core/components/button/circular-button/CircularEnterButton';
import { CircularFillButton } from '@core/components/button/circular-button/CircularFillButton';
import { CircularCollapseButton } from '@core/components/button/circular-button/CircularCollapseButton';

// Utils
import FormValidator from '@core/features/common/FormValidator';
import { Link } from 'react-router-dom';
import CookieHandlerUtils from '@core/utils/CookieHandlerUtils';

// Images
import LogoFacebook from '../../../assets/images/facebook.svg';
import LogoGoogle from '../../../assets/images/google.svg';
import LogoTwitter from '../../../assets/images/twitter.svg';

// Styles
import styles from './SignInForm.scss';
import classNames from 'classnames';

const validations = {
  username: ['required', 'email'],
  password: [
    'required',
    { min: 3, key: 'minLegth' },
    { max: 15, key: 'maxLegth' }
  ]
};

export const SignInForm = () => {
  const bloc = useUserBloc();

  useEffect(() => {
    CookieHandlerUtils.delete('token');
  }, []);

  const formValidator: FormValidator = new FormValidator(validations);
  const components: Array<ComponentFormValidatorInterface> = [
    {
      type: 'email',
      name: 'username',
      label: 'Username',
      initialVal: '',
      validator: formValidator,
      handleStatusForm: () => undefined,
      hasError: false
    },
    {
      type: 'password',
      name: 'password',
      label: 'Password',
      initialVal: '',
      validator: formValidator,
      handleStatusForm: () => undefined,
      hasError: false
    }
  ];

  const handleSendForm = (): void => {
    const data: InputValuesInterface = formValidator.getValues();

    const user: UserSign = {
      password: data.password,
      username: data.username
    };

    bloc.signIn(user);
  };

  return (
    <BlocBuilder
      bloc={bloc}
      builder={(state: UserState) => {
        const { error } = bloc.state as CommonUserState;
        const isLoading = state.kind === 'LoadingUserState';

        switch (state.kind) {
          case 'SignedUserState': {
            return <RedirectTo url="/home" />;
            break;
          }
          case 'LoadingUserState':
          case 'ErrorUserState':
          case 'SignInUserState': {
            return (
              <div
                className={classNames(
                  styles['sign-in-box'],
                  'flex',
                  'flex-col',
                  'items-center',
                  'justify-center'
                )}>
                <div
                  className={classNames(
                    styles['form-sign-in'],
                    'pt-4',
                    'pb-12',
                    'px-12'
                  )}>
                  <h3 className="w-full text-center text-4xl my-4">Sign In</h3>
                  <Form
                    textButton="LOGIN"
                    components={components}
                    validator={formValidator}
                    handleSendForm={handleSendForm}
                    errors={error}
                    isLoading={isLoading}
                  />
                  <div className="pt-12 p-20">
                    <p className="w-full text-sm text-center">
                      Or Sign Up Using
                    </p>
                    <div className="w-full flex items-center justify-items-center">
                      <div className="w-full icon-google">
                        <a href="/auth/google">
                          <CircularCollapseButton
                            onClick={() => undefined}
                            urlImg={LogoGoogle}
                            ClassName={styles['form-sign-in--icon-google']}
                          />
                        </a>
                      </div>
                      <div className="w-full icon-twitter">
                        <a href="/auth/twitter">
                          <CircularEnterButton
                            onClick={() => undefined}
                            urlImg={LogoTwitter}
                            ClassName={styles['form-sign-in--icon-twitter']}
                          />
                        </a>
                      </div>
                      <div className="w-full icon-facebook">
                        <a href="/auth/facebook">
                          <CircularFillButton
                            onClick={() => undefined}
                            urlImg={LogoFacebook}
                            ClassName={styles['form-sign-in--icon-facebook']}
                          />
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center pt-12 pb-4">
                    <p className="w-full text-sm text-center pb-4">
                      Or Sign Up Using
                    </p>
                    <Link
                      to="/sign-up"
                      className={classNames(
                        styles['form-sign-in--link'],
                        'w-full',
                        'text-sm',
                        'text-center',
                        'cursor-pointer'
                      )}>
                      SIGN UP
                    </Link>
                  </div>
                </div>
              </div>
            );
            break;
          }
          default:
            return <></>;
        }
      }}
    />
  );
};
