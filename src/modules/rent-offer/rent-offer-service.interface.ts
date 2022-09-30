import { DocumentType } from '@typegoose/typegoose';
import CreateRentOfferDto from './dto/create-rent-offer.dto.js';
import { RentOfferEntity } from './rent-offer.entity.js';

export interface RentOfferServiceInterface {
  create(dto: CreateRentOfferDto): Promise<DocumentType<RentOfferEntity>>;
  findById(offerId: string): Promise<DocumentType<RentOfferEntity> | null>;
}
