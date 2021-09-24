import AppBase from "./components/app-base/app-base.js";
import CounterButton from "./components/counter-button/counter-button.js";
import DemoSection from "./components/demo-section/demo-section.js";
import IntersectionObserverList from "./components/intersection-observer-list/intersection-observer-list.js";
import IntersectionObserverListItem from "./components/intersection-observer-list/intersection-observer-li.js";
import ReferenceList from "./components/reference-list/reference-list.js";
import ReferenceListItem from "./components/reference-list/reference-li.js";
import Sidenav from "./components/side-nav/side-nav.js";
import customElement from "./helpers/custom-element.js";

async function registerCustomElements(...definitions) {
  for (const definition of definitions) {
    const [name, constructorFunction, options] = await customElement(definition);
    customElements.define(name, constructorFunction, options);
  }
}

registerCustomElements(
  AppBase,
  CounterButton,
  DemoSection,
  IntersectionObserverList,
  IntersectionObserverListItem,
  ReferenceList,
  ReferenceListItem,
  Sidenav,
);
