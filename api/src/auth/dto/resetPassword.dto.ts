import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResetPassword {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string
}
