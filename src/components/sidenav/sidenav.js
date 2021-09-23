import rubiconElement from "../../helpers/rubicon-element.js";
import styles from "./sidenav.css" assert { type: "css" };


function Sidenav({ shadowRoot }) {
}

export default rubiconElement(Sidenav, {
  styles,
  templatePath: ["./sidenav.html", import.meta.url],
});
