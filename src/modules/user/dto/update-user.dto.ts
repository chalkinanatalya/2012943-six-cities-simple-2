import { UserStatus } from '../../../types/user-status.enum.js';

export default class UpdateUserDto {
  public avatarPath?: string;
  public name?: string;
  public status?: UserStatus;
}
