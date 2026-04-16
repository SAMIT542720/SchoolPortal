(function () {
    'use strict';

    var LAYOUT_PARTS = [
        '_LayoutCore.js',
        '_LayoutLanguage.js',
        '_LayoutSidebar.js',
        '_LayoutDropdowns.js',
        '_LayoutNavigation.js',
        '_LayoutTablesFooter.js',
        '_LayoutInit.js'
    ];

    function getBaseHref() {
        var currentScript = document.currentScript;

        if (currentScript && currentScript.src) {
            return new URL('.', currentScript.src).href;
        }

        var scripts = document.getElementsByTagName('script');
        for (var i = scripts.length - 1; i >= 0; i -= 1) {
            var script = scripts[i];
            var src = script.getAttribute('src') || '';

            if (src.indexOf('_LayoutScripts.js') !== -1 && script.src) {
                return new URL('.', script.src).href;
            }
        }

        return '';
    }

    function resolvePartUrl(fileName, baseHref) {
        try {
            return baseHref ? new URL(fileName, baseHref).href : fileName;
        } catch (error) {
            return fileName;
        }
    }

    function escapeAttribute(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;');
    }

    function loadScript(src) {
        if (document.readyState === 'loading') {
            document.write('<script src="' + escapeAttribute(src) + '"><\/script>');
            return;
        }

        var script = document.createElement('script');
        script.async = false;
        script.src = src;
        document.head.appendChild(script);
    }

    var baseHref = getBaseHref();

    LAYOUT_PARTS.forEach(function (fileName) {
        loadScript(resolvePartUrl(fileName, baseHref));
    });
}());
