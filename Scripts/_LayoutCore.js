(function () {
    'use strict';

    var layout = window.SchoolPortalLayout || {};

    layout.LANG_CONFIG = {
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

    layout.MOBILE_BREAKPOINT = 992;

    layout.ROLE_PREVIEW_CONFIG = {
        'show-all': { label: 'All Roles' },
        student: { label: 'Student' },
        teacher: { label: 'Teacher' },
        schoolmanager: { label: 'School Manager' },
        schoolconsoloer: { label: 'School Counselor' },
        parent: { label: 'Parent' },
        generalmanager: { label: 'General Manager' }
    };

    layout.initializers = layout.initializers || [];
    layout.hasRunInitializers = Boolean(layout.hasRunInitializers);

    layout.getStoredItem = function (key, fallback) {
        try {
            return localStorage.getItem(key) || fallback;
        } catch (error) {
            return fallback;
        }
    };

    layout.setStoredItem = function (key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (error) {
            /* Ignore storage failures. */
        }
    };

    layout.getLanguageConfig = function (lang) {
        return layout.LANG_CONFIG[lang] || layout.LANG_CONFIG.en;
    };

    layout.ensureBootstrapStylesheet = function (href) {
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
    };

    layout.isMobile = function () {
        return window.innerWidth < layout.MOBILE_BREAKPOINT;
    };

    layout.registerInitializer = function (initializer) {
        if (typeof initializer !== 'function') {
            return;
        }

        if (layout.hasRunInitializers) {
            initializer();
            return;
        }

        layout.initializers.push(initializer);
    };

    layout.runInitializers = function () {
        if (layout.hasRunInitializers) {
            return;
        }

        layout.hasRunInitializers = true;
        layout.initializers.forEach(function (initializer) {
            initializer();
        });
    };

    window.SchoolPortalLayout = layout;
}());
