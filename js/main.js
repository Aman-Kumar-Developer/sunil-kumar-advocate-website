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