const Store = {
  input: null,
};

const proxiedStore = new Proxy(Store, {
  set(target, property, value) {
    target[property] = value;
    if (property == 'thanks') {
      window.dispatchEvent(new Event('app-thanks-change'));
    }
    if (property == 'input') {
      window.dispatchEvent(new Event('app-input-change'));
    }
    return true;
  },
});

export default proxiedStore;
