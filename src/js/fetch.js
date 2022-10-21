export function onInput(evt) {
  const name = evt.target.value.trim().toLowerCase();
  if (name === '') {
    cleanListHtml();
    return;
  }
  fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      if (data.length > 10) {
        cleanListHtml();
        warningAlert();
        // return;
      } else if (data.length === 1) {
        addElmOneCountry(data[0]);
      } else if (data.length >= 2 && data.length <= 10) {
        addMaxTenElm(data);
      }
    })
    .catch(error => {
      cleanListHtml();
      cleanInfoHtml();
      errorAlert();
    });
}
