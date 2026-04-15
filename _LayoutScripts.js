(function () {
    'use strict';

    var LANG_CONFIG = {
        en: {
            flag: '\uD83C\uDDEC\uD83C\uDDE7',
            code: 'EN',
            dir: 'ltr',
            bsCss: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css'
        },
        fr: {
            flag: '\uD83C\uDDEB\uD83C\uDDF7',
            code: 'FR',
            dir: 'ltr',
            bsCss: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css'
        },
        ar: {
            flag: '\uD83C\uDDF8\uD83C\uDDE6',
            code: 'AR',
            dir: 'rtl',
            bsCss: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css'
        }
    };
    var MOBILE_BREAKPOINT = 992;
    var ROLE_PREVIEW_CONFIG = {
        'show-all': { label: 'All Roles' },
        student: { label: 'Student' },
        teacher: { label: 'Teacher' },
        schoolmanager: { label: 'School Manager' },
        schoolconsoloer: { label: 'School Counselor' },
        parent: { label: 'Parent' },
        generalmanager: { label: 'General Manager' }
    };

    function getStoredItem(key, fallback) {
        try {
            return localStorage.getItem(key) || fallback;
        } catch (error) {
            return fallback;
        }
    }

    function setStoredItem(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (error) {
            /* Ignore storage failures. */
        }
    }

    function getLanguageConfig(lang) {
        return LANG_CONFIG[lang] || LANG_CONFIG.en;
    }

    function ensureBootstrapStylesheet(href) {
        if (document.getElementById('bootstrapCSS')) {
            return;
        }

        var linkMarkup =
            '<link rel="stylesheet" id="bootstrapCSS" crossorigin="anonymous" href="' +
            href +
            '">';

        if (document.readyState === 'loading') {
            document.write(linkMarkup);
            return;
        }

        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.id = 'bootstrapCSS';
        link.crossOrigin = 'anonymous';
        link.href = href;
        document.head.appendChild(link);
    }

    function isMobile() {
        return window.innerWidth < MOBILE_BREAKPOINT;
    }

    function applyLanguage(lang, shouldReload) {
        var cfg = getLanguageConfig(lang);

        setStoredItem('sp_lang', lang);

        if (shouldReload) {
            window.location.reload();
            return;
        }

        document.documentElement.dir = cfg.dir;
        document.documentElement.lang = lang;

        var bsLink = document.getElementById('bootstrapCSS');
        if (bsLink) {
            bsLink.href = cfg.bsCss;
        } else {
            ensureBootstrapStylesheet(cfg.bsCss);
        }

        var flagEl = document.getElementById('langFlag');
        var codeEl = document.getElementById('langCode');
        if (flagEl) {
            flagEl.textContent = cfg.flag;
        }
        if (codeEl) {
            codeEl.textContent = cfg.code;
        }

        document.querySelectorAll('[data-lang]').forEach(function (button) {
            button.classList.toggle('active', button.dataset.lang === lang);
        });
    }

    function initLanguageBootstrap() {
        var lang = getStoredItem('sp_lang', 'en');
        var cfg = getLanguageConfig(lang);

        document.documentElement.dir = cfg.dir;
        document.documentElement.lang = lang;
        ensureBootstrapStylesheet(cfg.bsCss);
    }

    function initLanguageSwitcher() {
        var currentLang = getStoredItem('sp_lang', 'en');
        applyLanguage(currentLang, false);

        document.querySelectorAll('[data-lang]').forEach(function (button) {
            button.addEventListener('click', function () {
                var selectedLang = button.dataset.lang;
                if (selectedLang === getStoredItem('sp_lang', 'en')) {
                    return;
                }

                applyLanguage(selectedLang, true);
            });
        });
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
            return !isMobile() && sidebar && sidebar.classList.contains('collapsed');
        }

        if (toggleBtn && sidebar && overlay) {
            toggleBtn.addEventListener('click', function () {
                if (isMobile()) {
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
                setStoredItem('sp_sidebar_collapsed', collapsed ? '1' : '0');
            });
        }

        if (overlay && sidebar) {
            overlay.addEventListener('click', function () {
                sidebar.classList.remove('mobile-open');
                overlay.classList.remove('show');
                overlay.setAttribute('aria-hidden', 'true');
            });
        }

        if (!isMobile() && sidebar && content && getStoredItem('sp_sidebar_collapsed', '0') === '1') {
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

            if (!isMobile() && sidebar && overlay) {
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

    function initHeaderDropdowns() {
        var dropdowns = Array.prototype.slice.call(
            document.querySelectorAll('.top-navbar .dropdown')
        );

        if (!dropdowns.length) {
            return;
        }

        function getParts(dropdown) {
            return {
                trigger: dropdown.querySelector('[data-bs-toggle="dropdown"]'),
                menu: dropdown.querySelector('.dropdown-menu')
            };
        }

        function closeDropdown(dropdown) {
            var parts = getParts(dropdown);
            if (!parts.trigger || !parts.menu) {
                return;
            }

            dropdown.classList.remove('show');
            parts.trigger.classList.remove('show');
            parts.menu.classList.remove('show');
            parts.trigger.setAttribute('aria-expanded', 'false');
        }

        function openDropdown(dropdown) {
            var parts = getParts(dropdown);
            if (!parts.trigger || !parts.menu) {
                return;
            }

            dropdown.classList.add('show');
            parts.trigger.classList.add('show');
            parts.menu.classList.add('show');
            parts.trigger.setAttribute('aria-expanded', 'true');
        }

        function closeAll(exceptDropdown) {
            dropdowns.forEach(function (dropdown) {
                if (dropdown !== exceptDropdown) {
                    closeDropdown(dropdown);
                }
            });
        }

        dropdowns.forEach(function (dropdown) {
            var parts = getParts(dropdown);
            if (!parts.trigger || !parts.menu) {
                return;
            }

            dropdown.addEventListener('click', function (event) {
                event.stopPropagation();
            });

            parts.trigger.addEventListener('click', function (event) {
                var isOpen = parts.menu.classList.contains('show');

                event.preventDefault();
                event.stopPropagation();

                if (isOpen) {
                    closeDropdown(dropdown);
                    return;
                }

                closeAll(dropdown);
                openDropdown(dropdown);
            });
        });

        document.addEventListener('click', function () {
            closeAll();
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                closeAll();
            }
        });

        window.addEventListener('resize', function () {
            closeAll();
        });
    }

    function initRolePreview() {
        var select = document.getElementById('rolePreviewSelect');
        var roleItems = document.querySelectorAll('.sidebar-nav [data-role]');

        if (!select || !roleItems.length) {
            return;
        }

        function normalizeRole(role) {
            return ROLE_PREVIEW_CONFIG[role] ? role : 'show-all';
        }

        function applyRolePreview(role) {
            var normalizedRole = normalizeRole(role);

            select.value = normalizedRole;
            setStoredItem('sp_preview_role', normalizedRole);
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

        applyRolePreview(getStoredItem('sp_preview_role', 'show-all'));

        select.addEventListener('change', function () {
            applyRolePreview(select.value);
        });
    }

    function initActiveNavigation() {
        var path = window.location.pathname.replace(/\/+$/, '') || '/';

        document.querySelectorAll('.sidebar-nav .nav-link[data-path]').forEach(function (link) {
            var dataPath = (link.dataset.path || '').replace(/\/+$/, '');
            var hrefAttr = link.getAttribute('href') || '';
            var hrefPath = hrefAttr
                ? new URL(hrefAttr, window.location.origin).pathname.replace(/\/+$/, '')
                : '';
            var matchesDataPath =
                dataPath && (path === dataPath || path.startsWith(dataPath + '/'));
            var matchesHrefPath =
                hrefPath && (path === hrefPath || path.startsWith(hrefPath + '/'));

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

    function initResponsiveTables() {
        var tables = Array.prototype.slice.call(
            document.querySelectorAll('.gm-table-stack')
        );

        if (!tables.length) {
            return;
        }

        tables.forEach(function (table) {
            var headerLabels = Array.prototype.slice
                .call(table.querySelectorAll('thead tr:first-child th'))
                .map(function (cell) {
                    return cell.textContent.replace(/\s+/g, ' ').trim();
                });

            if (!headerLabels.length) {
                return;
            }

            Array.prototype.slice.call(table.querySelectorAll('tbody tr')).forEach(function (row) {
                var rowHeader = row.querySelector('th[scope="row"]');
                var columnIndex = rowHeader ? 1 : 0;

                Array.prototype.slice.call(row.children).forEach(function (cell) {
                    if (cell.tagName !== 'TD' || cell.hasAttribute('data-label')) {
                        return;
                    }

                    var colSpan = parseInt(cell.getAttribute('colspan') || '1', 10);
                    var label = headerLabels
                        .slice(columnIndex, columnIndex + colSpan)
                        .filter(Boolean)
                        .join(' / ');

                    cell.setAttribute('data-label', label || 'Details');
                    columnIndex += colSpan;
                });
            });
        });
    }

    function initFooterYear() {
        var yearEl = document.getElementById('copyrightYear');
        if (yearEl) {
            yearEl.textContent = new Date().getFullYear();
        }
    }

    function initLayout() {
        initLanguageSwitcher();
        initSidebar();
        initSubmenus();
        initHeaderDropdowns();
        initRolePreview();
        initActiveNavigation();
        initResponsiveTables();
        initFooterYear();
    }

    initLanguageBootstrap();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLayout);
    } else {
        initLayout();
    }
}());
