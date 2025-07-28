
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { NotificationType } from '@prisma/client';

export class CreateNotificationDto {
  @IsEnum(NotificationType)
  type: NotificationType;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsNotEmpty()
  userId?: string;

  @IsString()
  @IsOptional()
  email?: string;
}
