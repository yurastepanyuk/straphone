import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { CreateDateColumn, UpdateDateColumn, Index, JoinColumn } from 'typeorm';
import {
  IsInt,
  IsString,
  IsOptional,
  MaxLength,
  IsDate,
  IsNotEmpty,
} from 'class-validator';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  // Фото належить тільки 1 юзеру
  @ManyToOne(() => User, (user) => user.photos)
  user: User;
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // У юзера багато фото
  @OneToMany(() => Photo, (photo) => photo.user)
  photos: Photo[];
}

@Entity('files')
@Index(['tableOwnerId', 'ownerId', 'fileTypeId', 'partnerId'])
@Index(['partnerId'])
export class FilesEntity {
  @PrimaryGeneratedColumn('increment')
  @IsInt()
  id: number;

  @Column({ nullable: true, name: 'partner' })
  @IsOptional()
  @IsInt()
  partnerId?: number;

  @Column({ name: 'tableOwner' })
  @IsInt()
  tableOwnerId: number;

  @Column({ name: 'ownerID' })
  @IsInt()
  ownerId: number;

  @Column({ name: 'fileType' })
  @IsInt()
  fileTypeId: number;

  @Column({ type: 'bytea', nullable: true, name: 'file_data' })
  @IsOptional()
  fileData?: Buffer;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
    name: 'userFileName',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  userFileName?: string;

  @Column({ type: 'varchar', length: 100, nullable: true, name: 'intFileName' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  intFileName?: string;

  @Column({ type: 'varchar', length: 164, nullable: true, name: 'storageName' })
  @IsOptional()
  @IsString()
  @MaxLength(164)
  storageName?: string;

  @Column({ type: 'varchar', length: 186, nullable: true, name: 'url' })
  @IsOptional()
  @IsString()
  @MaxLength(186)
  url?: string;

  @Column({ type: 'varchar', length: 12, nullable: true, name: 'fileExt' })
  @IsOptional()
  @IsString()
  @MaxLength(12)
  fileExt?: string;

  @Column({ type: 'varchar', length: 72, nullable: true, name: 'mimeExt' })
  @IsOptional()
  @IsString()
  @MaxLength(72)
  mimeExt?: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created' })
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated' })
  @IsDate()
  modifiedAt: Date;

  // Зв'язки ManyToOne з Enums (як у Prisma)
  @ManyToOne(() => EnumsEntity, (enumEntity) => enumEntity.filesTableOwner)
  @JoinColumn({ name: 'tableOwner' })
  filesTableOwner: EnumsEntity;

  @ManyToOne(() => EnumsEntity, (enumEntity) => enumEntity.filesFileType)
  @JoinColumn({ name: 'fileType' })
  fileType: EnumsEntity;
}

@Entity('enums')
@Index(['type', 'code'])
@Index(['code'])
@Index(['createdAt'])
export class EnumsEntity {
  @PrimaryGeneratedColumn('increment')
  @IsInt()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  type: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  code: string;

  @Column({ type: 'varchar', length: 100 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created' })
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated' })
  @IsDate()
  modifiedAt: Date;

  // Зв'язки OneToMany з Files (як у Prisma)
  @OneToMany(() => FilesEntity, (file) => file.filesTableOwner)
  filesTableOwner: FilesEntity[];

  @OneToMany(() => FilesEntity, (file) => file.fileType)
  filesFileType: FilesEntity[];
}
