export function formatCustomElementName(name) {
  return name
    ?.trim()
    .split("")
    .map((char, index, array) => {
      const lowerCase = char.toLowerCase();
      const upperCase = char.toUpperCase();

      const previous = index > 0 ? array[index - 1] : "";
      const next = index < array.length - 1 ? array[index + 1] : "";

      const isNotFirst = index > 0;
      const isUpperCase = char === upperCase;
      const previousIsUpperCase = previous === previous?.toUpperCase();
      const nextIsUpperCase = next === next?.toUpperCase();

      if (
        isNotFirst &&
        isUpperCase &&
        !(previousIsUpperCase && nextIsUpperCase) &&
        !lowerCase.startsWith("-")
      ) {
        return `-${lowerCase}`;
      }

      return lowerCase;
    }).join("")
}

export function getTemplateFetchParams(templatePath) {
  return Array.isArray(templatePath)
    ? templatePath
    : typeof templatePath === "string"
    ? [
      `./${templatePath.split("/").pop().replace(/\..+$/, ".html")}`,
      templatePath
    ]
    : [];
}

export function trimInnerHTML(element) {
  return typeof element?.innerHTML === "string"
    ? element?.innerHTML.trim()
    : element?.innerHTML;
}

