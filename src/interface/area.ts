import {

    IsString,
    IsUUID,
} from "class-validator";

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

export class AreaCreateDTO {
    @IsString({ each: true })
    names: string[];
}
