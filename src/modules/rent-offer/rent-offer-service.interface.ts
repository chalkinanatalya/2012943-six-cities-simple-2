import { DocumentType } from '@typegoose/typegoose';
import CreateRentOfferDto from './dto/create-rent-offer.dto.js';
import UpdateRentOfferDto from './dto/update-rent-offer.dto.js';
import { RentOfferEntity } from './rent-offer.entity.js';

export interface RentOfferServiceInterface {
  create(dto: CreateRentOfferDto): Promise<DocumentType<RentOfferEntity>>;
  findById(offerId: string): Promise<DocumentType<RentOfferEntity> | null>;
  updateById(offerId: string, dto: UpdateRentOfferDto): Promise<DocumentType<RentOfferEntity> | null>;
  deleteById(offerId: string): Promise<DocumentType<RentOfferEntity> | null>;
  find(): Promise<DocumentType<RentOfferEntity>[]>;
  incCommentCount(offerId: string): Promise<DocumentType<RentOfferEntity> | null>;
  exists(documentId: string): Promise<boolean>;
}
