'use strict';
const path = require('path');
const fileDuration = require('../helpers/file-duration');
const settings = require('../../settings');
const singlePlayerAnnouncement = require('../helpers/single-player-announcement');
const getRandomSoundFx = require('./sound-effects');

let port;

const localPathLocation = category => path.join(settings.webroot, `clips/categories/${category}`);

const backupPresets = {};

function playClip(player, values) {
  let announceVolume = settings.announceVolume || 40;

  const [category, soundFxName, volume] = values;
  const clipFileName = (soundFxName === 'random') ? getRandomSoundFx(category) : `${soundFxName}.mp3`;

  if (/^\d+$/i.test(volume)) {
    announceVolume = volume;
  }

  const playerEndpoint = [
    `http://${player.system.localEndpoint}:${port}`,
    'clips',
    'categories',
    category,
    clipFileName
  ].join('/');

  return fileDuration(path.join(localPathLocation(category), clipFileName))
    .then(duration => {
      return singlePlayerAnnouncement(player, playerEndpoint, announceVolume, duration);
    });
}

module.exports = function (api) {
  port = api.getPort();
  api.registerAction('clip', playClip);
};
