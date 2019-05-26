import { Command, CommandBase, CommandParser, DB, Event, Logger } from '@autobot/common';
import { RichEmbed }                                              from 'discord.js';
import { HelpBotQuestion }                                        from '../DB/HelpBotQuestion';
import { HelpBotQuestionStatus }                                  from '../DB/HelpBotQuestionStatus';
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
            entities: [ HelpBotQuestion, HelpBotTag ],
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

        const tags = command.obj.content.match(/#([a-z0-9]+)/gi);

        //
        // Search by tags only.
        //
        if (tags && tags.length > 0) {

            const cleanTags: Array<string> = [];

            for (let i = 0; i < tags.length; i++) {

                console.log(tags[ i ]);

                if (tags[ i ].match(/^#[a-z0-9]+$/)) {

                    cleanTags.push(tags[ i ].replace('#', ''));

                }

            }

            const results: Array<HelpBotQuestion> = await DB.connection.manager.query('' +
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

            if (results.length > 0) {

                const embed = new RichEmbed().setTitle('Search Results');

                results.forEach(result => {

                    embed.addField(`#${ result.id } (${ result.status })`, result.question);

                });

                command.obj.reply(embed);

            } else {

                command.obj.reply(new RichEmbed().setTitle('Search Results').setDescription(`No questions found.`));

            }

        } else {

            let results: Array<HelpBotQuestion>;

            console.log(command.namedarguments);

            let status = HelpBotQuestionStatus.NEW;

            if (command.namedarguments.status) {

                status = command.namedarguments.status;

            }

            if (command.namedarguments.id) {

                results = await DB.connection.getRepository(HelpBotQuestion)
                                  .createQueryBuilder('t')
                                  .select([ '*' ])
                                  .where('id = :id AND status = :status', {

                                      id: command.namedarguments.id,
                                      status

                                  })
                                  .getRawMany();

            } else if (command.arguments[ 0 ].name === 'all') {

                results = await DB.connection.manager.query('SELECT * FROM help_bot_question');

            } else if (command.namedarguments.status) {

                results = await DB.connection
                                  .getRepository(HelpBotQuestion)
                                  .createQueryBuilder('t')
                                  .select([ '*' ])
                                  .where('status LIKE :status COLLATE utf8_general_ci', {

                                      status: command.namedarguments.status

                                  })
                                  .getRawMany();
            } else {

                results = await DB.connection
                                  .getRepository(HelpBotQuestion)
                                  .createQueryBuilder('t')
                                  .select([ '*' ])
                                  .where('question LIKE :terms COLLATE utf8_general_ci', {

                                      terms: '%' + command.arguments[ 0 ].name + '%'

                                  })
                                  .getRawMany();
            }

            if (results.length > 0) {

                const embed = new RichEmbed().setTitle('Search Results');

                results.forEach(result => {

                    embed.addField(`#${ result.id } (${ result.status })`, result.question);

                });

                command.obj.reply(embed);

            } else {

                command.obj.reply(new RichEmbed().setTitle('Search Results').setDescription(`No questions found.`));

            }

        }

        Logger.log(`AskCommand.search: ${ command.obj.content }`);

    }

}
