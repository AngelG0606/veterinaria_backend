import { Table, Column, DataType, Model, Unique, AllowNull, HasMany } from 'sequelize-typescript'
import Pet from './Pet'


@Table({
    tableName : 'users'
})

class User extends Model {

    @AllowNull(false)
    @Column({
        type : DataType.STRING(100)
    })
    declare name : string

    @AllowNull(false)
    @Column({
        type : DataType.STRING(100)
    })
    declare lastname : string

    @AllowNull(false)
    @Unique
    @Column({
        type : DataType.STRING(50)
    })
     declare email : string

    @AllowNull(false)
    @Column({
        type : DataType.STRING(100)
    })
    declare password : string

    @AllowNull(false)
    @Column({
        type : DataType.STRING(20)
    })
    declare telefono : string

    @AllowNull(false)
    @Column({
        type : DataType.STRING(20),
        defaultValue : "cliente"
    })
    declare rol : string

    @HasMany(() => Pet, {
        onUpdate : 'CASCADE',
        onDelete : 'CASCADE'
    })
    declare pets : Pet[]

}

export default User