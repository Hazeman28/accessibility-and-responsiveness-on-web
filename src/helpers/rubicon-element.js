import fetchTemplate from "./fetch-template.js";

const RE_PREFIX = "re-";

function prefixElementName(name, prefix) {
  const formattedName = name?.toLowerCase().trim();
  const formattedPrefix = prefix?.endsWith("-") ? prefix : `${prefix}-`;

  if (!formattedName) return formattedName;

  return name?.startsWith(formattedPrefix)
    ? formattedName
    : `${formattedPrefix}${formattedName}`;
}

async function rubiconElement(init, {
  extends: baseElement,
  name,
  observedAttributes,
  onAdopt,
  onAttributeChange,
  onConnect,
  onDisconnect,
  prefix = RE_PREFIX,
  styles,
  templatePath = [],
}) {
  const template = await fetchTemplate(...templatePath);

  const customElementName = name
    ? prefixElementName(name, prefix)
    : prefixElementName(init?.name, prefix);

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

    attributeChangedCallback(args) {
      onAttributeChange(args);
    }

    static get observedAttributes() {
      return observedAttributes ?? [];
    }
  }

  return [
    customElementName,
    CustomElement,
    baseElement ? { extends: baseElement } : undefined
  ];
};

export default rubiconElement;
