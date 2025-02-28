import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserContact } from './user-contact.entity';
import { UserAddress } from './user-address.entity';
import { UserAcademics } from './user-academics.entity';

@Entity()
export class UserInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  profilePhoto: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  dob: Date;

  @Column()
  occupation: string;

  @Column()
  gender: string;

  @OneToOne(() => UserContact, { cascade: true })
  @JoinColumn()
  contact: UserContact;

  @OneToOne(() => UserAddress, { cascade: true })
  @JoinColumn()
  address: UserAddress;

  @OneToOne(() => UserAcademics, { cascade: true })
  @JoinColumn()
  academics: UserAcademics;
}
