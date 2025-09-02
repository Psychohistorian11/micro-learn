import { IsString, IsUUID } from "class-validator";

export class CommunityDTO {
    @IsUUID()
    id: string;

    @IsString()
    title: string;

    @IsString()
    image: string;

    @IsString()
    description: string;

    //Falta usuarios y recursos (juanfepofavor)
}