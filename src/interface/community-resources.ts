import { CommunityRole } from "@prisma/client";
import { IsEnum, IsString, IsUUID } from "class-validator";

export class CommunityResourcesCreateDTO {
  @IsUUID()
  resourceId: string;

  @IsUUID()
  communityId: string;
}
