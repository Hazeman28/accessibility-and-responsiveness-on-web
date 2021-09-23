function trimInnerHTML(element) {
  return typeof element?.innerHTML === "string"
    ? element?.innerHTML.trim()
    : element?.innerHTML;
}

export default trimInnerHTML;
