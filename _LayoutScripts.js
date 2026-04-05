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

        window.addEventListener('resize', function () {
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

    function initActiveNavigation() {
        var path = window.location.pathname.replace(/\/+$/, '') || '/';

        document.querySelectorAll('.sidebar-nav .nav-link[data-path]').forEach(function (link) {
            var linkPath = link.dataset.path.replace(/\/+$/, '');
            if (path !== linkPath && !path.startsWith(linkPath + '/')) {
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
        initActiveNavigation();
        initFooterYear();
    }

    initLanguageBootstrap();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLayout);
    } else {
        initLayout();
    }
}());
