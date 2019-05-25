import { Command, CommandBase, CommandParser, DB, Event } from '@autobot/common';
import { HelpBotQuestion }                                from '../DB/HelpBotQuestion';
import { HelpBotTag }                                     from '../DB/HelpBotTag';

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
    public run(command: CommandParser): void {

        //
        // First we try to detect for thank you and thanks.
        //
        let question: HelpBotQuestion = new HelpBotQuestion();

        question.fromUserid = command.obj.author.id;
        question.fromDiscriminator = command.obj.author.discriminator;
        question.fromUsername = command.obj.author.username;
        question.question = command.obj.content;

        DB.connection.manager.save(question);

        const tags = command.obj.content.match(/#([a-z0-9]+)/gi);

        console.log(tags);

        if (tags && tags.length > 0) {

            tags.forEach(tag => {



            });

        }

    }

}
