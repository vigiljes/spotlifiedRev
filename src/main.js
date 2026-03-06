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
        <div class="panel-header">
          <span>YouTube</span>
          <div class="panel-controls">
            <button data-panel="youtube" data-action="back">←</button>
            <button data-panel="youtube" data-action="refresh">↻</button>
          </div>
        </div>
        <div class="panel-body" id="youtube-panel">
          <div class="panel-placeholder">YouTube results will load here</div>
        </div>
      </section>

      <section class="panel">
        <div class="panel-header">
          <span>Reddit</span>
          <div class="panel-controls">
            <button data-panel="reddit" data-action="back">←</button>
            <button data-panel="reddit" data-action="refresh">↻</button>
          </div>
        </div>
        <div class="panel-body" id="reddit-panel">
          <div class="panel-placeholder">Reddit results will load here</div>
        </div>
      </section>

      <section class="panel">
        <div class="panel-header">
          <span>Wikipedia</span>
          <div class="panel-controls">
            <button data-panel="wikipedia" data-action="back">←</button>
            <button data-panel="wikipedia" data-action="refresh">↻</button>
          </div>
        </div>
        <div class="panel-body" id="wikipedia-panel">
          <div class="panel-placeholder">Wikipedia results will load here</div>
        </div>
      </section>

      <section class="panel">
        <div class="panel-header">
          <span>WhoSampled</span>
          <div class="panel-controls">
            <button data-panel="whosampled" data-action="back">←</button>
            <button data-panel="whosampled" data-action="refresh">↻</button>
          </div>
        </div>
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

function createWebview(url) {
  return `
    <webview
      class="panel-webview"
      src="${url}"
      allowpopups
    ></webview>
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

  youtubePanel.innerHTML = createWebview(youtubeUrl)
  redditPanel.innerHTML = createWebview(redditUrl)
  wikipediaPanel.innerHTML = createWebview(wikipediaUrl)
  whosampledPanel.innerHTML = createWebview(whosampledUrl)
}

searchForm.addEventListener('submit', (event) => {
  event.preventDefault()
  runSearch(searchInput.value)
})

document.addEventListener('click', (e) => {
  const button = e.target

  if (!button.dataset.action) return

  const panel = button.dataset.panel
  const action = button.dataset.action

  const webview = document.querySelector(`#${panel}-panel webview`)

  if (!webview) return

  if (action === 'back' && webview.canGoBack()) {
    webview.goBack()
  }

  if (action === 'refresh') {
    webview.reload()
  }
})