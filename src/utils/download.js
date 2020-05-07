export const download = (content, filename, mimeType) => {
  const fakeLink = document.createElement('a');
  fakeLink.style.display = 'none';
  document.body.appendChild(fakeLink);
  const blob = new Blob([content], { type: mimeType });
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      // Manage IE11+ & Edge
      window.navigator.msSaveOrOpenBlob(blob, filename);
  } else {
      fakeLink.setAttribute('href', URL.createObjectURL(blob));
      fakeLink.setAttribute('download', filename);
      fakeLink.click();
  }
}

export const downloadJSON = (content, filename) => {
download(content, `${filename}.json`, 'application/json')
}
