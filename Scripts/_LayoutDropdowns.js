(function () {
    'use strict';

    var layout = window.SchoolPortalLayout;

    if (!layout) {
        return;
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

    layout.initHeaderDropdowns = initHeaderDropdowns;
    layout.registerInitializer(initHeaderDropdowns);
}());
