import { IsObject, IsString, IsUUID } from "class-validator";

export class AreaDTO {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsString()
  color: string;

  @IsString()
  icon: string;
}
export class AreaWrapperDTO {
  @IsObject()
  area: AreaDTO;
}

export class AreaCreateDTO {
  @IsString()
  name: string;

  @IsString()
  color: string;

  @IsString()
  icon: string;
}

export class AreasCreateDTO {
  @IsObject({ each: true })
  areas: AreaCreateDTO[];
}