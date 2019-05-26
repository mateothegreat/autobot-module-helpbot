import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { HelpBotAnswer }                                                                              from './HelpBotAnswer';
import { HelpBotComment }                                                                             from './HelpBotComment';
import { HelpBotQuestionStatus }                                                                      from './HelpBotQuestionStatus';
import { HelpBotTag }                                                                                 from './HelpBotTag';

@Entity()
export class HelpBotQuestion {

    @PrimaryGeneratedColumn()
    public id: number;

    @CreateDateColumn()
    public stampCreated: Date;

    @Column()
    public fromUserid: string;

    @Column()
    public fromDiscriminator: string;

    @Column()
    public fromUsername: string;

    @Column({ type: 'enum', enum: HelpBotQuestionStatus, default: HelpBotQuestionStatus.NEW })
    public status: string;

    @Column({ type: "blob" })
    public question: string;

    @ManyToMany(type => HelpBotTag)
    @JoinTable()
    public tags: HelpBotTag[];

    @OneToMany(type => HelpBotAnswer, answer => answer.question)
    public answers: HelpBotAnswer[];

    @OneToMany(type => HelpBotComment, comment => comment.question)
    public comments: HelpBotComment[];

}
