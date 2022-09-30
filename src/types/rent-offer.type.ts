import { Location } from './location.type.js';
import { RentType } from './rent-type.enum.js';
import { User } from './user.type.js';

export type RentOffer = {
  title: string,
  description: string,
  date: Date,
  city: string,
  preview: string,
  photos: string,
  premium: boolean,
  rating: number,
  rentType: RentType,
  rooms: number,
  guests: number,
  rentPrice: number,
  amenities: string[],
  author: User,
  commentNumber: number,
  location: Location
}
