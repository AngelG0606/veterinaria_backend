import { Table, Column, Model, DataType, AllowNull, ForeignKey, BelongsTo } from 'sequelize-typescript';
import User from './User';
import Veterinario from './Veterinario';
import Mascota from './Mascota';

@Table({
    tableName : 'citas'
})

class Cita extends Model {


    @AllowNull(false)
    @Column({
    type: DataType.DATE,
    })
    declare fecha: Date;

    @AllowNull(false)
    @Column({
    type: DataType.TIME,
    })
    declare hora: Date;

    @Column({
        type : DataType.FLOAT
    })
    declare price : string

    @Column({
        type : DataType.BOOLEAN,
        defaultValue : true
    })
    declare status : boolean

    @ForeignKey(() => User)
    declare userId : User

    @BelongsTo(() => User)
    declare user : User
    
    @ForeignKey(() => Veterinario)
    declare veterinarioId : Veterinario

    @BelongsTo(() => Veterinario)
    declare veterinario : Veterinario

    @ForeignKey(() => Mascota)
    declare mascotaId : Mascota

    @BelongsTo(() => Mascota)
    declare mascota : Mascota

}

export default Cita