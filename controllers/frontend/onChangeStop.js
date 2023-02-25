function onChangeStop({ callback, name }) {
  let waitTime = 1000;

  if (!name) name = callback.name;
  let timer = window["timer-" + name];

  if (timer) clearTimeout(timer);
  window["timer-" + name] = setTimeout(() => {
    callback();
  }, waitTime);
}

export default onChangeStop;
