// tslint:disable: no-any
import {
  ErrorsInterface,
  FieldsInterface,
  HandleValidationInterface,
  RegexInterface,
  SchemaFieldInterface,
  ValidationsInterface,
  InputValuesInterface
} from '@core/features/types/';

export default class FormValidator {
  constructor(validations: ValidationsInterface) {
    this.validations = validations;
    this.init();
  }

  public getField(nameField: string): SchemaFieldInterface {
    return this.fields[nameField];
  }

  public getValues(): InputValuesInterface {
    return this.getData();
  }

  public applyValidation(
    nameField: string,
    labelField: string,
    val: string | number
  ): SchemaFieldInterface {
    this.nameField = nameField;
    this.fields[nameField].val = val;

    this.fields[nameField].label = labelField;

    const validations = this.fields[nameField].applyValidation;

    if (validations.length > 0) {
      const self = this;

      validations.forEach(function(validation: any) {
        if (!self.breack) {
          self.processValidation(validation);
        }
      });
    } else {
      this.fields[nameField].isValid = true;
      this.fields[nameField].message = '';
    }

    this.breack = false;

    this.getFormIsCompleted();

    return this.fields[nameField];
  }

  public isCompleted(): boolean {
    return this.formIsCompleted;
  }

  public setErrors(errors: ErrorsInterface): void {
    this.processErrors(errors);
  }

  private validations: ValidationsInterface;

  private fields: FieldsInterface;

  private schemaField: SchemaFieldInterface = {
    val: '',
    message: '',
    label: '',
    isValid: false,
    name: '',
    applyValidation: []
  };

  private nameField: string = '';

  private breack: boolean = false;

  private formIsCompleted: boolean = false;

  private init() {
    this.formattedFields(this.validations);

    return this;
  }

  private getRegex(key: string): RegExp {
    const regex: RegexInterface = {
      email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, // tslint:disable-line
      number: /^[0-9]+$/,
      string: /^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$/
    };
    return regex[key];
  }

  private getData(): InputValuesInterface {
    const data: FieldsInterface = {};

    const fields = this.fields;

    Object.keys(fields).map((key: string) => {
      data[key] = fields[key].val;
    });

    return data;
  }

  private getFormIsCompleted(): void {
    const fields = this.fields;
    let isCompleted: boolean = true;

    Object.keys(fields).map(key => {
      const field = fields[key];
      if (isCompleted) {
        isCompleted = field.isValid;
      }
    });

    this.formIsCompleted = isCompleted;
  }

  private formattedFields(validations: FieldsInterface): void {
    const fields: FieldsInterface = {};

    Object.keys(validations).map(key => {
      const applyValidation = validations[key];

      const name = key;
      let formattedField: ValidationsInterface;
      formattedField =
        applyValidation.length > 0
          ? { ...this.schemaField, applyValidation, name }
          : { ...this.schemaField, applyValidation, name, isValid: true };
      fields[key] = formattedField;
    });

    this.fields = fields;
  }

  private processValidation(validation: any): void {
    const self = this;

    const key = typeof validation === 'object' ? validation.key : validation;
    const handleValidation: HandleValidationInterface = {
      required: function() {
        self.validateValue();
      },
      email: function() {
        self.validateEmail();
      },
      minLegth: function() {
        self.validateMinLegth(validation);
      },
      maxLegth: function() {
        self.validateMaxLegth(validation);
      },
      string: function name() {
        self.validateString();
      }
    };
    handleValidation[key]();
  }

  private validateMaxLegth(validation: any): void {
    const nameField = this.nameField;
    const field = this.fields[nameField];
    const label = field.label;
    const val = this.fields[nameField].val;
    const max = 'max' in validation ? Number(validation.max) : 0;

    if (val.length > max) {
      field.isValid = false;
      field.message = `El campo ${label} debe ser menor que ${max} caracteres`;
      this.fields[nameField] = field;
      this.breack = true;
    } else {
      field.isValid = true;
      field.message = '';
      this.fields[nameField] = field;
      this.breack = false;
    }
  }

  private validateMinLegth(validation: any): void {
    const nameField = this.nameField;
    const field = this.fields[nameField];
    const label = field.label;
    const val = this.fields[nameField].val;
    const min = 'min' in validation ? Number(validation.min) : 0;

    if (val.length < min) {
      field.isValid = false;
      field.message = `El campo ${label} debe tener al menos ${min} caracteres`;
      this.fields[nameField] = field;
      this.breack = true;
    } else {
      field.isValid = true;
      field.message = '';
      this.fields[nameField] = field;
      this.breack = false;
    }
  }

  private validateValue(): void {
    const nameField = this.nameField;
    const field = this.fields[nameField];
    const label = field.label;
    const val = field.val;

    if (!val) {
      field.isValid = false;
      field.message = `El campo ${label} es requerido`;
      this.fields[nameField] = field;
      this.breack = true;
    } else {
      field.isValid = true;
      field.message = '';
      this.fields[nameField] = field;
      this.breack = false;
    }
  }

  private validateString(): void {
    const nameField = this.nameField;
    const field = this.fields[nameField];
    const val = field.val;
    const regex = this.getRegex('string');

    if (!regex.test(val)) {
      field.isValid = false;
      field.message = 'Solo se permiten letras';
      this.fields[nameField] = field;
      this.breack = true;
    } else {
      field.isValid = true;
      field.message = '';
      this.fields[nameField] = field;
      this.breack = false;
    }
  }

  private validateEmail(): void {
    const nameField = this.nameField;
    const field = this.fields[nameField];
    const label = field.label;
    const val = field.val;
    const regex = this.getRegex('email');

    if (!regex.test(String(val).toLowerCase())) {
      field.isValid = false;
      field.message = `El campo ${label} es incorrecto`;
      this.fields[nameField] = field;
      this.breack = true;
    } else {
      field.isValid = true;
      field.message = '';
      this.fields[nameField] = field;
      this.breack = false;
    }
  }

  private formattedMessage(
    field: SchemaFieldInterface,
    messageServer: string
  ): string {
    const regex = new RegExp('^.*(allowed to be empty|required).*');
    const fieldLabel = field.label ? field.label : '';

    if (!field.val || regex.test(messageServer)) {
      return `Este campo ${fieldLabel} es requerido`;
    } else {
      return `El campo ${fieldLabel} es incorrecto`;
    }
  }

  private processErrors(errors: ErrorsInterface): void {
    const fields = this.fields;
    const fieldNameWithError = errors.field;
    const messageServer = errors.message;

    Object.keys(fields).map(key => {
      const field = fields[key];
      const fieldName = field.name;

      if (fieldName === fieldNameWithError) {
        field.message = this.formattedMessage(field, messageServer);
        field.isValid = false;
        fields[fieldName] = field;
      }
    });

    this.fields = fields;
  }
}
