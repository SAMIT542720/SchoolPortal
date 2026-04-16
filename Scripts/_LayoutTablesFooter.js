(function () {
    'use strict';

    var layout = window.SchoolPortalLayout;

    if (!layout) {
        return;
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

    layout.initResponsiveTables = initResponsiveTables;
    layout.initFooterYear = initFooterYear;

    layout.registerInitializer(initResponsiveTables);
    layout.registerInitializer(initFooterYear);
}());
