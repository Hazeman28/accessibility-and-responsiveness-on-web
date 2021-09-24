export default {
  extends: "ul",
  name: "intersection-observer-list",
  init: (element) => {
    const { useAttribute } = element;
    const [threshold] = useAttribute("threshold", "0.25");

    const observables = new Map();

    const observer = new IntersectionObserver((entries) => {
      entries
        .forEach(({ isIntersecting, target }) => {
          observables.get(target)?.toggleAttribute("intersecting", isIntersecting);
        });
    }, {
      threshold: Number.parseInt(threshold, 10),
    });

    Array.from(element.children)
      .map(child => [
        document.getElementById(child.getAttribute("observe")),
        child,
      ])
      .filter(([element]) => element)
      .forEach(([element, child]) => {
        observables.set(element, child);
        observer.observe(element);
      });
  },
}