import { Table, Column, DataType, Model} from 'sequelize-typescript'


@Table({
    tableName : 'users'
})

class User extends Model {
    @Column({
        type : DataType.STRING(100)
    })
    name : string

    @Column({
        type : DataType.STRING(100)
    })
    lastname : string

    @Column({
        type : DataType.STRING(50)
    })
    email : string

    @Column({
        type : DataType.STRING(100)
    })
    password : string

    @Column({
        type : DataType.STRING(20)
    })
    telefono : string

    @Column({
        type : DataType.STRING(20)
    })
    rol : string
}

export default User