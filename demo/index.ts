import UI from "../src";

(() => {
  const element = document.querySelector<HTMLElement>("jsgbc-ui");
  new UI(element)
    .addListener("down", (e) => {
      console.log("down", e.detail.button);
    })
    .addListener("up", (e) => {
      console.log("up", e.detail.button);
    });
})();