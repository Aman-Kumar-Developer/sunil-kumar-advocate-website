(() => {
    "use strict";

    const filters = [...document.querySelectorAll(".insights-page [data-filter]")];
    const cards = [...document.querySelectorAll(".insights-page .insight-card")];
    const results = document.querySelector(".insights-results");

    if (filters.length && cards.length && results) {
        filters.forEach((filter) => {
            filter.addEventListener("click", () => {
                const selectedCategory = filter.dataset.filter;
                let visibleCount = 0;

                filters.forEach((button) => {
                    const isActive = button === filter;
                    button.classList.toggle("is-active", isActive);
                    button.setAttribute("aria-pressed", String(isActive));
                });

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
            });
        });
    }

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
