import { Table, Column, Model, DataType, AllowNull, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import User from './User';
import Cita from './Citas';


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

    @HasMany(() => Cita,{
        onDelete : 'CASCADE',
        onUpdate : 'CASCADE'
    })
    declare citas : Cita[]

}

export default Mascota