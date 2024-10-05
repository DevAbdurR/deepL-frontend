const translateButton = document.getElementById("translate-btn");
const fullPage = document.body.innerHTML;
console.log(fullPage);

translateButton.addEventListener("click", async () => {
  const pageTextContent = document.body.innerText;

  document.body.innerHTML = "<h3>Translating the page... Please wait.</h3>";

  try {
    const response = await fetch(
      "https://deepl-backend-48623d545a49.herokuapp.com/translate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: pageTextContent,
          targetLanguage: "DE",
        }),
      }
    );

    const data = await response.json();

    // Update the page content with the translated version
    if (data.translatedText) {
      document.body.innerHTML = `<h3>Translation Complete</h3><p>${data.translatedText}</p>`;
    } else {
      document.body.innerHTML =
        "<h3>Translation failed. Please try again.</h3>";
    }
  } catch (error) {
    console.error("Error translating the page:", error);
    document.body.innerHTML =
      "<h3>Error translating the page. Please try again.</h3>";
  }

  // Restore the Translate button
  document.body.innerHTML +=
    '<button id="translate-button" style="position: fixed; bottom: 10px; right: 10px">Translate Page</button>';
});
