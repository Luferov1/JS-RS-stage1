// variables

const language = {};
// set language

if (!localStorage.getItem('language')) {
  language.enlish = true;

} else {
  language.enlish = JSON.parse(localStorage.getItem('language')).enlish;
}



const saveLanguage = () => {
  localStorage.setItem('language', JSON.stringify(language));
}

console.log(language);

window.addEventListener('beforeunload', saveLanguage);

export default language;

