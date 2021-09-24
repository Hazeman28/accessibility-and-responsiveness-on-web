import fetchTemplate from "./fetch-template.js";
import { useAttribute } from "./hooks.js";
import { formatCustomElementName, getTemplateFetchParams } from "./utils.js";

export async function customElement({
  extends: baseElement,
  init,
  name,
  observeAttributes,
  observedAttributes,
  onAdopt,
  onAttributeChange,
  onConnect,
  onDisconnect,
  styles,
  templatePath,
}) {
  const template = await fetchTemplate(...getTemplateFetchParams(templatePath));
  const customElementName = formatCustomElementName(name || init?.name);

  if (!customElementName) {
    throw Error(
      "Custom element must have a name. Provide a non-anonymous function with a name, or specify the name parameter"
    );
  }

  const BaseElement = baseElement
    ? document.createElement(baseElement).constructor
    : HTMLElement;

  class CustomElement extends BaseElement {
    constructor() {
      super();

      if (!baseElement) {
        const shadowRoot = this.attachShadow({ mode: 'open' });

        if (template) {
          shadowRoot.appendChild(template);
        }

        if (styles) {
          shadowRoot.adoptedStyleSheets = [styles];
        }
      }

      this.useAttribute = useAttribute.bind(this);

      init?.(this);
    }

    connectedCallback() {
      onConnect?.(this);
    }

    disconnectedCallback() {
      onDisconnect?.(this)
    }

    adoptedCallback() {
      onAdopt?.(this);
    }

    attributeChangedCallback(name, oldValue, newValue) {
      observeAttributes?.[name]?.(oldValue, newValue, this);
      onAttributeChange?.(name, oldValue, newValue, this);
    }

    static get observedAttributes() {
      return [
        ...(observedAttributes ?? []),
        ...(Object.keys(observeAttributes ?? {}).reduce((attributes, attributeName) => [
          ...attributes,
          attributeName
        ], [])),
      ];
    }
  }

  return [
    customElementName,
    CustomElement,
    baseElement ? { extends: baseElement } : undefined
  ];
};

export default customElement;
