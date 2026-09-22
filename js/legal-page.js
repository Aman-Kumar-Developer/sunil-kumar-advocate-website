/**
 * Legal Page Interactions
 *
 * Handles interactive behavior shared by legal pages such as:
 * - Privacy Policy
 * - Terms of Use
 *
 * Current functionality:
 * - Table of contents scrollspy
 * - Active section highlighting
 * - Accessible current-location state
 */

(() => {
    "use strict";

    const tocLinks = [
        ...document.querySelectorAll(
            ".legal-page__toc nav a[href^='#']"
        )
    ];

    if (!tocLinks.length) {
        return;
    }

    const sections = tocLinks
        .map((link) => {
            const sectionId = link
                .getAttribute("href")
                .slice(1);

            return document.getElementById(sectionId);
        })
        .filter(Boolean);

    if (!sections.length) {
        return;
    }

    let activeSection = null;

    /**
     * Updates the active table-of-contents item.
     *
     * @param {HTMLElement} section
     */
    const setActiveSection = (section) => {
        if (!section || section === activeSection) {
            return;
        }

        activeSection = section;

        tocLinks.forEach((link) => {
            const isActive =
                link.getAttribute("href") === `#${section.id}`;

            link.classList.toggle("is-active", isActive);

            if (isActive) {
                link.setAttribute(
                    "aria-current",
                    "location"
                );
            } else {
                link.removeAttribute("aria-current");
            }
        });
    };


    /**
     * Observes the reading position and determines
     * which legal section is currently active.
     */
    const observer = new IntersectionObserver(
        (entries) => {
            const visibleSections = entries
                .filter((entry) => entry.isIntersecting)
                .sort(
                    (a, b) =>
                        a.boundingClientRect.top -
                        b.boundingClientRect.top
                );

            if (visibleSections.length) {
                setActiveSection(
                    visibleSections[0].target
                );
            }
        },
        {
            root: null,

            /*
             * Creates a reading zone near the upper
             * portion of the viewport.
             */
            rootMargin: "-18% 0px -65% 0px",

            threshold: 0
        }
    );


    sections.forEach((section) => {
        observer.observe(section);
    });


    /*
     * Set the first section as active on initial load.
     */
    setActiveSection(sections[0]);


    /*
     * Update the active state immediately when
     * the visitor clicks a table-of-contents link.
     */
    tocLinks.forEach((link) => {

        link.addEventListener("click", () => {

            const sectionId = link
                .getAttribute("href")
                .slice(1);

            const section =
                document.getElementById(sectionId);

            if (section) {
                setActiveSection(section);
            }

        });

    });

})();