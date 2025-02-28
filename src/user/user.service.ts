import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserInfo } from './entities/user-info.entity';
import { UserContact } from './entities/user-contact.entity';
import { UserAddress } from './entities/user-address.entity';
import { UserAcademics } from './entities/user-academics.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserInfo)
    private userRepository: Repository<UserInfo>,
    @InjectRepository(UserContact)
    private contactRepository: Repository<UserContact>,
    @InjectRepository(UserAddress)
    private addressRepository: Repository<UserAddress>,
    @InjectRepository(UserAcademics)
    private academicsRepository: Repository<UserAcademics>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { contact, address, academics, ...userInfoData } = createUserDto;

    const existingContact = await this.contactRepository.findOne({
      where: { email: contact.email },
    });
    if (existingContact) {
      throw new ConflictException('Email already exists');
    }

    const userContact = this.contactRepository.create(contact);
    const userAddress = this.addressRepository.create(address);
    const userAcademics = this.academicsRepository.create({
      pastSchools: academics.pastSchools,
    });

    await this.contactRepository.save(userContact);
    await this.addressRepository.save(userAddress);
    await this.academicsRepository.save(userAcademics);

    const newUser = this.userRepository.create({
      ...userInfoData,
      contact: userContact,
      address: userAddress,
      academics: userAcademics,
    });

    return await this.userRepository.save(newUser);
  }

  async findAll() {
    return await this.userRepository.find({
      relations: ['contact', 'address', 'academics'],
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['contact', 'address', 'academics'],
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    const { contact, address, academics, ...userInfoData } = updateUserDto;

    return await this.userRepository.manager.transaction(async (manager) => {
      // Update contact if provided
      if (contact) {
        const updatedContact = manager
          .getRepository(UserContact)
          .merge(user.contact, contact);
        await manager.getRepository(UserContact).save(updatedContact);
      }

      // Update address if provided
      if (address) {
        const updatedAddress = manager
          .getRepository(UserAddress)
          .merge(user.address, address);
        await manager.getRepository(UserAddress).save(updatedAddress);
      }

      // Update academics if provided
      if (academics) {
        const updatedAcademics = manager
          .getRepository(UserAcademics)
          .merge(user.academics, academics);
        await manager.getRepository(UserAcademics).save(updatedAcademics);
      }

      // Update main user info
      const updatedUser = manager
        .getRepository(UserInfo)
        .merge(user, userInfoData);
      await manager.getRepository(UserInfo).save(updatedUser);

      // Return the updated user with relations loaded
      return await manager.getRepository(UserInfo).findOne({
        where: { id },
        relations: ['contact', 'address', 'academics'],
      });
    });
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
    return { message: 'User deleted successfully' };
  }
}
