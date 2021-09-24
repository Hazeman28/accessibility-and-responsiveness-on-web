import customElement from "../../helpers/custom-element.js";

export default customElement({
  init: (element) => {
    const { useAttribute } = element;

    element.addEventListener("click", () => {
      const [count, setCount] = useAttribute("count", "0");

      const currentCount = Number.parseInt(count);
      setCount(currentCount + 1);
    });
  },
  name: "counter-button",
  observeAttributes: {
    count: (_, newValue, element) => {
      element.textContent = newValue;
    },
  },
  templatePath: import.meta.url,
});
