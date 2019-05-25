import { Command, CommandBase, CommandParser, DB, Event } from '@autobot/common';
import { RichEmbed }                                      from "discord.js";
import { Macro }                                          from '../../../autobot-module-macro-system/src/DB/Macro';
import { HelpBotTag }                                     from '../DB/HelpBotTag';

/**
 * Creates a new HelpDesk Tag.
 *
 * Example: !addtag name=newtag,description=some new description
 *
 */
@Command
export class TagAddCommand extends CommandBase {

    public constructor() {

        //
        // Set this commands configuration.
        //
        super({

            event: Event.MESSAGE,
            name: '++tag',
            group: 'help',
            description: 'Creates a new HelpDesk Tag.',
            entities: [ HelpBotTag ],
            roles: [ 'admin' ],
            params: [

                {
                    name: 'name',
                    required: true

                }, {

                    name: 'description',
                    required: false

                }

            ]

        });

    }

    //
    // Called when a command matches config.name.
    //
    public async run(command: CommandParser) {

        //
        // First we try to retrieve the macro by name.
        //
        const result = await DB.connection.getRepository(HelpBotTag)
                               .createQueryBuilder('t')
                               .select([ '*' ])
                               .where('name = :name', { name: command.namedarguments.name })
                               .getRawOne();

        //
        // HelpBotQuestion exists, so let's update it else we create a new one.
        //
        if (result) {

            result.name = command.namedarguments.name;
            result.description = command.namedarguments.description;

            DB.connection
              .createQueryBuilder()
              .update(HelpBotTag)
              .set(result)
              .where('id = :id', { id: result.id })
              .execute();

            command.obj.reply(new RichEmbed().setTitle('Update HelpBotTag').setDescription(`The tag \`++${ command.namedarguments.name }\` has been updated!`));

        } else {

            const macro: Macro = new Macro();

            macro.name = command.namedarguments.name;
            macro.message = command.namedarguments.message;

            DB.connection.manager.save(macro);

            command.obj.reply(new RichEmbed().setTitle('Create HelpBotTag').setDescription(`The tag \`++${ command.namedarguments.name }\` has been created!`));

        }
        
    }

}
