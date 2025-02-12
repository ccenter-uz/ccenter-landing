import { translationEn } from "./locale/en.js";
import { translationRu } from "./locale/ru.js";
import { translationUz } from "./locale/uz.js";

const translations = {
  en: { ...translationEn },
  ru: { ...translationRu },
  uz: { ...translationUz },
};

let currentLanguage = localStorage.getItem("language") || navigator.language;

function translate(key) {
  return translations[currentLanguage][key] || key;
}

function updateUI() {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    element.textContent = translate(key);
  });
}

function setLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem("language", lang);
  updateUI();
}

document.addEventListener("DOMContentLoaded", () => {
  updateUI();

  const languageSelect = document.getElementById("language");
  languageSelect.value = currentLanguage;

  languageSelect.addEventListener("change", (event) => {
    setLanguage(event.target.value);
  });
});
