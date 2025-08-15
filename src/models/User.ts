import { Table, Column, DataType, Model, Unique, AllowNull} from 'sequelize-typescript'


@Table({
    tableName : 'users'
})

class User extends Model {

    @AllowNull(false)
    @Column({
        type : DataType.STRING(100)
    })
    name : string

    @AllowNull(false)
    @Column({
        type : DataType.STRING(100)
    })
    lastname : string

    @AllowNull(false)
    @Unique
    @Column({
        type : DataType.STRING(50)
    })
    email : string

    @AllowNull(false)
    @Column({
        type : DataType.STRING(100)
    })
    password : string

    @AllowNull(false)
    @Column({
        type : DataType.STRING(20)
    })
    telefono : string

    @AllowNull(false)
    @Column({
        type : DataType.STRING(20),
        defaultValue : "cliente"
    })
    rol : string
}

export default User