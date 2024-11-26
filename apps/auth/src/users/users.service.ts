import {
  CreateUserDto,
  FindOneUserDto,
  PaginationDto,
  UpdateUserDto,
  User,
  Users,
} from '@app/common';
import {
  Injectable,
  NotFoundException,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class UsersService implements OnModuleInit {
  private readonly users: User[] = [];

  onModuleInit() {
    for (let i = 0; i < 100; i++) {
      this.createUser({
        id: randomUUID(),
        username: randomUUID(),
        password: randomUUID(),
        age: 0,
        subscribed: false,
        socialMedia: {},
      });
    }
  }

  createUser(createUserDto: CreateUserDto) {
    const user: User = {
      ...createUserDto,
      subscribed: false,
      socialMedia: {},
      id: randomUUID(),
    };
    this.users.push(user);
    return user;
  }

  findAllUsers() {
    return { users: this.users };
  }

  findOneUser(findOneUserDto: FindOneUserDto) {
    return this.users.find((user) => user.id === findOneUserDto.id);
  }

  updateUser(updateUserDto: UpdateUserDto) {
    const userIndex = this.users.findIndex(
      (user) => user.id === updateUserDto.id,
    );
    if (userIndex != -1) {
      this.users[userIndex] = {
        ...this.users[userIndex],
        ...updateUserDto,
      };
      return this.users[userIndex];
    }
    throw new NotFoundException(`User not found by id ${updateUserDto.id}.`);
  }

  removeUser(findOneUserDto: FindOneUserDto) {
    const userIndex = this.users.findIndex(
      (user) => user.id === findOneUserDto.id,
    );

    if (userIndex != -1) {
      return this.users.splice(userIndex)[0];
    }
    throw new NotFoundException(`User not found by id ${findOneUserDto.id}.`);
  }

  queryUsers(
    paginationDtoStream: Observable<PaginationDto>,
  ): Observable<Users> {
    const subject = new Subject<Users>();

    const onNext = (paginationDto: PaginationDto) => {
      const start = paginationDto.page * paginationDto.skip;
      subject.next({
        users: this.users.slice(start, start + paginationDto.skip),
      });
    };

    const onComplete = () => {
      subject.complete();
    };

    paginationDtoStream.subscribe({
      next: onNext,
      complete: onComplete,
    });

    return subject.asObservable();
  }
}
