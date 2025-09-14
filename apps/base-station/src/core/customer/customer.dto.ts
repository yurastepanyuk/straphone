import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsInt()
  @IsNotEmpty()
  tariffId: number = 0;

  @IsString()
  @MaxLength(38)
  @IsNotEmpty()
  imsi: string;

  @IsBoolean()
  active: boolean;

  @IsInt()
  customerWebId?: number;

  @IsInt()
  balanceId?: number;
}
