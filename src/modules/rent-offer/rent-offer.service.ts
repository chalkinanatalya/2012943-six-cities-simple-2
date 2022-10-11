import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../types/component.type.js';
import { SortType } from '../../types/sort-type.enum.js';
import CreateRentOfferDto from './dto/create-rent-offer.dto.js';
import { DEFAULT_RENT_OFFER_COUNT } from './dto/rent-offer.constant.js';
import UpdateRentOfferDto from './dto/update-rent-offer.dto.js';
import { RentOfferServiceInterface } from './rent-offer-service.interface.js';
import { RentOfferEntity } from './rent-offer.entity.js';

@injectable()
export default class RentOfferService implements RentOfferServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.RentOfferModel) private readonly rentOfferModel: types.ModelType<RentOfferEntity>
  ) { }

  public async create(dto: CreateRentOfferDto): Promise<DocumentType<RentOfferEntity>> {
    const result = await this.rentOfferModel.create(dto);
    this.logger.info(`New rent offer created: ${dto.title}`);

    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<RentOfferEntity> | null> {
    return this.rentOfferModel
      .findById(offerId)
      .populate('userId')
      .exec();
  }

  public async find(): Promise<DocumentType<RentOfferEntity>[]> {
    return this.rentOfferModel
      .find()
      .populate('userId')
      .exec();
  }

  public updateById(offerId: string, dto: UpdateRentOfferDto): Promise<DocumentType<RentOfferEntity> | null> {
    return this.rentOfferModel
      .findByIdAndUpdate(offerId, dto, { new: true })
      .populate('userId')
      .exec();
  }

  public deleteById(offerId: string): Promise<DocumentType<RentOfferEntity> | null> {
    return this.rentOfferModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<RentOfferEntity> | null> {
    return this.rentOfferModel
      .findByIdAndUpdate(offerId, {
        '$inc': {
          commentNumber: 1,
        }
      }).exec();
  }

  public async calculateRating(offerId: string, newRating: number): Promise<DocumentType<RentOfferEntity> | null> {
    return this.rentOfferModel
      .findByIdAndUpdate(offerId, {
        '$inc': { rating: newRating },
        '$mul': { rating: 0.5 }
      }).exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.rentOfferModel
      .exists({ _id: documentId })) !== null;
  }

  public async findByOfferIdOrCreate(offerId: string, dto: CreateRentOfferDto): Promise<DocumentType<RentOfferEntity>> {
    const existedOffer = await this.findById(offerId);

    if (existedOffer) {
      return existedOffer;
    }

    return this.create(dto);
  }

  public async getRentList(count = DEFAULT_RENT_OFFER_COUNT): Promise<DocumentType<RentOfferEntity>[]> {
    return this.rentOfferModel
      .aggregate([
        {
          $project: {
            _id: 1,
            rentPrice: 1,
            title: 1,
            rentType: 1,
            date: 1,
            city: 1,
            preview: 1,
            premium: 1,
            rating: 1,
            commentNumber: 1,
          }
        },
        { $limit: count },
        { $sort: { date: SortType.Down } }
      ]).exec();
  }
}
