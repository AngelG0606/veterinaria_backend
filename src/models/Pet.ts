import { Table, Column, DataType, Model, AllowNull, ForeignKey, BelongsTo } from 'sequelize-typescript'
import User from './User'

@Table({
    tableName : 'pets'
})

class Pet extends Model {

    @AllowNull(false)
    @Column({
        type : DataType.STRING(100)
    })
    declare name : string

    @AllowNull(false)
    @Column({
        type : DataType.STRING(50)
    })
    declare especie : string

    @AllowNull(false)
    @Column({
        type : DataType.STRING(50)
    })
    declare raza : string

    @AllowNull(false)
    @Column({
        type : DataType.STRING(50)
    })
    declare color : string

    @AllowNull(false)
    @Column({
        type : DataType.STRING(20)
    })
    declare peso : string

    @AllowNull(false)
    @Column({
        type : DataType.STRING(50)
    })
    declare edad : string

    @ForeignKey(() => User)
    declare userId : number

    @BelongsTo(() => User)
    declare user: User

}

export default Pet