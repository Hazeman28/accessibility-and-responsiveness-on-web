import rubiconElement from "../../helpers/rubicon-element.js";
import trimInnerHTML from "../../helpers/trim-inner-html.js";

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

async function ReferenceListItem(element) {
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

export default rubiconElement(ReferenceListItem, {
  extends: "li",
  name: "rli",
});
