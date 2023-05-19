import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class MailMessage {
  constructor(partial: Partial<MailMessage>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  @IsEmail()
  from: string;

  @ApiProperty()
  @IsEmail()
  to: string;

  @ApiProperty()
  @IsString()
  subject: string;

  @ApiProperty()
  @IsString()
  body: string;

  @ApiProperty()
  @IsOptional()
  isHtml = false;
}
