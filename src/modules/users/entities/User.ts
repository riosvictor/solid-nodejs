import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("users")
class User {
  @PrimaryColumn()
  id?: string;

  @Column()
  name?: string;

  @Column()
  email?: string;

  @Column()
  admin?: boolean;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  constructor(name?: string, email?: string) {
    if (!this.id) this.id = uuidV4();

    this.name = name;
    this.email = email;
    this.admin = false;
  }
}

export { User };
