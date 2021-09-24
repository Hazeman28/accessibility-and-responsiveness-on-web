import customElement from "../../helpers/custom-element.js";
import styles from "./app-base.css" assert { type: "css" };

export default customElement({
  styles,
  name: "app-base",
  templatePath: import.meta.url,
});
