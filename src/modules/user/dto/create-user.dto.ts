import { UserStatus } from '../../../types/user-status.enum.js';

export default class CreateUserDto {
  public email!: string;
  public avatar!: string;
  public name!: string;
  public status!: UserStatus;
  public password!: string;
}
