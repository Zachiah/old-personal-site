import * as sapper from '@sapper/app';
import "./initializeFirebase.js";

sapper.start({
	target: document.querySelector('#sapper')
});