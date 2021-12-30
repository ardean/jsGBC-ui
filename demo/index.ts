import UI from "../src";

(() => {
  const element = document.querySelector<HTMLElement>("jsgbc-ui");
  const ui = new UI(element)
    .addListener("ButtonDown", (buttonName: string) => {
      console.log("ButtonDown", buttonName);
    })
    .addListener("ButtonUp", (buttonName: string) => {
      console.log("ButtonUp", buttonName);
    });

  ui.setLoading(true);

  setTimeout(() => {
    ui.setLoading(false);

    setTimeout(() => {
      ui.setFullscreen(true);

      setTimeout(() => {
        ui.setFullscreen(false);
      }, 1000);
    }, 1000);
  }, 1000);
})();