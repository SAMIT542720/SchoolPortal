(function () {
    'use strict';

    var layout = window.SchoolPortalLayout;

    if (!layout) {
        return;
    }

    function initSidebar() {
        var sidebar = document.getElementById('appSidebar');
        var content = document.getElementById('mainContent');
        var toggleBtn = document.getElementById('sidebarToggleBtn');
        var overlay = document.getElementById('sidebarOverlay');

        function clearHoverExpanded() {
            if (sidebar) {
                sidebar.classList.remove('hover-expanded');
            }
        }

        function isDesktopCollapsed() {
            return !layout.isMobile() && sidebar && sidebar.classList.contains('collapsed');
        }

        if (toggleBtn && sidebar && overlay) {
            toggleBtn.addEventListener('click', function () {
                if (layout.isMobile()) {
                    sidebar.classList.toggle('mobile-open');
                    overlay.classList.toggle('show');
                    overlay.setAttribute(
                        'aria-hidden',
                        String(!sidebar.classList.contains('mobile-open'))
                    );
                    return;
                }

                if (!content) {
                    return;
                }

                clearHoverExpanded();

                var collapsed = sidebar.classList.toggle('collapsed');
                content.classList.toggle('expanded', collapsed);
                layout.setStoredItem('sp_sidebar_collapsed', collapsed ? '1' : '0');
            });
        }

        if (overlay && sidebar) {
            overlay.addEventListener('click', function () {
                sidebar.classList.remove('mobile-open');
                overlay.classList.remove('show');
                overlay.setAttribute('aria-hidden', 'true');
            });
        }

        if (
            !layout.isMobile() &&
            sidebar &&
            content &&
            layout.getStoredItem('sp_sidebar_collapsed', '0') === '1'
        ) {
            sidebar.classList.add('collapsed');
            content.classList.add('expanded');
        }

        if (sidebar) {
            sidebar.addEventListener('mouseenter', function () {
                if (isDesktopCollapsed()) {
                    sidebar.classList.add('hover-expanded');
                }
            });

            sidebar.addEventListener('mouseleave', function () {
                clearHoverExpanded();
            });

            sidebar.addEventListener('focusin', function () {
                if (isDesktopCollapsed()) {
                    sidebar.classList.add('hover-expanded');
                }
            });

            sidebar.addEventListener('focusout', function (event) {
                if (!sidebar.contains(event.relatedTarget)) {
                    clearHoverExpanded();
                }
            });
        }

        window.addEventListener('resize', function () {
            clearHoverExpanded();

            if (!layout.isMobile() && sidebar && overlay) {
                sidebar.classList.remove('mobile-open');
                overlay.classList.remove('show');
                overlay.setAttribute('aria-hidden', 'true');
            }
        });
    }

    function initSubmenus() {
        document.querySelectorAll('.sidebar-nav [data-submenu]').forEach(function (trigger) {
            trigger.addEventListener('click', function (event) {
                event.preventDefault();
                var menu = document.getElementById(trigger.dataset.submenu);
                if (!menu) {
                    return;
                }

                var isOpen = menu.classList.toggle('open');
                trigger.classList.toggle('open', isOpen);
            });
        });
    }

    layout.initSidebar = initSidebar;
    layout.initSubmenus = initSubmenus;

    layout.registerInitializer(initSidebar);
    layout.registerInitializer(initSubmenus);
}());
