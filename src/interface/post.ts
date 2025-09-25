import { IsString } from "class-validator";
import { ResourceDTO } from "./resource";

export class PostDTO extends ResourceDTO {
  @IsString()
  authorName: string;
}
