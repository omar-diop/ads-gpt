document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.session.get("savedStade").then(({ savedStade }) => {
    const { productDescription, headlines, bodies } = savedStade

    console.log("Description: " + productDescription)
    console.log("Headlines: " + headlines)
    console.log("Bodies: " + bodies)

    setDescription(productDescription)
    setHeadlines(headlines)
    setBodies(bodies)
  })
})

document.addEventListener(
  "click",
  function (event) {
    event.preventDefault()

    const headlinesResult = document.querySelector(".headlines-result")
    const bodiesResult = document.querySelector(".bodies-result")
    const headlinesLoader = document.querySelector(".headlines-loader")
    const bodiesLoader = document.querySelector(".bodies-loader")

    if (event.target.matches("#submit-button")) {
      headlinesLoader.style.display = "block"
      bodiesLoader.style.display = "block"
      headlinesResult.style.display = "none"
      bodiesResult.style.display = "none"

      const description = document.getElementById("textarea").value

      let session = {
        productDescription: description,
        headlines: null,
        bodies: null,
      }

      postData("https://api.openai.com/v1/completions", {
        model: "text-davinci-003",
        prompt: `Trova cinque headlines con angle diversi per il seguente prodotto da sponsorizzare tramite Facebook Ads:\n\nProdotto:${description}. Il risultato dev'essere un'elenco puntato.`,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      }).then((data) => {
        console.log(data)
        session = { ...session, headlines: data.choices[0].text }
        chrome.storage.session.set({
          savedStade: session,
        })
        setHeadlines(data.choices[0].text)
      })

      postData("https://api.openai.com/v1/completions", {
        model: "text-davinci-003",
        prompt: `Trova tre body text con angle diversi per il seguente prodotto da sponsorizzare tramite Facebook Ads:\n\nProdotto:${description}. Il risultato dev'essere un elenco puntato.`,
        temperature: 0.7,
        max_tokens: 1000,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      }).then((data) => {
        console.log(data)
        session = { ...session, bodies: data.choices[0].text }
        chrome.storage.session.set({
          savedStade: session,
        })
        setBodies(data.choices[0].text)
      })
    } else if (event.target.matches("#reset-button")) {
      headlinesLoader.style.display = "none"
      bodiesLoader.style.display = "none"
      headlinesResult.style.display = "none"
      bodiesResult.style.display = "none"
      document.getElementById("textarea").value = ""
    }
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

function setDescription(description) {
  if (!description) return
  document.getElementById("textarea").value = description
}

function setHeadlines(headlines) {
  if (!headlines) return
  const headlinesResult = document.querySelector(".headlines-result")
  const headlinesLoader = document.querySelector(".headlines-loader")
  const headlinesDiv = document.querySelector("#headlines")
  headlinesDiv.innerText = headlines
  headlinesLoader.style.display = "none"
  headlinesResult.style.display = "block"
}

function setBodies(bodies) {
  if (!bodies) return
  const bodiesResult = document.querySelector(".bodies-result")
  const bodiesLoader = document.querySelector(".bodies-loader")
  const bodiesDiv = document.querySelector("#body-texts")
  bodiesDiv.innerText = bodies
  bodiesLoader.style.display = "none"
  bodiesResult.style.display = "block"
}
