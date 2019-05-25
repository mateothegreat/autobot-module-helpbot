import { Command, CommandBase, CommandParser, DB, Event } from '@autobot/common';
import { HelpBotQuestion }                                from '../DB/HelpBotQuestion';
import { HelpBotTag }                                     from '../DB/HelpBotTag';

/**
 * Searches each message for thank you or thanks.
 */
@Command
export class AskCommand extends CommandBase {

    public constructor() {

        //
        // Set this commands configuration.
        //
        super({

            event: Event.MESSAGE,
            name: '*',
            group: 'events',
            description: 'Searches each message for thank you or thanks.',
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

        DB.connection.manager.save(question);

        const tags = command.obj.content.match(/#([a-z0-9]+)/gi);

        console.log(tags);
        
        if (tags && tags.length > 0) {

            // BOT.client.fetchUser(userids[ i ]).then((member: User) => {

            //
            // Now we extract the user id(s).
            //
        }

    }

}
