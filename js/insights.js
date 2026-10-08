(() => {
    "use strict";

    const filters = [...document.querySelectorAll(".insights-page [data-filter]")];
    const grid = document.querySelector(".insights-grid");
    const results = document.querySelector(".insights-results");
    const paginationNav = document.querySelector(".insights-pagination nav");
    const cards = [...document.querySelectorAll(".insights-page .insight-card")];

    const ITEMS_PER_PAGE = 6;
    let selectedCategory = "all";
    let currentPage = 1;

    const renderInsightCard = (item) => `
        <article id="${item.id}" class="content-card insight-card" data-category="${item.category}">
            <img class="insight-card__image" src="${item.image}"
                alt="${item.imageAlt || item.title}" width="683" height="320"
                loading="lazy" decoding="async">
            <div class="content-card__content">
                <div class="insight-card__meta">
                    <span class="content-card__meta">${item.categoryLabel}</span>
                    <time datetime="${item.date}">${item.formattedDate || item.date}</time>
                </div>
                <h2>${item.title}</h2>
                <p>${item.excerpt}</p>
                <details class="insight-card__details">
                    <summary class="text-link">Read More</summary>
                    <div class="insight-card__expanded">
                        ${item.expandedText}
                    </div>
                </details>
            </div>
        </article>`;

    const updateView = (shouldScroll = false) => {
        if (window.legalInsightsData && grid) {
            const dataset = window.legalInsightsData;
            const filtered = selectedCategory === "all"
                ? dataset
                : dataset.filter(item => item.category === selectedCategory);

            const totalCount = filtered.length;
            const totalPages = Math.max(1, Math.ceil(totalCount / ITEMS_PER_PAGE));

            if (currentPage > totalPages) currentPage = 1;

            const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
            const pageItems = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

            grid.innerHTML = pageItems.map(renderInsightCard).join("\n");

            if (results) {
                if (totalCount === 0) {
                    results.textContent = "No articles in this category.";
                } else if (totalCount <= ITEMS_PER_PAGE) {
                    results.textContent = `Showing all ${totalCount} ${totalCount === 1 ? "article" : "articles"}`;
                } else {
                    const end = Math.min(startIndex + ITEMS_PER_PAGE, totalCount);
                    results.textContent = `Showing ${startIndex + 1}–${end} of ${totalCount} articles`;
                }
            }

            if (paginationNav) {
                if (totalPages <= 1) {
                    paginationNav.innerHTML = `<span aria-current="page">1</span><span class="insights-pagination__note">Page 1 of 1</span>`;
                } else {
                    let navHtml = `<button type="button" class="pagination-btn pagination-btn--prev" aria-label="Previous page" ${currentPage === 1 ? "disabled" : ""}>← Prev</button>`;

                    for (let p = 1; p <= totalPages; p++) {
                        navHtml += `<button type="button" class="pagination-btn ${p === currentPage ? "is-active" : ""}" data-page="${p}" aria-label="Page ${p}" ${p === currentPage ? 'aria-current="page"' : ""}>${p}</button>`;
                    }

                    navHtml += `<button type="button" class="pagination-btn pagination-btn--next" aria-label="Next page" ${currentPage === totalPages ? "disabled" : ""}>Next →</button>`;
                    navHtml += `<span class="insights-pagination__note">Page ${currentPage} of ${totalPages}</span>`;

                    paginationNav.innerHTML = navHtml;

                    paginationNav.querySelectorAll("[data-page]").forEach((btn) => {
                        btn.addEventListener("click", () => {
                            currentPage = Number(btn.dataset.page);
                            updateView(true);
                        });
                    });

                    const prevBtn = paginationNav.querySelector(".pagination-btn--prev");
                    if (prevBtn) {
                        prevBtn.addEventListener("click", () => {
                            if (currentPage > 1) {
                                currentPage--;
                                updateView(true);
                            }
                        });
                    }

                    const nextBtn = paginationNav.querySelector(".pagination-btn--next");
                    if (nextBtn) {
                        nextBtn.addEventListener("click", () => {
                            if (currentPage < totalPages) {
                                currentPage++;
                                updateView(true);
                            }
                        });
                    }
                }
            }
        } else if (cards.length && results) {
            // Fallback for static cards
            let visibleCount = 0;
            cards.forEach((card) => {
                const isVisible =
                    selectedCategory === "all" ||
                    card.dataset.category === selectedCategory;

                card.hidden = !isVisible;
                visibleCount += Number(isVisible);
            });

            results.textContent = visibleCount
                ? `Showing ${visibleCount} ${visibleCount === 1 ? "article" : "articles"}`
                : "No articles in this category.";
        }

        if (shouldScroll && grid) {
            const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            grid.scrollIntoView({
                behavior: prefersReducedMotion ? "auto" : "smooth",
                block: "start"
            });
        }
    };

    if (filters.length) {
        filters.forEach((filter) => {
            filter.addEventListener("click", () => {
                selectedCategory = filter.dataset.filter;
                currentPage = 1;

                filters.forEach((button) => {
                    const isActive = button === filter;
                    button.classList.toggle("is-active", isActive);
                    button.setAttribute("aria-pressed", String(isActive));
                });

                updateView(false);
            });
        });
    }

    // Handle hash anchor jumps (e.g. from sidebar popular links like #insight-ni-act)
    const handleHashNavigation = () => {
        const hash = window.location.hash;
        if (!hash || !window.legalInsightsData) return;

        const targetId = hash.replace("#", "");
        const dataset = window.legalInsightsData;
        const targetItem = dataset.find(item => item.id === targetId);

        if (targetItem) {
            selectedCategory = "all";
            filters.forEach((btn) => {
                const isActive = btn.dataset.filter === "all";
                btn.classList.toggle("is-active", isActive);
                btn.setAttribute("aria-pressed", String(isActive));
            });

            const targetIndex = dataset.indexOf(targetItem);
            currentPage = Math.floor(targetIndex / ITEMS_PER_PAGE) + 1;
            updateView(false);

            setTimeout(() => {
                const el = document.getElementById(targetId);
                if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "center" });
                    const details = el.querySelector("details");
                    if (details) details.open = true;
                }
            }, 100);
        }
    };

    window.addEventListener("hashchange", handleHashNavigation);

    // Initial render
    const activeFilter = document.querySelector(".insights-page .featured-filter[aria-pressed='true']");
    if (activeFilter) {
        selectedCategory = activeFilter.dataset.filter;
    }
    updateView(false);
    if (window.location.hash) {
        handleHashNavigation();
    }

    // Newsletter handler
    const newsletterForm = document.querySelector("[data-newsletter-form]");
    const newsletterStatus = document.querySelector("[data-newsletter-status]");

    if (newsletterForm && newsletterStatus) {
        newsletterForm.addEventListener("submit", (event) => {
            event.preventDefault();

            if (!newsletterForm.reportValidity()) {
                return;
            }

            const email = new FormData(newsletterForm).get("email");
            const subject = encodeURIComponent("Insights email updates");
            const body = encodeURIComponent(`Please send Insights updates to: ${email}`);

            newsletterStatus.textContent =
                "Your email app will open. Send the message to complete your request.";
            window.location.href =
                `mailto:Sunilupadhayay5@gmail.com?subject=${subject}&body=${body}`;
        });
    }
})();
