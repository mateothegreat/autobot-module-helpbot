import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { HelpBotQuestion }                                                     from './HelpBotQuestion';

@Entity()
export class HelpBotAnswer {

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
    public answer: string;

    @ManyToOne(type => HelpBotQuestion, question => question.answers)
    public question: HelpBotQuestion;

}
