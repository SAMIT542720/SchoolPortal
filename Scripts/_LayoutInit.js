(function () {
    'use strict';

    var layout = window.SchoolPortalLayout;

    if (!layout) {
        return;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', layout.runInitializers);
    } else {
        layout.runInitializers();
    }
}());
