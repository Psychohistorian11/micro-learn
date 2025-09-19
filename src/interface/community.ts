import { IsOptional, IsString, IsUUID } from "class-validator";

export class CommunityDTO {
  @IsUUID()
  id: string;

  @IsString()
  title: string;

  @IsString()
  image: string;

  @IsString()
  description: string;

  @IsString({ each: true })
  @IsOptional()
  users?: string[]; // IDs de usuarios

  @IsString({ each: true })
  @IsOptional()
  resources?: string[]; // IDs de recursos
}

export class CommunityCreateDTO {
  @IsUUID()
  adminId: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsString()
  description: string;
}

export class CommunityUpdateDTO {
  @IsUUID()
  id: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString({ each: true })
  @IsOptional()
  users?: string[]; // IDs de usuarios

  @IsString({ each: true })
  @IsOptional()
  resources?: string[]; // IDs de recursos
}
