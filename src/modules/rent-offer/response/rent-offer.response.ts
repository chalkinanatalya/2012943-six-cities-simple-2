import { Expose, Type } from 'class-transformer';
import { CityType } from '../../../types/city-type.enum.js';
import { RentType } from '../../../types/rent-type.enum.js';
import UserResponse from '../../user/response/user.response.js';

export default class RentOfferResponse {
  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose({ name: 'createdAt' })
  public date!: Date;

  @Expose()
  public city!: CityType;

  @Expose()
  public preview!: string;

  @Expose()
  public photos!: string[];

  @Expose()
  public premium!: boolean;

  @Expose()
  public rentType!: RentType[];

  @Expose()
  public rooms!: number;

  @Expose()
  public guests!: number;

  @Expose()
  public rentPrice!: number;

  @Expose()
  public amenities!: string[];

  @Expose()
  public commentNumber!: number;

  @Expose()
  public latitude!: string;

  @Expose()
  public longitude!: string;

  @Expose({ name: 'userId' })
  @Type(() => UserResponse)
  public user!: UserResponse;
}
