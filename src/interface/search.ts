import { IsOptional, IsString, IsUUID } from "class-validator";

export class SearchDTO {
  @IsOptional()
  @IsString()
  query_text: string;

  @IsOptional()
  area_ids?: string[];
}

export class SearchResponseDTO {
  @IsOptional()
  @IsString({ each: true })
  resource_ids?: string[];

  @IsOptional()
  @IsString({ each: true })
  community_ids?: string[];
}
