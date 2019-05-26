import { Command, CommandBase, CommandParser, DB, Event, Logger } from '@autobot/common';
import { RichEmbed }                                              from 'discord.js';
import { HelpBotComment }                                         from '../DB/HelpBotComment';
import { HelpBotQuestion }                                        from '../DB/HelpBotQuestion';

/**
 * Adds a comment to a question.
 *
 * Example: !comment id=<#>, comment=<insert comment data here>
 *
 */
@Command
export class CommentAddCommand extends CommandBase {

    public constructor() {

        super({

            event: Event.MESSAGE,
            name: '?comment',
            group: 'help',
            description: 'Adds a comment to a question.',
            entities: [ HelpBotComment ],
            roles: [ process.env.HELPBOT_ADMIN_ROLE_NAME ],

        });

    }

    //
    // Called when a command matches config.name.
    //
    public async run(command: CommandParser) {

        //
        // First we need to find the question by id.
        //
        const question: HelpBotQuestion = await DB.connection.getRepository(HelpBotQuestion)
                                                  .createQueryBuilder('t')
                                                  .select([ '*' ])
                                                  .where('id = :id', { id: command.namedarguments.id })
                                                  .getRawOne();

        if (question) {

            let comment: HelpBotComment = new HelpBotComment();

            comment.fromUserid = command.obj.author.id;
            comment.fromDiscriminator = command.obj.author.discriminator;
            comment.fromUsername = command.obj.author.username;
            comment.comment = command.namedarguments.comment;

            console.log(comment);

            const result = await DB.connection.manager.save(comment);

            Logger.log(`CommentAddCommand.run: ${ JSON.stringify(result) }`);

            command.obj.reply(new RichEmbed().setTitle('Answer Question').setDescription(`Your comment has been submitted!`));

            command.obj.guild.fetchMember(question.fromUserid).then(user => {

                user.sendEmbed(new RichEmbed().setTitle('You have a comment!').setDescription(command.namedarguments.comment));

            });

        } else {

            command.obj.reply(new RichEmbed().setTitle('Answer Question').setDescription(`Could not find question #${ command.namedarguments.id }`));

        }

    }

}
