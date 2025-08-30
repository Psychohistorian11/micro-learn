import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class User {
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsEmail()
  email: string;

  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  profilePicture?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class UserCreateDTO {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class UserLoginDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class UserResponseDTO {
  @IsString()
  id: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  profilePicture?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
