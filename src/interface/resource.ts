import {
  IsBoolean,
  IsOptional,
  IsString,
  IsUUID,
  IsEnum,
} from "class-validator";
import { ResourceType } from "@prisma/client";
import { AreaDTO, AreaWrapperDTO } from "./area";

export class ResourceDTO {
  @IsUUID()
  id: string;

  @IsString()
  title: string;

  @IsBoolean()
  isPublic: boolean;

  @IsString()
  image: string;

  @IsString()
  description: string;

  @IsString()
  attachment: string;

  @IsEnum(ResourceType)
  type: ResourceType;

  @IsString()
  authorId: string;

  @IsString()
  updatedAt: Date;

  @IsString()
  createdAt: Date;

  @IsString({ each: true })
  @IsOptional()
  areas?: AreaWrapperDTO[];

  @IsOptional()
  communities?: { id: string }[];
}

export class ResourceCreateDTO {
  @IsString()
  title: string;

  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  description: string;

  @IsString()
  attachment: string;

  @IsEnum(ResourceType)
  type: ResourceType;

  @IsString()
  authorId: string;

  @IsString({ each: true })
  @IsOptional()
  areas?: string[];

  @IsString({ each: true })
  @IsOptional()
  communities?: string[];
}

export class ResourceUpdateDTO {
  @IsUUID()
  id: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  attachment?: string;

  @IsOptional()
  @IsEnum(ResourceType)
  type?: ResourceType;

  @IsString({ each: true })
  @IsOptional()
  areas?: string[]; // IDs de áreas

  @IsString({ each: true })
  @IsOptional()
  communities?: string[]; // IDs de comunidades
}

export { ResourceType };
//ResourceResponseDTO en  /lib/prisma-selects.ts

export default interface ResourceProps {
  data: ResourceCreateDTO
  onUpdate: (values: Partial<ResourceCreateDTO>) => void
}
//ResourceResponseDTO en  /lib/prisma-selects.ts
