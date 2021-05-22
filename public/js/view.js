import * as views from './modules/views.js';

function addTheme(btn) {
    const modal = views.addTheme();
    console.log(modal)
    $(btn).after (modal)
}

export {
    addTheme
}