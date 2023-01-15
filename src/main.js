document.addEventListener(
  "click",
  function (event) {
    if (!event.target.matches("#submit-button")) return

    event.preventDefault()

    const description = document.getElementById("textarea").value
    postData("https://api.openai.com/v1/completions", {
      model: "text-davinci-003",
      prompt: `Trova cinque headlines con angle diversi per il seguente prodotto da sponsorizzare tramite Facebook Ads:\n\nProdotto:${description}. Il risultato dev'essere un'elenco puntato.`,
      temperature: 0.5,
      max_tokens: 256,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    }).then((data) => {
      console.log(data)
      const element = document.querySelector("#headlines")
      element.innerText = data.choices[0].text
    })

    postData("https://api.openai.com/v1/completions", {
      model: "text-davinci-003",
      prompt: `Trova tre body text con angle diversi per il seguente prodotto da sponsorizzare tramite Facebook Ads:\n\nProdotto:${description}. Il risultato dev'essere un elenco puntato.`,
      temperature: 0.5,
      max_tokens: 1000,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    }).then((data) => {
      console.log(data)
      const element = document.querySelector("#body-texts")
      element.innerText = data.choices[0].text
    })
  },
  false
)

async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer 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`,
    },
    body: JSON.stringify(data),
  })
  return response.json()
}
