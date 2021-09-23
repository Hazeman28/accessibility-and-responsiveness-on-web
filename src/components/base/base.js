import rubiconElement from "../../helpers/rubicon-element.js";
import styles from "./base.css" assert { type: "css" };

export default rubiconElement(null, {
  styles,
  name: "base",
  templatePath: ["./base.html", import.meta.url],
});
