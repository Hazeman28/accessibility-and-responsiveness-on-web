function getAttributeValue(element, attributeName, defaultValue) {
  return element.attributes?.getNamedItem(attributeName)?.value ?? defaultValue;
}

export function useAttribute(attributeName, defaultValue) {
  const value = getAttributeValue(this, attributeName, defaultValue);

  const setValue = (newValueOrCallback) => {
    if (typeof newValueOrCallback === "function") {
      this.setAttribute?.(
        newValueOrCallback(getAttributeValue(this, attributeName))
      );
    }

    this.setAttribute?.(attributeName, newValueOrCallback);
  };

  return [value, setValue];
}
