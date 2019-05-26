import { Command, CommandBase, CommandParser, DB, Event, Logger } from '@autobot/common';
import { RichEmbed }                                              from "discord.js";
import { HelpBotTag }                                             from '../DB/HelpBotTag';

/**
 * Delete a HelpDesk Tag.
 * Note: The tag must not be in use by questions!
 *
 * Example: !tagdelete name=<tagname>
 *
 */
@Command
export class TagDeleteCommand extends CommandBase {

    public constructor() {

        super({

            event: Event.MESSAGE,
            name: `${ process.env.HELPBOT_COMMAND_PREFIX }tagdelete`,
            group: 'help',
            description: 'Deletes a HelpDesk Tag.',
            entities: [ HelpBotTag ],
            roles: [ process.env.HELPBOT_ADMIN_ROLE_NAME ],
            params: [

                {
                    name: 'name',
                    required: true

                }

            ]

        });

    }

    public async run(command: CommandParser) {

        const deleted = await DB.connection.createQueryBuilder().delete().from(HelpBotTag).where('name = :name', { name: command.namedarguments.name }).execute();

        if (deleted.raw.affectedRows > 0) {

            command.obj.reply(new RichEmbed().setTitle('Delete Tag').setDescription(`The tag "${ command.namedarguments.name }" has been deleted!`));

        } else {

            command.obj.reply(new RichEmbed().setTitle('Delete Tag').setDescription(`The tag "${ command.namedarguments.name }" could not be deleted! Is it associated with question(s)?`));

        }

        Logger.log(`TagDeleteCommand.run: ${ command.obj.content }`);

    }

}
