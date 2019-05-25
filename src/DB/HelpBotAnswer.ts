import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { HelpBotQuestion }                                                                from './HelpBotQuestion';

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

    @OneToOne(type => HelpBotQuestion)
    @JoinColumn()
    public question: HelpBotQuestion;

}
