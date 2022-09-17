import { RentOffer } from '../types/rent-offer.type.js';
import { RentType } from '../types/rent-type.enum.js';
import { UserStatus } from '../types/user-status.enum.js';

export const createRentOffer = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');

  const [title, description, createdDate, city, preview, photos, premium, rating, rentType, rooms, guests, rentPrice, amenities, name, email, avatar, status, commentNumber, latitude, longitude] = tokens;
  return {
    title,
    description,
    date: new Date(createdDate),
    city,
    preview,
    photos,
    premium: Boolean(premium),
    rating: Number.parseInt(rating, 10),
    rentType: RentType[rentType as 'apartment' | 'house' | 'room' | 'hotel'],
    rooms: Number(rooms),
    guests: Number(guests),
    rentPrice: Number(rentPrice),
    amenities: amenities.split(';')
      .map((amenity) => ({ amenity })),
    author: { name, email, avatar, status: UserStatus[status as 'Casual' | 'Pro'] },
    commentNumber: Number(commentNumber),
    location: { latitude: latitude, longitude: longitude },
  } as RentOffer;
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';
