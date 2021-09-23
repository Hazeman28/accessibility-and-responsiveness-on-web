async function fetchTemplate(templatePath, moduleURL) {
  if (!templatePath) return null;

  try {
    const templateURL = new URL(templatePath, moduleURL).href;

    const response = await fetch(templateURL);
    const text = await response.text();

    const document = new DOMParser().parseFromString(text, 'text/html');
    const template = document.querySelector('template');

    return template?.content.cloneNode(true);

  } catch (error) {
    console.error(error, path);
    return null;
  }
};

export default fetchTemplate;
