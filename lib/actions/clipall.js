'use strict';
const path = require('path');
const settings = require('../../settings');
const allPlayerAnnouncement = require('../helpers/all-player-announcement');
const fileDuration = require('../helpers/file-duration');
const getRandomSoundFx = require('./sound-effects');

let port;

const localPathLocation = category => path.join(settings.webroot, `clips/categories/${category}`);

function playClipOnAll(player, values) {
    let announceVolume = settings.announceVolume || 40;

    const [category, soundFxName, volume] = values;
    const clipFileName = (soundFxName === 'random') ? getRandomSoundFx(category) : `${soundFxName}.mp3`;

    if (/^\d+$/i.test(volume)) {
        announceVolume = volume;
    }

    return fileDuration(path.join(localPathLocation(category), clipFileName))
        .then(duration => {
            return allPlayerAnnouncement(player.system, `http://${player.system.localEndpoint}:${port}/clips/categories/${category}/${clipFileName}`, announceVolume, duration);
        });
}

module.exports = function (api) {
    port = api.getPort();
    api.registerAction('clipall', playClipOnAll);
};
