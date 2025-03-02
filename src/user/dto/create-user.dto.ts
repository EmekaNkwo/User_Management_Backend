import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
  ValidateNested,
  IsPhoneNumber,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ContactDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber(null, { message: 'Invalid phone number' })
  phoneNumber: string;

  @IsOptional()
  @IsString()
  fax?: string;

  @IsOptional()
  @IsString()
  @Matches(/^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/, {
    message: 'Invalid LinkedIn URL',
  })
  linkedInUrl?: string;
}

export class AddressDto {
  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @Matches(/^\d{5}(-\d{4})?$/, { message: 'Invalid ZIP code' })
  zipCode: string;
}

export class AcademicsDto {
  @IsOptional()
  @IsString({ each: true })
  pastSchools?: string[];
}

export class CreateUserDto {
  @IsOptional()
  @IsString()
  profilePhoto: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsDateString()
  dob: Date;

  @IsNotEmpty()
  @IsString()
  occupation: string;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ContactDto)
  contact: ContactDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => AcademicsDto)
  academics?: AcademicsDto;
}
