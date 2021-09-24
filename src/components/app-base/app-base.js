import styles from "./app-base.css" assert { type: "css" };

export default {
  styles,
  name: "app-base",
  template: import.meta.url,
  onConnect: () => {
    document.body.style.setProperty("overflow-x", "hidden");
  },
  onDisconnect: () => {
    document.body.style.setProperty("overflow-x", "initial");
  },
};
