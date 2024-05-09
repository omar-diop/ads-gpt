const API_URL = "https://api.openai.com/v1/chat/completions"

function generateHeadlines(description, language) {
  const localizedPrompt = {
    it: `Trova cinque headlines con angle diversi per il seguente prodotto da sponsorizzare tramite Facebook Ads:\n\nProdotto:${description}. Formatta il risultato in un elenco puntato.`,
    en: `Find five headlines with different marketing angles for the following product to sponsor through Facebook Ads:\n\nProduct:${description}. Format the result in a bullet-point list.`,
  }
  return postData(API_URL, {
    model: "gpt-4",
    messages: [{ role: "user", content: localizedPrompt[language] }],
    temperature: 0.7,
  })
}

function generateBodies(description, language) {
  const localizedPrompt = {
    it: `Trova tre body text con angle diversi per il seguente prodotto da sponsorizzare tramite Facebook Ads:\n\nProdotto:${description}. Formatta il risultato in un elenco puntato.`,
    en: `Find three body texts with different angles for the following product to sponsor through Facebook Ads:\n\nProduct:${description}. Format the result in a bullet-point list.`,
  }
  return postData(API_URL, {
    model: "gpt-4",
    messages: [{ role: "user", content: localizedPrompt[language] }],
    temperature: 0.7,
  })
}

async function postData(url = "", data = {}) {
  const { apiKey } = await chrome.storage.local.get("apiKey")
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(data),
  })
  return response.json()
}
