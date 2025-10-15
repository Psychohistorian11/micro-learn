import { IsOptional, IsString, IsUUID } from "class-validator";

export class CommunityDTO {
  @IsUUID()
  id: string;

  @IsString()
  title: string;

  @IsString()
  image: string;

  @IsString()
  avatar: string;

  @IsString()
  description: string;

  isPublic: boolean;

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

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsString()
  description: string;

  @IsOptional()
  isPublic?: boolean;
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
  avatar?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  isPublic?: boolean;

  @IsString({ each: true })
  @IsOptional()
  users?: string[]; // IDs de usuarios

  @IsString({ each: true })
  @IsOptional()
  resources?: string[]; // IDs de recursos
}
