import { IsDateString, IsMongoId, IsString, Length, Max, Min } from 'class-validator';

export default class CreateCommentDto {
  @IsString({ message: 'text is required' })
  @Length(5, 1024, { message: 'Min comment length is 5 characters, max length is 1024 characters' })
  public text!: string;

  @IsDateString({}, { message: 'Date must be valid ISO date' })
  public date!: Date;

  @IsMongoId({ message: 'offerId field must be a valid MongoId' })
  public offerId!: string;

  public userId!: string;

  @Min(1, { message: 'Minimum rating must be 1' })
  @Max(5, { message: 'Maximum rating must be 5' })
  public rating!: number;
}
