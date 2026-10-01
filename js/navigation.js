/**
 * Site Navigation
 *
 * Handles:
 * - Active navigation item highlighting
 * - Mobile navigation menu toggle
 * - Mobile navigation accessibility
 */

(() => {
    "use strict";

    /*
     * =========================================================
     * ACTIVE NAVIGATION
     * =========================================================
     */

    const initializeActiveNavigation = () => {
        const navigationLinks = document.querySelectorAll(
            ".main-navigation a[href], .mobile-navigation a[href]",
        );

        if (!navigationLinks.length) {
            return;
        }

        /**
         * Converts a URL/path into a consistent
         * trailing-slash format for comparison.
         */
        const normalizePath = (path) => {
            if (!path) {
                return "/";
            }

            const url = new URL(path, window.location.origin);

            let pathname = url.pathname;

            /*
             * Treat /index.html as the directory root.
             */
            if (pathname.endsWith("/index.html")) {
                pathname = pathname.slice(0, -"index.html".length);
            }

            /*
             * Ensure directory-style URLs end with /.
             */
            if (!pathname.endsWith("/")) {
                pathname += "/";
            }

            return pathname;
        };

        const currentPath = normalizePath(window.location.pathname);

        navigationLinks.forEach((link) => {
            const linkPath = normalizePath(link.getAttribute("href"));

            const isCurrentPage = linkPath === currentPath;

            link.classList.toggle("is-active", isCurrentPage);

            if (isCurrentPage) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    };

    /*
     * =========================================================
     * MOBILE NAVIGATION
     * =========================================================
     */

    const initializeMobileNavigation = () => {
        const menuToggle = document.querySelector(".menu-toggle");

        const mobileNavigation = document.getElementById("mobile-navigation");

        if (!menuToggle || !mobileNavigation) {
            return;
        }

        const mobileNavigationLinks =
            mobileNavigation.querySelectorAll("a[href]");

        const setMenuState = (isOpen) => {
            menuToggle.setAttribute("aria-expanded", String(isOpen));

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu",
            );

            mobileNavigation.hidden = !isOpen;

            document.body.classList.toggle("mobile-menu-open", isOpen);
        };

        /*
         * Toggle menu when hamburger button is clicked.
         */
        menuToggle.addEventListener("click", () => {
            const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

            setMenuState(!isOpen);
        });

        /*
         * Close menu after selecting a navigation link.
         */
        mobileNavigationLinks.forEach((link) => {
            link.addEventListener("click", () => {
                setMenuState(false);
            });
        });

        /*
         * Allow Escape key to close the menu.
         */
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                setMenuState(false);
            }
        });

        /*
         * Close the mobile menu when returning
         * to the desktop breakpoint.
         */
        window.addEventListener("resize", () => {
            if (window.innerWidth >= 768) {
                setMenuState(false);
            }
        });

        /*
         * Ensure the menu starts closed.
         */
        setMenuState(false);
    };

    /*
     * =========================================================
     * INITIALIZE
     * =========================================================
     */

    initializeActiveNavigation();
    initializeMobileNavigation();
})();
