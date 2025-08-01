import { Table, Column, Model, DataType, AllowNull, Unique, HasMany } from 'sequelize-typescript';
import Mascota from './Mascota';

@Table({
  tableName: 'users',
})
class User extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.STRING(70),
  })
  declare name: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(70),
  })
  declare lastname: string;

  @Unique
  @AllowNull(false)
  @Column({
    type: DataType.STRING(10),
  })
  declare telefono: string;

  @Unique(true)
  @AllowNull(false)
  @Column({
    type: DataType.STRING(30),
  })
  declare email: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(60),
  })
  declare password: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  declare status: boolean;

  @HasMany(() => Mascota, {
    onDelete : 'CASCADE',
    onUpdate : 'CASCADE'
  })
  declare mascotas : Mascota[]

}

export default User;
