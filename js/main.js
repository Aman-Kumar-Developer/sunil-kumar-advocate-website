const backToTopButton = document.querySelector(".back-to-top");

if (backToTopButton) {
    backToTopButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

const featuredFilters = document.querySelectorAll(".featured-filter[data-filter]");
const featuredCards = document.querySelectorAll(".featured-card[data-category]");

if (featuredFilters.length && featuredCards.length) {
    const applyFeaturedFilter = (category) => {
        featuredFilters.forEach((filter) => {
            const isActive = filter.dataset.filter === category;

            filter.classList.toggle("is-active", isActive);
            filter.setAttribute("aria-pressed", String(isActive));
        });

        featuredCards.forEach((card) => {
            card.hidden = category !== "all" && card.dataset.category !== category;
        });
    };

    featuredFilters.forEach((filter) => {
        filter.addEventListener("click", () => {
            applyFeaturedFilter(filter.dataset.filter);
        });
    });

    const activeFilter = document.querySelector(".featured-filter[aria-pressed='true']");
    applyFeaturedFilter(activeFilter ? activeFilter.dataset.filter : "all");
}

// --- Basic Search Implementation ---
(() => {
    const searchButtons = document.querySelectorAll('.search-button');
    if (!searchButtons.length) return;

    const siteIndex = [
        { title: "Home", url: "/" },
        { title: "About", url: "/about/" },
        { title: "Practice Areas", url: "/practice-areas/" },
        { title: "Arbitration", url: "/practice-areas/arbitration/" },
        { title: "Banking & Recovery (SARFAESI)", url: "/practice-areas/banking-recovery/" },
        { title: "Civil & Commercial Litigation", url: "/practice-areas/civil-commercial/" },
        { title: "Criminal & NI Act (Section 138)", url: "/practice-areas/criminal-ni-act/" },
        { title: "High Court & Writ Petitions", url: "/practice-areas/high-court-writ/" },
        { title: "Legal Drafting & Advisory", url: "/practice-areas/legal-drafting-advisory/" },
        { title: "Property Disputes", url: "/practice-areas/property/" },
        { title: "Courts Overview", url: "/courts/" },
        { title: "Dwarka Court", url: "/courts/dwarka/" },
        { title: "Karkardooma Court", url: "/courts/karkardooma/" },
        { title: "Patiala House Court", url: "/courts/patiala-house/" },
        { title: "Rohini Court", url: "/courts/rohini/" },
        { title: "Saket Court", url: "/courts/saket/" },
        { title: "Tis Hazari Court", url: "/courts/tis-hazari/" },
        { title: "Featured Matters", url: "/featured/" },
        { title: "Insights & Articles", url: "/insights/" },
        { title: "Contact", url: "/contact/" },
        { title: "Privacy Policy", url: "/privacy-policy/" },
        { title: "Terms of Use", url: "/terms-of-use/" }
    ];

    let searchOverlay = null;
    let searchInput = null;
    let searchResults = null;

    const createSearchUI = () => {
        if (searchOverlay) return;

        searchOverlay = document.createElement('div');
        searchOverlay.className = 'search-overlay';
        searchOverlay.hidden = true;

        const modal = document.createElement('div');
        modal.className = 'search-modal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-label', 'Site Search');

        const header = document.createElement('div');
        header.className = 'search-header';

        searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.className = 'search-input';
        searchInput.placeholder = 'Search legal topics, courts, practice areas...';
        searchInput.setAttribute('aria-label', 'Search');
        searchInput.autocomplete = 'off';

        const closeBtn = document.createElement('button');
        closeBtn.className = 'search-close';
        closeBtn.type = 'button';
        closeBtn.setAttribute('aria-label', 'Close search');
        closeBtn.textContent = '×';

        header.appendChild(searchInput);
        header.appendChild(closeBtn);

        searchResults = document.createElement('ul');
        searchResults.className = 'search-results';
        searchResults.setAttribute('aria-live', 'polite');

        modal.appendChild(header);
        modal.appendChild(searchResults);
        searchOverlay.appendChild(modal);
        document.body.appendChild(searchOverlay);

        const style = document.createElement('style');
        style.textContent = `
            .search-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 9999; display: flex; justify-content: center; align-items: flex-start; padding-top: 10vh; }
            .search-overlay[hidden] { display: none !important; }
            .search-modal { background: #fff; width: 90%; max-width: 600px; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.2); display: flex; flex-direction: column; max-height: 80vh; }
            .search-header { display: flex; border-bottom: 1px solid #ddd; padding: 1rem; align-items: center; }
            .search-input { flex: 1; border: none; font-size: 1.05rem; outline: none; padding: 0.5rem; color: #111; }
            .search-close { background: none; border: none; font-size: 1.75rem; line-height: 1; cursor: pointer; padding: 0 0.5rem; color: #666; }
            .search-results { list-style: none; padding: 0; margin: 0; overflow-y: auto; max-height: 60vh; }
            .search-results li a { display: block; padding: 0.85rem 1rem; color: #222; text-decoration: none; border-bottom: 1px solid #eee; font-weight: 500; }
            .search-results li a:hover, .search-results li a:focus { background: #f5f5f5; color: #6f1d2a; outline: none; }
            .search-no-results { padding: 1.25rem 1rem; color: #666; text-align: center; }
        `;
        document.head.appendChild(style);

        closeBtn.addEventListener('click', closeSearch);
        searchOverlay.addEventListener('click', (e) => {
            if (e.target === searchOverlay) closeSearch();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !searchOverlay.hidden) closeSearch();
        });

        searchInput.addEventListener('input', handleSearch);
    };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase().trim();
        searchResults.innerHTML = '';

        if (!query) return;

        const matches = siteIndex.filter(item => item.title.toLowerCase().includes(query));

        if (matches.length === 0) {
            const noRes = document.createElement('li');
            noRes.className = 'search-no-results';
            noRes.textContent = 'No results found.';
            searchResults.appendChild(noRes);
            return;
        }

        matches.forEach(match => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = match.url;
            a.textContent = match.title;
            li.appendChild(a);
            searchResults.appendChild(li);
        });
    };

    const openSearch = () => {
        createSearchUI();
        searchOverlay.hidden = false;
        searchInput.value = '';
        searchResults.innerHTML = '';
        document.body.style.overflow = 'hidden';
        setTimeout(() => searchInput.focus(), 50);
    };

    const closeSearch = () => {
        if (searchOverlay) {
            searchOverlay.hidden = true;
            document.body.style.overflow = '';
        }
    };

    searchButtons.forEach(btn => btn.addEventListener('click', openSearch));
})();
