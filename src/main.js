import './style.css'

const app = document.querySelector('#app')

app.innerHTML = `
  <div class="app-shell">
    <header class="topbar">
      <div class="brand">
        <h1>Spotlified Dashboard</h1>
        <p>Search once. Browse everywhere.</p>
      </div>

      <form id="search-form" class="searchbar">
        <input
          id="search-input"
          type="text"
          placeholder="Search a song, movie, show, or topic..."
          autocomplete="off"
        />
        <button type="submit">Search</button>
      </form>
    </header>

    <main class="dashboard-grid">
      <section class="panel">
        <div class="panel-header">YouTube</div>
        <div class="panel-body" id="youtube-panel">
          <div class="panel-placeholder">YouTube results will load here</div>
        </div>
      </section>

      <section class="panel">
        <div class="panel-header">Reddit</div>
        <div class="panel-body" id="reddit-panel">
          <div class="panel-placeholder">Reddit results will load here</div>
        </div>
      </section>

      <section class="panel">
        <div class="panel-header">Wikipedia</div>
        <div class="panel-body" id="wikipedia-panel">
          <div class="panel-placeholder">Wikipedia results will load here</div>
        </div>
      </section>

      <section class="panel">
        <div class="panel-header">WhoSampled</div>
        <div class="panel-body" id="whosampled-panel">
          <div class="panel-placeholder">WhoSampled results will load here</div>
        </div>
      </section>
    </main>
  </div>
`

const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')

const youtubePanel = document.querySelector('#youtube-panel')
const redditPanel = document.querySelector('#reddit-panel')
const wikipediaPanel = document.querySelector('#wikipedia-panel')
const whosampledPanel = document.querySelector('#whosampled-panel')

function buildSearchUrl(baseUrl, queryParam, query) {
  const url = new URL(baseUrl)
  url.searchParams.set(queryParam, query)
  return url.toString()
}

function renderLinkCard(title, url) {
  return `
    <a class="result-link" href="${url}" target="_blank" rel="noreferrer">
      <span>${title}</span>
      <span class="result-url">${url}</span>
    </a>
  `
}

function runSearch(query) {
  const trimmedQuery = query.trim()

  if (!trimmedQuery) return

  const youtubeUrl = buildSearchUrl(
    'https://www.youtube.com/results',
    'search_query',
    trimmedQuery
  )

  const redditUrl = buildSearchUrl(
    'https://www.reddit.com/search/',
    'q',
    trimmedQuery
  )

  const wikipediaUrl = buildSearchUrl(
    'https://en.wikipedia.org/wiki/Special:Search',
    'search',
    trimmedQuery
  )

  const whosampledUrl = buildSearchUrl(
    'https://www.whosampled.com/search/',
    'q',
    trimmedQuery
  )

  youtubePanel.innerHTML = renderLinkCard('Open YouTube results', youtubeUrl)
  redditPanel.innerHTML = renderLinkCard('Open Reddit results', redditUrl)
  wikipediaPanel.innerHTML = renderLinkCard('Open Wikipedia results', wikipediaUrl)
  whosampledPanel.innerHTML = renderLinkCard('Open WhoSampled results', whosampledUrl)
}

searchForm.addEventListener('submit', (event) => {
  event.preventDefault()
  runSearch(searchInput.value)
})