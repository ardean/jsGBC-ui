Polymer({
  is: "jsgbc-ui",
  properties: {
    loading: Boolean
  },
  listeners: {
    "up.down": "handleDown",
    "up.up": "handleUp",
    "right.down": "handleDown",
    "right.up": "handleUp",
    "down.down": "handleDown",
    "down.up": "handleUp",
    "left.down": "handleDown",
    "left.up": "handleUp",
    "a.down": "handleDown",
    "a.up": "handleUp",
    "b.down": "handleDown",
    "b.up": "handleUp",
    "start.down": "handleDown",
    "start.up": "handleUp",
    "select.down": "handleDown",
    "select.up": "handleUp"
  },
  handleDown: function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.fire("down", { button: e.currentTarget.id });
    return false;
  },
  handleUp: function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.fire("up", { button: e.currentTarget.id });
    return false;
  }
});
