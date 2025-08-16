import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import User from './User';
import Pet from './Pet';

@Table({ tableName: 'citas' })
class Cita extends Model {

    @Column({ type: DataType.DATEONLY })
    declare fecha: Date;

    @Column({ type: DataType.TIME })
    declare hora: string;

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    declare status: boolean;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    declare userId: number;

    @BelongsTo(() => User, 'userId')
    cliente!: User;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    declare veterinarioId: number;

    @BelongsTo(() => User, 'veterinarioId')
    veterinario!: User;

    @ForeignKey(() => Pet)
    @Column({ type: DataType.INTEGER })
    declare petId: number;

    @BelongsTo(() => Pet)
    pet!: Pet;
}

export default Cita;
    