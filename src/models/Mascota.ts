import { Table, Column, Model, DataType, AllowNull, ForeignKey, BelongsTo } from 'sequelize-typescript';
import User from './User';


@Table({
    tableName : 'mascotas'
})

class Mascota extends Model {

    @AllowNull(false)
    @Column({
        type: DataType.STRING(50)
    })
    declare name : string

    @AllowNull(false)
    @Column({
        type : DataType.STRING(20)
    })
    declare especie : string

    @AllowNull(false)
    @Column({
        type : DataType.STRING(50)
    })
    declare raza : string

    @AllowNull(false)
    @Column({
        type : DataType.STRING(20)
    })
    declare color : string

    @AllowNull(false)
    @Column({
        type : DataType.INTEGER
    })
    declare weight : string

    @ForeignKey(() => User)
    declare userId : number

    @BelongsTo(() => User)
    declare owner : User

}

export default Mascota