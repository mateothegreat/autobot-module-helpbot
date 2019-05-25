import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { HelpBotQuestion }                                                                 from './HelpBotQuestion';

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

    @OneToMany(type => HelpBotQuestion)
    @JoinColumn()
    public question: HelpBotQuestion;

}
