import { Expose } from 'class-transformer';
import { UserStatus } from '../../../types/user-status.enum.js';

export default class UserResponse {
  @Expose()
  public email!: string;

  @Expose()
  public avatar!: string;

  @Expose()
  public name!: string;

  @Expose()
  public status!: UserStatus;
}
