import { Command, CommandBase, CommandParser, DB, Event, Logger } from '@autobot/common';
import { RichEmbed }                                              from 'discord.js';
import { HelpBotAnswer }                                          from '../DB/HelpBotAnswer';
import { HelpBotQuestion }                                        from '../DB/HelpBotQuestion';

/**
 * Answer a HelpDesk question.
 *
 * Example: !search #javascript #js
 *
 */
@Command
export class AnswerCommand extends CommandBase {

    public constructor() {

        //
        // Set this commands configuration.
        //
        super({

            event: Event.MESSAGE,
            name: '!answer',
            group: 'help',
            description: 'Answer a HelpDesk question.',
            entities: [ HelpBotAnswer ]

        });

    }

    //
    // Called when a command matches config.name.
    //
    public async run(command: CommandParser) {

        //
        // First we need to find the question by id.
        //
        const question = await DB.connection.getRepository(HelpBotQuestion)
                                 .createQueryBuilder('t')
                                 .select([ '*' ])
                                 .where('id = :id', { id: command.namedarguments.id })
                                 .getRawOne();

        if (question) {

            let answer: HelpBotAnswer = new HelpBotAnswer();

            answer.fromUserid = command.obj.author.id;
            answer.fromDiscriminator = command.obj.author.discriminator;
            answer.fromUsername = command.obj.author.username;
            answer.answer = command.namedarguments.answer;
            answer.question = question;

            const result = await DB.connection.manager.save(answer);

            Logger.log(`AnswerCommand.run: ${ JSON.stringify(result) }`);

            command.obj.reply(new RichEmbed().setTitle('Answer Question').setDescription(`Your answer has eben submitted!`));

        } else {

            command.obj.reply(new RichEmbed().setTitle('Answer Question').setDescription(`Could not find question #${ command.namedarguments.id }`));

        }

    }

}
