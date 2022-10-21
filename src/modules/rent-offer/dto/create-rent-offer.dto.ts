import { IsMongoId, IsDateString, MaxLength, MinLength, IsArray, IsBoolean, IsEnum, IsInt, IsLatitude, IsLongitude, IsUrl, Max, Min } from 'class-validator';
import { CityType } from '../../../types/city-type.enum.js';
import { RentType } from '../../../types/rent-type.enum.js';

export default class CreateRentOfferDto {
  @MinLength(10, { message: 'Minimum title length must be 10' })
  @MaxLength(100, { message: 'Maximum title length must be 100' })
  public title!: string;

  @MinLength(20, { message: 'Minimum description length must be 20' })
  @MaxLength(1024, { message: 'Maximum description length must be 1024' })
  public description!: string;

  @IsDateString({}, { message: 'Date should be valid ISO date' })
  public date!: Date;

  @IsEnum(CityType, { message: 'Type must be paris | cologne | brussels | amsterdam | hamburg | dusseldorf' })
  public city!: CityType;

  @IsUrl({ message: 'Preview url should be valid' })
  public preview!: string;

  @IsUrl({ message: 'Photos url should be valid' }, { each: true })
  @IsArray({ message: 'Photos must be an array' })
  public photos!: string[];

  @IsBoolean({ message: 'Premium option should be valid' })
  public premium!: boolean;

  @Min(1, { message: 'Minimum rating must be 1' })
  @Max(5, { message: 'Maximum rating must be 5' })
  public rating!: number;

  @IsEnum(RentType, { message: 'Type must be appartment | house | room | hotel' })
  public rentType!: RentType;

  @Min(1, { message: 'Minimum rooms number must be 1' })
  @Max(8, { message: 'Maximum rooms number must be 8' })
  public rooms!: number;

  @Min(1, { message: 'Minimum guests must be 1' })
  @Max(10, { message: 'Maximum guests must be 10' })
  public guests!: number;

  @Min(100, { message: 'Minimum rent price must be 100' })
  @Max(100000, { message: 'Maximum rent price must be 100000' })
  public rentPrice!: number;

  @IsArray({ message: 'List of amenities must be an array' })
  public amenities!: string[];

  @IsInt({ message: 'Comment number must be an integer' })
  public commentNumber!: number;

  @IsLatitude({ message: 'Data must be a latitude' })
  public latitude!: string;

  @IsLongitude({ message: 'Data must be a longitude' })
  public longitude!: string;

  @IsMongoId({ message: 'userId field must be valid an id' })
  public userId!: string;
}
