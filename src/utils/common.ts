import { RentOffer } from '../types/rent-offer.type.js';
import { RentType } from '../types/rent-type.enum.js';
import { UserStatus } from '../types/user-status.enum.js';
import crypto from 'crypto';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { CityType } from '../types/city-type.enum.js';
import * as jose from 'jose';

export const createRentOffer = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');

  const [title, description, createdDate, cityType, preview, photos, premium, rating, rentType, rooms, guests, rentPrice, amenities, name, email, avatar, status, commentNumber, latitude, longitude] = tokens;
  return {
    title,
    description,
    date: new Date(createdDate),
    city: CityType[cityType as 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf'],
    preview,
    photos: photos.split(';'),
    premium: Boolean(premium),
    rating: Number.parseInt(rating, 10),
    rentType: RentType[rentType as 'apartment' | 'house' | 'room' | 'hotel'],
    rooms: Number(rooms),
    guests: Number(guests),
    rentPrice: Number(rentPrice),
    amenities: amenities.split(';'),
    author: { name, email, avatar, status: UserStatus[status as 'Casual' | 'Pro'] },
    commentNumber: Number(commentNumber),
    location: { latitude: latitude, longitude: longitude },
  } as RentOffer;
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';

export const createSHA256 = (line: string, salt: string): string => {
  const shaHaser = crypto.createHmac('sha256', salt);
  return shaHaser.update(line).digest('hex');
};

export const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) =>
  plainToInstance(someDto, plainObject, { excludeExtraneousValues: true });

export const createErrorObject = (message: string) => ({
  error: message
});

export const createJWT = async (algorithm: string, jwtSecret: string, payload: object): Promise<string> =>
  new jose.SignJWT({ ...payload })
    .setProtectedHeader({ alg: algorithm })
    .setIssuedAt()
    .setExpirationTime('2d')
    .sign(crypto.createSecretKey(jwtSecret, 'utf-8'));
