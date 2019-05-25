import { Command, CommandBase, CommandParser, DB, Event, Logger } from '@autobot/common';
import { Channel, RichEmbed }                                     from 'discord.js';
import { HelpBotQuestion }                                        from '../DB/HelpBotQuestion';
import { HelpBotTag }                                             from '../DB/HelpBotTag';

/**
 * Submits a question to the HelpDesk.
 *
 * Example: !ask how do I loop in javascript? #javascript #js
 *
 */
@Command
export class AskCommand extends CommandBase {

    public constructor() {

        //
        // Set this commands configuration.
        //
        super({

            event: Event.MESSAGE,
            name: '!ask',
            group: 'help',
            description: 'Submits a question to the HelpDesk',
            entities: [ HelpBotQuestion, HelpBotTag ]

        });

    }

    //
    // Called when a command matches config.name.
    //
    public async run(command: CommandParser) {

        //
        // First we try to detect for thank you and thanks.
        //
        let question: HelpBotQuestion = new HelpBotQuestion();

        question.fromUserid = command.obj.author.id;
        question.fromDiscriminator = command.obj.author.discriminator;
        question.fromUsername = command.obj.author.username;
        question.question = command.obj.content;
        question.tags = [];

        const tags = command.obj.content.match(/#([a-z0-9]+)/gi);

        if (tags && tags.length > 0) {

            for (let i = 0; i < tags.length; i++) {

                const tag = await DB.connection.getRepository(HelpBotTag)
                                    .createQueryBuilder('t')
                                    .select([ '*' ])
                                    .where('name = :name', { name: tags[ i ].replace('#', '') })
                                    .getRawOne();

                question.tags.push(tag);

            }

        }

        const result = await DB.connection.manager.save(question);

        command.obj.reply(new RichEmbed().setTitle('Ask New Question').setDescription(`Your question has ben submitted! Here is your ticket number: #${ result.id }`));


        const channel: Channel = await command.obj.client.channels.find(channel => channel.id === process.env.HELPBOT_QUESTIONS_CHANNEL_ID);

        if (channel) {

            // @ts-ignore
            channel.sendEmbed(new RichEmbed().setTitle('New Question')
                                             .addField('Requestor', `<@${ command.obj.author.id }>`)
                                             .addField('Tags', tags.join(', '))
                                             .setDescription(command.obj.content));

        }


        Logger.log(`AskCommand.run: ${ JSON.stringify(result) }`);

    }

}
