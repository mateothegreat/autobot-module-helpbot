# HelpBot for discord

Helpbot manages questions submitted by users.

## Installation

Install the node module in your bot project root directory:

```
npm install @autobot/module-helpbot
```

Add the following configuration variable to your `.env` file to receive all HelpBot messages in a channel:

```
HELPBOT_QUESTIONS_CHANNEL_ID=<some channel id>
```

## Commands

| Command                                                           | Description                                                       |
|-------------------------------------------------------------------|-------------------------------------------------------------------|
| `!search all`                                                     | Returns all questions.                                            |
| `!search <terms>`                                                 | Searches all questions.                                           |
| `!search id=<#>`                                                  | Retrieve a question by id.                                        |
| `!search status=<new|answered>`                                   | Searches questions by status.                                     |
| `!answer id=<#>, answer=<insert answer here>`                     | Answers a question, user receives a copy via direct message.      |
| `!close id=<#>`                                                   | Closes a question ticket.                                         |
| `!delete id=<#>`                                                  | Delete a question by it's id #.                                   |
| `++tag name=<tag name>, description=<tag description - optional>` | Creates a new tag.                                                |
| `--tag name=<tag name>`                                           | Delete a tag by name.                                             |
