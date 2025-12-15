// Search functionality for listen.html
console.log('search.js loaded!');

document.addEventListener('DOMContentLoaded', function() {
  console.log('Search DOMContentLoaded fired!');
  
  const searchInput = document.getElementById('searchInput');
  const clearBtn = document.getElementById('clearBtn');
  const episodes = document.querySelectorAll('.episode-item');
  const noResults = document.getElementById('noResults');
  const resultCount = document.getElementById('resultCount');

  console.log('searchInput:', searchInput);
  console.log('episodes found:', episodes.length);

  if (searchInput && clearBtn && episodes.length > 0) {
    console.log('Search initialized!');

    function performSearch() {
      const query = searchInput.value.trim().toLowerCase();
      console.log('Searching for:', query);

      if (!query) {
        showAllEpisodes();
        return;
      }

      let visibleCount = 0;

      episodes.forEach(episode => {
        const title = (episode.getAttribute('data-title') || '').toLowerCase();
        const keywords = (episode.getAttribute('data-keywords') || '').toLowerCase();
        const searchContent = title + ' ' + keywords;

        if (searchContent.includes(query)) {
          episode.classList.remove('hidden');
          visibleCount++;
        } else {
          episode.classList.add('hidden');
        }
      });

      if (visibleCount === 0) {
        noResults.classList.remove('hidden');
        resultCount.textContent = '';
      } else {
        noResults.classList.add('hidden');
        resultCount.textContent = `Showing ${visibleCount} episode${visibleCount !== 1 ? 's' : ''}`;
      }
    }

    function showAllEpisodes() {
      episodes.forEach(episode => {
        episode.classList.remove('hidden');
      });
      noResults.classList.add('hidden');
      resultCount.textContent = `Showing all ${episodes.length} episodes`;
    }

    function updateClearButton() {
      if (searchInput.value) {
        clearBtn.classList.add('active');
      } else {
        clearBtn.classList.remove('active');
      }
    }

    // Event listeners
    searchInput.addEventListener('input', () => {
      updateClearButton();
      performSearch();
    });

    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        performSearch();
      }
    });

    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchInput.focus();
      updateClearButton();
      showAllEpisodes();
    });

    // Initialize
    showAllEpisodes();
  } else {
    console.log('Search NOT initialized - elements missing or not on listen page');
  }
});