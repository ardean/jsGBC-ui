import { EventEmitter } from "events";

export default class UI extends EventEmitter {
  innerElement: HTMLDivElement;

  loadingElement: HTMLDivElement;
  loadingSlotElement: HTMLElement;

  lcdElement: HTMLDivElement;
  lcdSlotElement: HTMLElement;

  constructor(
    private element: HTMLElement
  ) {
    super();

    this.element.classList.add("jsgbc-ui");

    this.loadingSlotElement = this.element.querySelector<HTMLElement>("[slot='loading']");
    if (this.loadingSlotElement) {
      this.loadingSlotElement.classList.add("jsgbc-ui-loading-slot");
      this.element.removeChild(this.loadingSlotElement);
    }

    this.lcdSlotElement = this.element.querySelector<HTMLElement>("[slot='lcd']");
    if (this.lcdSlotElement) {
      this.lcdSlotElement.classList.add("jsgbc-ui-lcd-slot");
      this.element.removeChild(this.lcdSlotElement);
    }

    this.createElements();
    this.setLoading(false);
  }

  createElements() {
    const innerElement = this.innerElement = document.createElement("div");
    innerElement.classList.add("jsgbc-ui-inner");
    this.element.appendChild(innerElement);

    const bodyElement = document.createElement("div");
    bodyElement.classList.add("jsgbc-ui-body");
    innerElement.appendChild(bodyElement);

    const screenFrameElement = document.createElement("div");
    screenFrameElement.classList.add("jsgbc-ui-screen-frame");
    bodyElement.appendChild(screenFrameElement);

    const screenElement = document.createElement("div");
    screenElement.classList.add("jsgbc-ui-screen");
    screenFrameElement.appendChild(screenElement);

    const loadingElement = this.loadingElement = document.createElement("div");
    loadingElement.classList.add("jsgbc-ui-loading");
    screenElement.appendChild(loadingElement);

    if (this.loadingSlotElement) loadingElement.appendChild(this.loadingSlotElement);

    const lcdElement = this.lcdElement = document.createElement("div");
    lcdElement.classList.add("jsgbc-ui-lcd");
    screenElement.appendChild(lcdElement);

    if (this.lcdSlotElement) lcdElement.appendChild(this.lcdSlotElement);

    const screenFrameBottomElement = document.createElement("div");
    screenFrameBottomElement.classList.add("jsgbc-ui-screen-frame-bottom");
    bodyElement.appendChild(screenFrameBottomElement);

    const screenFrameEndElement = document.createElement("div");
    screenFrameEndElement.classList.add("jsgbc-ui-screen-frame-end");
    bodyElement.appendChild(screenFrameEndElement);

    const middleElement = document.createElement("div");
    middleElement.classList.add("jsgbc-ui-middle");
    bodyElement.appendChild(middleElement);

    const dpadElement = this.createDPadElement();
    middleElement.appendChild(dpadElement);

    const buttonsRightElement = document.createElement("div");
    buttonsRightElement.classList.add("jsgbc-ui-buttons-right");
    middleElement.appendChild(buttonsRightElement);

    const buttonAElement = this.createRoundButtonElement("A");
    buttonsRightElement.appendChild(buttonAElement);

    const buttonBElement = this.createRoundButtonElement("B");
    buttonsRightElement.appendChild(buttonBElement);

    const bottomElement = document.createElement("div");
    bottomElement.classList.add("jsgbc-ui-bottom");
    bodyElement.appendChild(bottomElement);

    const buttonSelectElement = this.createLongButtonElement("Select");
    buttonSelectElement.classList.add("jsgbc-ui-select");
    bottomElement.appendChild(buttonSelectElement);

    const buttonStartElement = this.createLongButtonElement("Start");
    buttonStartElement.classList.add("jsgbc-ui-start");
    bottomElement.appendChild(buttonStartElement);

    const bodyEndElement = document.createElement("div");
    bodyEndElement.classList.add("jsgbc-ui-body-end");
    innerElement.appendChild(bodyEndElement);
  }

  createLongButtonElement(buttonName: string) {
    const buttonWrapperElement = document.createElement("div");

    const buttonElement = this.createButtonElement(buttonName);
    buttonWrapperElement.appendChild(buttonElement);

    const bottonLabelElement = document.createElement("div");
    bottonLabelElement.classList.add("jsgbc-ui-bottom-label");
    bottonLabelElement.textContent = buttonName;
    buttonWrapperElement.appendChild(bottonLabelElement);

    return buttonWrapperElement;
  }

  createRoundButtonElement(buttonName: string) {
    const buttonWrapperElement = document.createElement("div");

    const buttonElement = this.createButtonElement(buttonName);
    buttonWrapperElement.appendChild(buttonElement);

    const buttonLabelElement = document.createElement("div");
    buttonLabelElement.classList.add("jsgbc-ui-button-label");
    buttonLabelElement.textContent = buttonName;
    buttonElement.appendChild(buttonLabelElement);

    return buttonWrapperElement;
  }

  createDPadElement() {
    const dpadElement = document.createElement("div");
    dpadElement.classList.add("jsgbc-ui-dpad");

    const buttonUpElement = this.createButtonElement("Up");
    buttonUpElement.classList.add("jsgbc-ui-dpad-button");
    dpadElement.appendChild(buttonUpElement);

    const dpadMiddleElement = document.createElement("div");
    dpadMiddleElement.classList.add("jsgbc-ui-dpad-middle");
    dpadElement.appendChild(dpadMiddleElement);

    const buttonLeftElement = this.createButtonElement("Left");
    buttonLeftElement.classList.add("jsgbc-ui-dpad-button");
    dpadMiddleElement.appendChild(buttonLeftElement);

    const dpadEmptyElement = document.createElement("div");
    dpadEmptyElement.classList.add("jsgbc-ui-dpad-empty");
    dpadMiddleElement.appendChild(dpadEmptyElement);

    const buttonRightElement = this.createButtonElement("Right");
    buttonRightElement.classList.add("jsgbc-ui-dpad-button");
    dpadMiddleElement.appendChild(buttonRightElement);

    const buttonDownElement = this.createButtonElement("Down");
    buttonDownElement.classList.add("jsgbc-ui-dpad-button");
    dpadElement.appendChild(buttonDownElement);

    return dpadElement;
  }

  createButtonElement(buttonName: string) {
    const buttonElement = document.createElement("div");
    buttonElement.classList.add(
      "jsgbc-ui-button",
      "jsgbc-ui-button-" + buttonName.toLowerCase()
    );
    buttonElement.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.emit("ButtonDown", buttonName);
    });
    buttonElement.addEventListener("pointerup", (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.emit("ButtonUp", buttonName);
    });

    return buttonElement;
  }

  setLoading(loading: boolean) {
    if (loading) {
      this.loadingElement.style.display = "flex";
      this.lcdElement.style.display = "none";
      this.lcdSlotElement.style.display = "none";
    } else {
      this.loadingElement.style.display = "none";
      this.lcdElement.style.display = "flex";
      this.lcdSlotElement.style.display = "flex";
    }
  }

  setFullscreen(fullscreen: boolean) {
    const fullscreenClassName = "jsgbc-ui-fullscreen";
    const hasClass = this.innerElement.classList.contains(fullscreenClassName);
    if (fullscreen && !hasClass) {
      this.innerElement.classList.add(fullscreenClassName);
    } else if (!fullscreen && hasClass) {
      this.innerElement.classList.remove(fullscreenClassName);
    }
  }
}
