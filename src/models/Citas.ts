import { Table, Column, Model, DataType, AllowNull, ForeignKey, BelongsTo } from 'sequelize-typescript';

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

    


}

export default Cita