import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class Resource {
  @IsString()
  id: string;

  @IsString()
  title: string;

  @IsString()
  area: string;

  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class ResourceCreateDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class ResourceResponseDTO {
  @IsString()
  id: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
