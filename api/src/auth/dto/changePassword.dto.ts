import { IsString, IsNotEmpty } from 'class-validator';

export class ChangePassword {
  @IsString()
  @IsNotEmpty()
  readonly newPassword: string;

  @IsString()
  @IsNotEmpty()
  readonly repeatPassword: string;
}
