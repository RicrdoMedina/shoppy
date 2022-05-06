export interface User {
  id: string;
  avatar?: string;
  username: string;
  name: string;
  lastName: string;
  role: string;
  isSigned: boolean;
  scopes: Array<string>;
}

export interface UserSignUp {
  username: string;
  name: string;
  lastName: string;
  password: string;
}

export interface UserSign {
  username: string;
  password: string;
}

export interface UserDisconnected {
  isSigned: boolean;
}

export interface SignUpApiResponse {
  message: string;
  showMessage: string;
}
