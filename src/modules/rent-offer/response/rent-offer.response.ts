import { Expose } from 'class-transformer';
import { RentType } from '../../../types/rent-type.enum.js';

export default class RentOfferResponse {
  @Expose()
  public rentPrice!: number;

  @Expose()
  public title!: string;

  @Expose()
  public rentType!: RentType;

  @Expose()
  public date!: Date;

  @Expose()
  public city!: string;

  @Expose()
  public preview!: string;

  @Expose()
  public premium!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public commentNumber!: number;
}
