import { Command, CommandBase, CommandParser, Event } from '@autobot/common';
import { RichEmbed }                                  from "discord.js";

/**
 *
 */
@Command
export class ColourCommand extends CommandBase {

    public constructor() {

        //
        // Set this commands configuration.
        //
        super({

            event: Event.MESSAGE,
            name: 'asdf',
            group: 'fun',
            description: 'Returns an embed with the color passed to it.'

        });

    }

    /**
     * Called when a command matches config.name.
     *
     * @param command Parsed out commamd
     *
     */
    public async run(command: CommandParser) {

        const matches = command.arguments[ 0 ].name.match(/#(.*)/);

        if (matches.length > 0) {

            const embed = new RichEmbed().setColor(parseInt(matches[ 1 ], 16))
                                         .setDescription(`#${ matches[ 1 ] }`);

            command.obj.channel.send(embed);

        }

    }

}
