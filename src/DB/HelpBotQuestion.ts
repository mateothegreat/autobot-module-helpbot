import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { HelpBotTag }                                                                      from './HelpBotTag';

@Entity()
export class HelpBotQuestion {

    @PrimaryGeneratedColumn()
    public id: number;

    @CreateDateColumn()
    public stampCreated: Date;

    @Column()
    fromUserid: string;

    @Column()
    fromDiscriminator: string;

    @Column()
    fromUsername: string;

    @Column({ type: "blob" })
    public question: string;

    @ManyToMany(type => HelpBotTag)
    @JoinTable()
    public tags: HelpBotTag[];

}
