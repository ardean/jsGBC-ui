Polymer({
  is: "jsgbc-ui",
  properties: {
    loading: {
      type: Boolean,
      observer: "_loadingChanged"
    }
  },
  listeners: {
    "up.down": "_handleDown",
    "up.up": "_handleUp",
    "right.down": "_handleDown",
    "right.up": "_handleUp",
    "down.down": "_handleDown",
    "down.up": "_handleUp",
    "left.down": "_handleDown",
    "left.up": "_handleUp",
    "a.down": "_handleDown",
    "a.up": "_handleUp",
    "b.down": "_handleDown",
    "b.up": "_handleUp",
    "start.down": "_handleDown",
    "start.up": "_handleUp",
    "select.down": "_handleDown",
    "select.up": "_handleUp"
  },
  attached: function() {
    this.screenElement = this.$.screen;
    this.lcdElement = this.$.lcd.querySelector("*");
    this.lcdElement.classList.add("flex");
    this._loadingChanged(this.loading);
  },
  _loadingChanged: function(newValue) {
    if (!this.lcdElement) return;
    if (newValue) {
      this.$.loading.style.display = "flex";
      this.$.lcd.style.display = "none";
      this.lcdElement.style.display = "none";
    } else {
      this.$.loading.style.display = "none";
      this.$.lcd.style.display = "flex";
      this.lcdElement.style.display = "flex";
    }
  },
  _handleDown: function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.fire("down", { button: e.currentTarget.id });
    return false;
  },
  _handleUp: function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.fire("up", { button: e.currentTarget.id });
    return false;
  }
});
