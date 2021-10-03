export default interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  role: string;
  birth_date: string;
  cpf: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  birth_date: string;
  cpf: string;
  created_at: Date;
  updated_at: Date;
}
