import { IsEmail, IsEnum, IsString, Length } from 'class-validator';
import { UserStatus } from '../../../types/user-status.enum.js';

export default class CreateUserDto {
  @IsEmail({}, { message: 'email must be valid address' })
  public email!: string;

  @IsString({ message: 'Name is required' })
  @Length(1, 15, { message: 'Min length is 1, max is 15' })
  public name!: string;

  @IsEnum(UserStatus, { message: 'User status must be Casual | Pro' })
  public status!: UserStatus;

  @IsString({ message: 'Password is required' })
  @Length(6, 12, { message: 'Min password length is 6, max is 12' })
  public password!: string;
}
