import customElement from "../../helpers/custom-element.js";
import { trimInnerHTML } from "../../helpers/utils.js";

const API_URL = "https://api.citeas.org/product";

async function fetchCitation(source) {
  try {
    const response = await fetch(`${API_URL}/${source}`);
    const { citations } = await response.json();

    return citations[2];
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default customElement({
  extends: "li",
  name: "reference-li",
  init: async (element) => {
    const source = new URL(trimInnerHTML(element)).href;
    const { citation } = await fetchCitation(source) ?? {};

    if (citation) {
      const linkElement = document.createElement("a");

      linkElement.setAttribute("href", source);
      linkElement.textContent = citation.replace(/^\d.\s*/, "");

      const target = element.attributes.getNamedItem("target")?.value;

      if (target) {
        linkElement.setAttribute("target", target);
      }

      element.innerHTML = "";
      element.appendChild(linkElement);
    }
  }
});
