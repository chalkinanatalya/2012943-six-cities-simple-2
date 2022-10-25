import { User } from '../../types/user.type';
import typegoose, { defaultClasses, getModelForClass } from '@typegoose/typegoose';
import { UserStatus } from '../../types/user-status.enum.js';
import { createSHA256 } from '../../utils/common.js';

const { prop, modelOptions } = typegoose;

export interface UserEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})

export class UserEntity extends defaultClasses.TimeStamps implements User {
  constructor(data: User) {
    super();

    this.email = data.email;
    this.avatar = data.avatar;
    this.name = data.name;
    this.status = data.status;
  }

  @prop({ unique: true, required: true })
  public email!: string;

  @prop({ default: '../../../markup/img/avatar-angelina.jpg' })
  public avatar!: string;

  @prop({ required: true, default: '' })
  public name!: string;

  @prop({
    type: () => String,
    enum: UserStatus,
    required: true,
    default: ''
  })
  public status!: UserStatus;

  @prop({ required: true, default: '' })
  private password!: string;

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
