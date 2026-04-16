(function () {
    'use strict';

    var layout = window.SchoolPortalLayout;

    if (!layout) {
        return;
    }

    function initRolePreview() {
        var select = document.getElementById('rolePreviewSelect');
        var roleItems = document.querySelectorAll('.sidebar-nav [data-role]');

        if (!select || !roleItems.length) {
            return;
        }

        function normalizeRole(role) {
            return layout.ROLE_PREVIEW_CONFIG[role] ? role : 'show-all';
        }

        function applyRolePreview(role) {
            var normalizedRole = normalizeRole(role);

            select.value = normalizedRole;
            layout.setStoredItem('sp_preview_role', normalizedRole);
            document.body.setAttribute('data-preview-role', normalizedRole);

            roleItems.forEach(function (item) {
                var itemRole = item.getAttribute('data-role');
                var isVisible =
                    normalizedRole === 'show-all' ||
                    itemRole === 'all' ||
                    itemRole === normalizedRole;

                item.hidden = !isVisible;
            });
        }

        applyRolePreview(layout.getStoredItem('sp_preview_role', 'show-all'));

        select.addEventListener('change', function () {
            applyRolePreview(select.value);
        });
    }

    function initActiveNavigation() {
        function normalizePath(value) {
            return (value || '').replace(/\/+$/, '') || '/';
        }

        function pathFromHref(hrefAttr) {
            if (!hrefAttr) {
                return '';
            }

            try {
                return normalizePath(new URL(hrefAttr, window.location.href).pathname);
            } catch (error) {
                return '';
            }
        }

        var path = normalizePath(window.location.pathname);
        var comparablePath = path.toLowerCase();

        document.querySelectorAll('.sidebar-nav .nav-link[data-path]').forEach(function (link) {
            var dataPath = normalizePath(link.dataset.path || '');
            var comparableDataPath = dataPath.toLowerCase();
            var hrefAttr = link.getAttribute('href') || '';
            var hrefPath = pathFromHref(hrefAttr);
            var comparableHrefPath = hrefPath.toLowerCase();
            var matchesDataPath =
                comparableDataPath &&
                (comparablePath === comparableDataPath ||
                    comparablePath.startsWith(comparableDataPath + '/'));
            var matchesHrefPath =
                comparableHrefPath &&
                (comparablePath === comparableHrefPath ||
                    comparablePath.startsWith(comparableHrefPath + '/'));

            if (!matchesDataPath && !matchesHrefPath) {
                return;
            }

            link.classList.add('active');

            var parentMenu = link.closest('.sub-menu');
            if (!parentMenu) {
                return;
            }

            parentMenu.classList.add('open');

            var parentTrigger = document.querySelector('[data-submenu="' + parentMenu.id + '"]');
            if (parentTrigger) {
                parentTrigger.classList.add('open');
            }
        });
    }

    layout.initRolePreview = initRolePreview;
    layout.initActiveNavigation = initActiveNavigation;

    layout.registerInitializer(initRolePreview);
    layout.registerInitializer(initActiveNavigation);
}());
