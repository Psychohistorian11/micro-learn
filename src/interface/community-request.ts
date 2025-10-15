import { CommunityRole, RequestStatus } from "@prisma/client";
import { IsEnum, IsString, IsUUID } from "class-validator";

export class CommunityRequestCreateDTO {
  @IsUUID()
  userId: string;

  @IsUUID()
  communityId: string;
}

export class CommunityRequestUpdateDTO {
  @IsUUID()
  id: string;

  @IsUUID()
  userId: string;

  @IsUUID()
  communityId: string;

  @IsEnum(RequestStatus)
  status: RequestStatus;
}
