import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserAcademics {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { array: true })
  pastSchools: string[];
}
