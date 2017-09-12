import Game from './engine/game';
import Data from './data/base';

import {Title} from './states/title';
import {Intro} from './states/intro';
import {Main} from './states/main';

import {P1} from './entities/p1';
import {Carrot} from './entities/carrot';
import {Hog} from './entities/hog';
import {Hornet} from './entities/hornet';
import {Bat} from './entities/bat';
import {Text} from './entities/text';
import {Boom} from './entities/boom';
import {Bunny} from './entities/bunny';
import {Fade} from './entities/fade';

import SoundFX from '../lib/soundfx';

const options = Data;
options.states = {title : Title, main: Main, intro: Intro};
options.ents = {p1: P1, carrot: Carrot, text: Text, hog: Hog, hornet: Hornet, bat: Bat, boom: Boom, bunny: Bunny, fade: Fade};
options.SoundFX = SoundFX;

new Game(options).init();


