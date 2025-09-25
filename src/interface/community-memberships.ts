import { CommunityRole } from "@prisma/client";
import { IsEnum, IsString, IsUUID } from "class-validator";

export class CommunityMembershipCreateDTO {
  @IsUUID()
  userId: string;

  @IsUUID()
  communityId: string;

  @IsEnum(CommunityRole)
  role: CommunityRole;
}
