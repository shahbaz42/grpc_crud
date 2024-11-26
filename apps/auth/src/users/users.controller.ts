import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  UserServiceController,
  CreateUserDto,
  UpdateUserDto,
  UserServiceControllerMethods,
  User,
  Users,
  FindOneUserDto,
  PaginationDto,
} from '@app/common';
import { Observable } from 'rxjs';

@Controller()
@UserServiceControllerMethods()
export class UsersController implements UserServiceController {
  constructor(private readonly usersService: UsersService) {}

  createUser(request: CreateUserDto): Promise<User> | Observable<User> | User {
    return this.usersService.createUser(request);
  }

  findAllUsers(): Promise<Users> | Observable<Users> | Users {
    return this.usersService.findAllUsers();
  }

  findOneUser(
    findOneUserDto: FindOneUserDto,
  ): Promise<User> | Observable<User> | User {
    return this.usersService.findOneUser(findOneUserDto);
  }

  updateUser(
    updateUserDto: UpdateUserDto,
  ): Promise<User> | Observable<User> | User {
    return this.usersService.updateUser(updateUserDto);
  }

  removeUser(
    findOneUserDto: FindOneUserDto,
  ): Promise<User> | Observable<User> | User {
    return this.usersService.removeUser(findOneUserDto);
  }

  queryUsers(
    paginationDtoStream: Observable<PaginationDto>,
  ): Observable<Users> {
    return this.usersService.queryUsers(paginationDtoStream);
  }
}
