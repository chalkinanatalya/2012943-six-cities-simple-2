import typegoose, { defaultClasses, getModelForClass, Ref } from '@typegoose/typegoose';
import { AmenitiesList } from '../../types/amenities-list.enum.js';
import { CityType } from '../../types/city-type.enum.js';
import { RentType } from '../../types/rent-type.enum.js';
import { UserEntity } from '../user/user.entity.js';

const { prop, modelOptions } = typegoose;

export interface OfferEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})

export class RentOfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public title!: string;

  @prop({ trim: true, required: true })
  public description!: string;

  @prop()
  public date!: Date;

  @prop({
    type: String,
    enum: CityType
  })
  public city!: CityType;

  @prop()
  public preview!: string;

  @prop()
  public photos!: string[];

  @prop()
  public premium!: boolean;

  @prop()
  public rating!: number;

  @prop({
    type: String,
    enum: RentType
  })
  public rentType!: RentType;

  @prop()
  public rooms!: number;

  @prop()
  public guests!: number;

  @prop()
  public rentPrice!: number;

  @prop({
    type: String,
    enum: AmenitiesList,
    required: true,
    default: []
  })
  public amenities!: AmenitiesList[];

  @prop({ default: 0 })
  public commentNumber!: number;

  @prop()
  public latitude!: string;

  @prop()
  public longitude!: string;

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;
}

export const RentOfferModel = getModelForClass(RentOfferEntity);

