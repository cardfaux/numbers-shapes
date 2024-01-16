import Store from './services/Store.js';
import Router from './services/Router.js';

import { ThanksPage } from './components/ThanksPage.js';
import { InputPage } from './components/InputPage.js';

window.app = {};
app.store = Store;
app.router = Router;

window.addEventListener('DOMContentLoaded', () => {
  app.router.init();
});
