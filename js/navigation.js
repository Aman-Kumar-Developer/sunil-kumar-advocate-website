/**
 * Highlights the primary navigation item
 * that matches the current page URL.
 *
 * Also updates aria-current for accessibility.
 */
const initializeActiveNavigation = () => {
    const navigationLinks = document.querySelectorAll(
        ".main-navigation a[href], .mobile-navigation a[href]"
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

        const url = new URL(
            path,
            window.location.origin
        );

        let pathname = url.pathname;

        /*
         * Treat /index.html as the directory root.
         */
        if (pathname.endsWith("/index.html")) {
            pathname = pathname.slice(
                0,
                -"index.html".length
            );
        }

        /*
         * Ensure directory-style URLs end with /.
         */
        if (!pathname.endsWith("/")) {
            pathname += "/";
        }

        return pathname;
    };

    const currentPath = normalizePath(
        window.location.pathname
    );

    navigationLinks.forEach((link) => {
        const linkPath = normalizePath(
            link.getAttribute("href")
        );

        const isCurrentPage =
            linkPath === currentPath;

        link.classList.toggle(
            "is-active",
            isCurrentPage
        );

        if (isCurrentPage) {
            link.setAttribute(
                "aria-current",
                "page"
            );
        } else {
            link.removeAttribute(
                "aria-current"
            );
        }
    });
};

initializeActiveNavigation();