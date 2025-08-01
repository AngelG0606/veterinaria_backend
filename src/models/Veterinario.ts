import { Table, Column, Model, DataType, AllowNull, Unique, ForeignKey, BelongsTo } from 'sequelize-typescript';

@Table({
    tableName: 'veterinarios'
})

class Veterinario extends Model {

    @AllowNull(false)
    @Column({
        type : DataType.STRING(50)
    })
    declare name : string

    @AllowNull(false)
    @Column({
        type :  DataType.STRING(50)
    })
    declare lastname : string

    @AllowNull(false)
    @Column({
        type :  DataType.STRING(50)
    })
    declare especialidad : string

    @AllowNull(false)
    @Column({
        type :  DataType.STRING(13)
    })
    declare rfc : string

    @AllowNull(false)
    @Column({
        type :  DataType.STRING(10)
    })
    declare telefono : string

    @AllowNull(false)
    @Unique
    @Column({
        type :  DataType.STRING(30)
    })
    declare email : string

    @AllowNull(false)
    @Column({
        type :  DataType.STRING(60)
    })
    declare password : string
}

export default Veterinario