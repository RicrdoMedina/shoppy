// import React from 'react';
// import FormValidator  from '@core/features/common/FormValidator';
// import { Form } from '@core/components/form/Form';

// const validations = {
//   email: ['required', 'email'],
//   password: [
//     'required',
//     { min: 3, key: 'minLegth' },
//     { max: 15, key: 'maxLegth' }
//   ],
//   simpleselect: ['required', 'email']
// };

// export const ExampleComponent = () => {
//   const formValidator:FormValidator = new FormValidator(validations);
//   const components = [
//     {
//       type: 'email',
//       name: 'email',
//       label: 'Email',
//       initialVal: '',
//       validator: formValidator,
//       handleStatusForm: function() {}
//     },
//     {
//       type: 'password',
//       name: 'password',
//       label: 'Password',
//       initialVal: '',
//       validator: formValidator,
//       handleStatusForm: function() {}
//     },
//     {
//       type: 'simpleselect',
//       name: 'simpleselect',
//       label: 'simpleselect',
//       initialVal: '',
//       validator: formValidator,
//       handleStatusForm: function() {}
//     },
//     {
//       name: 'simpleselect',
//       label: 'simpleselect',
//       initialVal: '',
//       validator: formValidator,
//       handleStatusForm: function() {},
//       type: 'link',
//       url: '/sign-up',
//       text: '¿Aun no tienes una cuenta?'
//     }
//   ];

//   return (
//     <div className="w-full">
//       <div className="container mx-auto">
//         <h1 className="text-3xl mt-8">Formulario</h1>
//         <Form
//           textButton="Entrar"
//           components={components}
//           validator={formValidator}
//           handleSendForm={() => {
//             alert('');
//           }}
//         />
//       </div>
//     </div>
//   );
// };
