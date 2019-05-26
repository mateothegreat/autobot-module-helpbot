import { Command, CommandBase, CommandParser, DB, Event, Logger } from '@autobot/common';
import { HelpBotQuestion }                                        from '../DB/HelpBotQuestion';
import { HelpBotTag }                                             from '../DB/HelpBotTag';

/**
 * Search the HelpDesk questions.
 *
 * Example: !search #javascript #js
 *
 */
@Command
export class SearchCommand extends CommandBase {

    public constructor() {

        //
        // Set this commands configuration.
        //
        super({

            event: Event.MESSAGE,
            name: '!search',
            group: 'help',
            description: 'Search the HelpDesk questions.',
            entities: [ HelpBotQuestion, HelpBotTag ]

        });

    }

    //
    // Called when a command matches config.name.
    //
    public async run(command: CommandParser) {

        const tags = command.obj.content.match(/#([a-z0-9]+)/gi);
        const cleanTags: Array<string> = [];

        console.log(tags);

        for (let i = 1; i < tags.length; i++) {

            console.log(tags[ i ]);

            if (tags[ i ].match(/^[a-z0-9]+$/)) {

                cleanTags.push(tags[ i ]);

            }

        }

        const sql = '' +
            '                                                                                   ' +
            'SELECT q.*                                                                         ' +
            '                                                                                   ' +
            'FROM help_bot_tag t                                                                ' +
            '                                                                                   ' +
            'INNER JOIN help_bot_question_tags_help_bot_tag link ON link.helpBotTagId = t.id    ' +
            'INNER JOIN help_bot_question q ON q.id = link.helpBotQuestionId                    ' +
            '                                                                                   ' +
            'WHERE t.name IN(\'' + cleanTags.join('\', \'') + '\')                              ' +
            '                                                                                   ' +
            '';

        console.log(sql);


        const result = await DB.connection.manager.query('' +
            '                                                                                   ' +
            'SELECT q.*                                                                         ' +
            '                                                                                   ' +
            'FROM help_bot_tag t                                                                ' +
            '                                                                                   ' +
            'INNER JOIN help_bot_question_tags_help_bot_tag link ON link.helpBotTagId = t.id    ' +
            'INNER JOIN help_bot_question q ON q.id = link.helpBotQuestionId                    ' +
            '                                                                                   ' +
            'WHERE t.name IN(\'' + cleanTags.join('\', \'') + '\')                              ' +
            '                                                                                   ' +
            '');

        console.log(result);

        if (result) {


        }

        // command.obj.reply(new RichEmbed().setTitle('Ask New Question').setDescription(`Your question has ben submitted! Here is your ticket number: #${ result.id }`));

        Logger.log(`AskCommand.search: ${ command.obj.content }`);

    }

}
