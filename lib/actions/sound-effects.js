'use strict';
const fs = require('fs');
const path = require('path');

const SOUND_FX_CATEGORIES_DIR = path.join(__dirname, '../..', 'static/clips/categories');

function filterOutHiddenFiles(files) {
    const visible = [];

    if (Array.isArray(files)) {
        files.forEach(file => {
            if (file[0] !== '.') {
                visible.push(file);
            }
        });
    }

    return visible;
}

function getSoundEffectCategories() {
    return filterOutHiddenFiles(fs.readdirSync(SOUND_FX_CATEGORIES_DIR));
}

function getRandomSoundFx(soundFxCategory) {
    const defaultFx = 'super-mario';
    const categories = getSoundEffectCategories();

    if (categories.indexOf(soundFxCategory) >= 0) {
        const categoryDir = path.resolve(SOUND_FX_CATEGORIES_DIR, soundFxCategory);
        const soundFxFiles = filterOutHiddenFiles(fs.readdirSync(categoryDir));

        const randomIndex = Math.floor(Math.random() * soundFxFiles.length);
        return soundFxFiles[randomIndex];
    }

    return defaultFx;
}

module.exports = getRandomSoundFx;
