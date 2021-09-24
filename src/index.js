import AppBase from "./components/app-base/app-base.js";
import CounterButton from "./components/counter-button/counter-button.js";
import ReferenceList from "./components/reference-list/reference-list.js";
import ReferenceListItem from "./components/reference-list/reference-list-item.js";
import Sidenav from "./components/side-nav/side-nav.js";

async function registerCustomElements(...definitions) {
  for await (const [name, constructorFunction, options] of definitions) {
    customElements.define(name, constructorFunction, options);
  }
}

registerCustomElements(
  AppBase,
  CounterButton,
  ReferenceList,
  ReferenceListItem,
  Sidenav,
);
