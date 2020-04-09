import {Table, Column, Model, PrimaryKey, CreatedAt, UpdatedAt, DataType, AutoIncrement} from 'sequelize-typescript';
import {NewsCorp} from "./NewsCorp";

@Table({ underscored: true })
export default class NewsRawHtml extends Model<NewsRawHtml> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column({ type: DataType.STRING })
    corporation: NewsCorp;

    @Column({ unique: true })
    title: string;

    @Column(DataType.TEXT({ length: 'medium' }))
    html: string;

    @Column(DataType.STRING({ length: 1 }))
    processYn: string;

    @CreatedAt
    @Column
    createdAt: Date;

    @UpdatedAt
    @Column
    updatedAt: Date;
}
