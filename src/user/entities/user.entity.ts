import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity() // 表名
export class User {
    @PrimaryGeneratedColumn() // 主键
    id: number;

    // @Column({ unique: true, length: 20, nullable: false }) // 列：必填 长度20  默认非空 唯一 
    @Column()
    username: string;

    // @Column({ length: 20, nullable: false, select: false }) // 列：必填 长度20  默认非空 不显示
    @Column({ select: false })
    password: string;

    @Column() // 列
    age: number;
}
