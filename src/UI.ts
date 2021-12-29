import { EventEmitter } from "events";

export default class UI extends EventEmitter {
  constructor(
    private element: HTMLElement
  ) {
    super();

    console.log("init done");
  }
}
