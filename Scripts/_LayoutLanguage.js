(function () {
    'use strict';

    var layout = window.SchoolPortalLayout;

    if (!layout) {
        return;
    }

    function applyLanguage(lang, shouldReload) {
        var cfg = layout.getLanguageConfig(lang);

        layout.setStoredItem('sp_lang', lang);

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
            layout.ensureBootstrapStylesheet(cfg.bsCss);
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
        var lang = layout.getStoredItem('sp_lang', 'en');
        var cfg = layout.getLanguageConfig(lang);

        document.documentElement.dir = cfg.dir;
        document.documentElement.lang = lang;
        layout.ensureBootstrapStylesheet(cfg.bsCss);
    }

    function initLanguageSwitcher() {
        var currentLang = layout.getStoredItem('sp_lang', 'en');
        applyLanguage(currentLang, false);

        document.querySelectorAll('[data-lang]').forEach(function (button) {
            button.addEventListener('click', function () {
                var selectedLang = button.dataset.lang;
                if (selectedLang === layout.getStoredItem('sp_lang', 'en')) {
                    return;
                }

                applyLanguage(selectedLang, true);
            });
        });
    }

    layout.applyLanguage = applyLanguage;
    layout.initLanguageBootstrap = initLanguageBootstrap;
    layout.initLanguageSwitcher = initLanguageSwitcher;

    initLanguageBootstrap();
    layout.registerInitializer(initLanguageSwitcher);
}());
