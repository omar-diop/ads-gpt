function generateHeadlines(description) {
  return postData("https://api.openai.com/v1/completions", {
    model: "text-davinci-003",
    prompt: `Trova cinque headlines con angle diversi per il seguente prodotto da sponsorizzare tramite Facebook Ads:\n\nProdotto:${description}. Formatta il risultato in un elenco puntato.`,
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  })
}

function generateBodies(description) {
  return postData("https://api.openai.com/v1/completions", {
    model: "text-davinci-003",
    prompt: `Trova tre body text con angle diversi per il seguente prodotto da sponsorizzare tramite Facebook Ads:\n\nProdotto:${description}. Formatta il risultato in elenco puntato.`,
    temperature: 0.7,
    max_tokens: 1000,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
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
