import { chatClient } from '../twitchSetup';
import { commands } from '../commandSetup';
import { log } from '../utils';

log('| Setting up events...');

chatClient.onMessage((channel, user, message) => {
    if (!['vaeben', 'morlega'].includes(user)) return;

    const [messageCmd, ...messageArgs] = message.trim().split(/\s+/g);

    const command = commands.find(({ cmds }) => cmds[messageCmd]);

    if (!command) return;

    log(user, 'sent command', `'${command.name}'`, 'in', `'${channel}'`, ...(messageArgs.length ? ['with args', messageArgs] : []), `('${message}')`);

    command.func({
        channel,
        user,
        rawMessage: message,
        cmdArgs: messageArgs,
    });
});

log('Events ready!');
