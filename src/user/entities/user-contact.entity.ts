import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserContact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column({ nullable: true })
  fax?: string;

  @Column({ nullable: true })
  linkedInUrl?: string;
}
