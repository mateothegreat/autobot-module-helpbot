import { Command, CommandBase, CommandParser, DB, Event, Logger } from '@autobot/common';
import { RichEmbed }                                              from 'discord.js';
import { HelpBotQuestion }                                        from '../DB/HelpBotQuestion';

/**
 * Search the HelpDesk questions.
 *
 * Example: !search #javascript #js
 *
 */
@Command
export class DeleteCommand extends CommandBase {

    public constructor() {

        //
        // Set this commands configuration.
        //
        super({

            event: Event.MESSAGE,
            name: '!delete',
            group: 'help',
            description: 'Delete a HelpDesk questions.',
            entities: [ HelpBotQuestion ],
            roles: [ 'admin' ],
            params: [

                {

                    name: 'id'

                }

            ]

        });

    }

    //
    // Called when a command matches config.name.
    //
    public async run(command: CommandParser) {

        const deleted = await DB.connection.createQueryBuilder().delete().from(HelpBotQuestion).where('id = :id', { id: command.namedarguments.id }).execute();

        if (deleted.raw.affectedRows > 0) {

            command.obj.reply(new RichEmbed().setTitle('Delete macro').setDescription(`The question #${ command.namedarguments.id } has been deleted!`));

        } else {

            command.obj.reply(new RichEmbed().setTitle('Delete macro').setDescription(`The question #${ command.namedarguments.id } could not be deleted! Does it exist?`));

        }

        Logger.log(`AskCommand.delete: ${ command.obj.content }`);

    }

}
