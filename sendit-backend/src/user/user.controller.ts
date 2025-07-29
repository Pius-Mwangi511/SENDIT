import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto'; 
import { UpdateUserDto } from './dtos/update-user.dto';
import { UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('couriers')
findCouriers() {
  return this.userService.findCouriers();
}


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
  
  @Patch('email/:email')
@UseInterceptors(FileInterceptor('profileImage'))
updateByEmail(
  @Param('email') email: string,
  @UploadedFile() file: Express.Multer.File,
  @Body() body: UpdateUserDto
) {
  return this.userService.updateByEmail(email, {
    ...body,
    profileImage: file?.filename, 
  });
}



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
