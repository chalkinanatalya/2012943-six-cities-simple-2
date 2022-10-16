import { IsArray, IsBoolean, IsDateString, IsEnum, IsInt, IsLatitude, IsLongitude, IsOptional, IsUrl, Max, MaxLength, Min, MinLength } from 'class-validator';
import { CityType } from '../../../types/city-type.enum.js';
import { RentType } from '../../../types/rent-type.enum.js';

export default class UpdateRentOfferDto {
  @IsOptional()
  @MinLength(10, { message: 'Minimum title length must be 10' })
  @MaxLength(100, { message: 'Maximum title length must be 100' })
  public title?: string;

  @IsOptional()
  @MinLength(20, { message: 'Minimum description length must be 20' })
  @MaxLength(1024, { message: 'Maximum description length must be 1024' })
  public description?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Date should be valid ISO date' })
  public date?: Date;

  @IsOptional()
  @IsEnum(CityType, { message: 'Type must be paris | cologne | brussels | amsterdam | hamburg | dusseldorf' })
  public city?: CityType;

  @IsOptional()
  @IsUrl({ message: 'Preview url should be valid' })
  public preview?: string;

  @IsOptional()
  @IsUrl({ message: 'Photos url should be valid' }, { each: true })
  @IsArray({ message: 'Photos must be an array' })
  public photos?: string[];

  @IsOptional()
  @IsBoolean({ message: 'Premium option should be valid' })
  public premium?: boolean;

  @IsOptional()
  @Min(1, { message: 'Minimum rating must be 1' })
  @Max(5, { message: 'Maximum rating must be 5' })
  public rating?: number;

  @IsOptional()
  @IsEnum(RentType, { message: 'Type must be appartment | house | room | hotel' })
  public rentType?: RentType;

  @IsOptional()
  @Min(1, { message: 'Minimum rooms number must be 1' })
  @Max(8, { message: 'Maximum rooms number must be 8' })
  public rooms?: number;

  @IsOptional()
  @Min(1, { message: 'Minimum guests must be 1' })
  @Max(10, { message: 'Maximum guests must be 10' })
  public guests?: number;

  @IsOptional()
  @Min(100, { message: 'Minimum rent price must be 100' })
  @Max(100000, { message: 'Maximum rent price must be 100000' })
  public rentPrice?: number;

  @IsOptional()
  @IsArray({ message: 'List of amenities must be an array' })
  public amenities?: string[];

  @IsOptional()
  @IsInt({ message: 'Comment number must be an integer' })
  public commentNumber?: number;

  @IsOptional()
  @IsLatitude({ message: 'Data must be a latitude' })
  public latitude?: string;

  @IsOptional()
  @IsLongitude({ message: 'Data must be a longitude' })
  public longitude?: string;
}
