import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { HelpBotQuestion }                                                     from './HelpBotQuestion';

@Entity()
export class HelpBotComment {

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

    @Column()
    public comment: string;

    @ManyToOne(type => HelpBotQuestion, question => question.answers)
    public question: HelpBotQuestion;

}
