import typegoose, { defaultClasses, getModelForClass, Ref } from '@typegoose/typegoose';
import { RentOfferEntity } from '../rent-offer/rent-offer.entity.js';
import { UserEntity } from '../user/user.entity.js';

const { prop, modelOptions } = typegoose;

export interface CommentEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public text!: string;

  @prop({
    ref: RentOfferEntity,
    required: true
  })
  public rentOfferId: Ref<RentOfferEntity>;

  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId!: Ref<UserEntity>;

  @prop({
    required: true
  })
  public rating!: number;
}

export const CommentModel = getModelForClass(CommentEntity);
