import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { HelpBotAnswer }                                                                              from './HelpBotAnswer';
import { HelpBotTag }                                                                                 from './HelpBotTag';

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

    @OneToMany(type => HelpBotAnswer, answer => answer.question)
    public answers: HelpBotAnswer[];

}
