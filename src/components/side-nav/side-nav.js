import customElement from "../../helpers/custom-element.js";
import styles from "./side-nav.css" assert { type: "css" };

export default customElement({
  styles,
  name: "side-nav",
  templatePath: import.meta.url,
});
