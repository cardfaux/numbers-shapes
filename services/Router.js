const Router = {
  init: () => {
    document.querySelectorAll('a.navlink').forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const route = event.target.getAttribute('href');
        Router.go(route);
      });
    });
    window.addEventListener('popstate', (event) => {
      Router.go(event.state.route, false);
    });
    Router.go(window.location.pathname);
  },
  go: (route, addToHistory = true) => {
    console.log(`Going To ${route}`);

    if (addToHistory) {
      window.history.pushState({ route }, null, route);
    }

    let pageElement = null;

    switch (route) {
      case '/':
        pageElement = document.createElement('input-page');
        pageElement.textContent = 'Input Page';
        break;
      case '/thanks':
        pageElement = document.createElement('thanks-page');
        pageElement.innerHTML = '<h1>Thank You!!!</h1>';
        break;
      default:
        pageElement = document.createElement('input-page');
        pageElement.textContent = 'Input Page';
    }

    if (pageElement) {
      const cache = document.querySelector('main');
      cache.innerHTML = '';
      cache.appendChild(pageElement);
      window.scrollX = 0;
      window.scrollY = 0;
    }
  },
};

export default Router;
