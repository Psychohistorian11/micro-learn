import {
  IsBoolean,
  IsOptional,
  IsString,
  IsUUID,
  IsEnum,
} from "class-validator";
import { ResourceType } from "@prisma/client";

export class AreaDTO {
  @IsUUID()
  id: string;

  @IsString()
  name: string;
}

export class AreaCreateDTO {
  @IsString({ each: true })
  names: string[];
}
