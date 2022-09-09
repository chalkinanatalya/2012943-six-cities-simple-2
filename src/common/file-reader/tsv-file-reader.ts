import { readFileSync } from 'fs';

import { FileReaderInterface } from './file-reader.interface.js';
import { RentOffer } from '../../types/rent-offer.type.js';
import { RentType } from '../../types/rent-type.enum.js';
import { UserStatus } from '../../types/user-status.enum.js';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) { }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf8' });
  }

  public toArray(): RentOffer[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([title, description, createdDate, city, preview, photo, premium, rating, rentType, rooms, guests, rentPrice, amenities, name, email, avatar, password, status, commentNumber, cityLocation, latitude, longitude]) => ({
        title,
        description,
        date: new Date(createdDate),
        city,
        preview,
        photo,
        premium: Boolean(premium),
        rating: Number.parseInt(rating, 10),
        rentType: RentType[rentType as 'apartment' | 'house' | 'room' | 'hotel'],
        rooms: Number(rooms),
        guests: Number(guests),
        rentPrice: Number(rentPrice),
        amenities: amenities.split(';')
          .map((amenity) => ({ amenity })),
        author: { name, email, avatar, password, status: UserStatus[status as 'Casual' | 'Pro'] },
        commentNumber: Number(commentNumber),
        location: { cityLocation, latitude: Number(latitude), longitude: Number(longitude) },
      }));
  }
}
