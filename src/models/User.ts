import { Table, Column, Model, DataType, AllowNull, Unique } from 'sequelize-typescript';

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

  @Unique
  @AllowNull(false)
  @Column({
    type: DataType.STRING(30),
  })
  declare email: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  declare status: boolean;
}

export default User;
