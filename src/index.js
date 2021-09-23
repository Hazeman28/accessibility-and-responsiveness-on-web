import Base from "./components/base/base.js";
import ReferenceList from "./components/reference-list/reference-list.js";
import ReferenceListItem from "./components/reference-list/reference-list-item.js";
import Sidenav from "./components/sidenav/sidenav.js";


async function registerCustomElements(...definitions) {
  for await (const [name, constructorFunction, options] of definitions) {
    customElements.define(name, constructorFunction, options);
  }
}

registerCustomElements(Base, ReferenceList, ReferenceListItem, Sidenav);
