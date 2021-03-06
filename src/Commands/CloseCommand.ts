import { Command, CommandBase, CommandParser, DB, Event, Logger } from '@autobot/common';
import { RichEmbed }                                              from 'discord.js';
import { HelpBotQuestion }                                        from '../DB/HelpBotQuestion';
import { HelpBotQuestionStatus }                                  from '../DB/HelpBotQuestionStatus';

/**
 * Search the HelpDesk questions.
 *
 * Example: !search #javascript #js
 *
 */
@Command
export class CloseCommand extends CommandBase {

    public constructor() {

        //
        // Set this commands configuration.
        //
        super({

            event: Event.MESSAGE,
            name: `${ process.env.HELPBOT_COMMAND_PREFIX }close`,
            group: 'help',
            description: 'Close a HelpDesk question.',
            entities: [ HelpBotQuestion ],
            roles: [ process.env.HELPBOT_ADMIN_ROLE_NAME ],
            params: [

                {

                    name: 'id',
                    required: true

                }

            ]

        });

    }

    //
    // Called when a command matches config.name.
    //
    public async run(command: CommandParser) {

        const result = await DB.connection.getRepository(HelpBotQuestion)
                               .createQueryBuilder('t')
                               .select([ '*' ])
                               .where('id = :id', { id: command.namedarguments.id })
                               .getRawOne();

        if (result) {

            result.status = HelpBotQuestionStatus.ANSWERED;

            DB.connection
              .createQueryBuilder()
              .update(HelpBotQuestion)
              .set(result)
              .where('id = :id', { id: result.id })
              .execute();

            command.obj.reply(new RichEmbed().setTitle('Delete macro').setDescription(`The question #${ command.namedarguments.id } has been marked as answered!`));

        } else {

            command.obj.reply(new RichEmbed().setTitle('Delete macro').setDescription(`The question #${ command.namedarguments.id } could not be answered! Does it exist?`));

        }

        Logger.log(`AskCommand.close: ${ command.obj.content }`);

    }

}
