import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class HelpBotTag {

    @PrimaryGeneratedColumn()
    public id: number;

    @CreateDateColumn()
    public stampCreated: Date;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

}
