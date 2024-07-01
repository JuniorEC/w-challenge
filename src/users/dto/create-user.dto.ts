import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;

  @MinLength(8)
  confirmPassword: string;

  @IsNotEmpty()
  address: {
    street: string;
    neighborhood: string;
    number: string;
    city: string;
    state: string;
    zipCode: string;
  };
}
