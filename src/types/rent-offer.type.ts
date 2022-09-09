import { AmenitiesType } from './amenities.type.js';
import { Location } from './location.type.js';
import { RentType } from './rent-type.enum.js';
import { User } from './user.type.js';

export type RentOffer = {
  title: string,
  description: string,
  date: Date,
  city: string,
  preview: string,
  photo: string,
  premium: boolean,
  rating: number,
  rentType: RentType,
  rooms: number,
  guests: number,
  rentPrice: number,
  amenities: AmenitiesType[],
  author: User,
  commentNumber: number,
  location: Location
}
