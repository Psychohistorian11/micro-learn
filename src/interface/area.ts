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
  @IsString({ each: true })
  names: string[];
}
