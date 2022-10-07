import { RentType } from '../../../types/rent-type.enum.js';

export default class UpdateRentOfferDto {
  public title?: string;
  public description?: string;
  public date?: Date;
  public city?: string;
  public preview?: string;
  public photos?: string;
  public premium?: boolean;
  public rating?: number;
  public rentType?: RentType;
  public rooms?: number;
  public guests?: number;
  public rentPrice?: number;
  public amenities?: string[];
  public commentNumber?: number;
  public latitude?: string;
  public longitude?: string;
}
