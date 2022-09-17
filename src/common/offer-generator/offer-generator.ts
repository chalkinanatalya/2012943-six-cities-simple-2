import dayjs from 'dayjs';
import { MockData } from '../../types/mock-data.type.js';
import { UserStatus } from '../../types/user-status.enum.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../utils/random.js';
import { OfferGeneratorInterface } from './offer-generator.interface.js';

const MIN_RATING = 1;
const MAX_RATING = 5;

const MIN_ROOMS = 1;
const MAX_ROOMS = 8;

const MIN_GUESTS = 1;
const MAX_GUESTS = 8;

const MIN_PRICE = 100;
const MAX_PRICE = 100000;

const MIN_COMMENTS = 0;
const MAX_COMMENTS = 100;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockData) { }

  public generate(): string {

    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const createdDate = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const preview = getRandomItem<string>(this.mockData.previews);
    const photos = getRandomItems<string>(this.mockData.photos).join(';');
    const premium = getRandomItem<boolean>([true, false]).toString();
    const rating = generateRandomValue(MIN_RATING, MAX_RATING).toString();
    const rentType = getRandomItem<string>(this.mockData.rentType);
    const rooms = generateRandomValue(MIN_ROOMS, MAX_ROOMS).toString();
    const guests = generateRandomValue(MIN_GUESTS, MAX_GUESTS).toString();
    const rentPrice = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const amenities = getRandomItems<string>(this.mockData.amenities).join(';');

    const name = getRandomItem<string>(this.mockData.names);
    const email = getRandomItem<string>(this.mockData.emails);
    const avatar = getRandomItem<string>(this.mockData.avatars);
    const status = getRandomItem([UserStatus.Casual, UserStatus.Pro]).toString();

    const commentNumber = generateRandomValue(MIN_COMMENTS, MAX_COMMENTS).toString();

    const cityNumber = generateRandomValue(0, this.mockData.cities.length - 1);
    const city = this.mockData.cities[cityNumber];
    const location = this.mockData.locations[cityNumber];
    const [latitude, longitude] = location.split(' ');

    return [
      title, description, createdDate, city, preview,
      photos, premium, rating, rentType, rooms,
      guests, rentPrice, amenities, name, email,
      avatar, status, commentNumber, latitude, longitude
    ].join('\t');
  }
}
