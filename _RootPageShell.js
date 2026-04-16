(function () {
    'use strict';

    var ROLE_OPTIONS = [
        { value: 'show-all', label: 'All Roles' },
        { value: 'student', label: 'Student' },
        { value: 'teacher', label: 'Teacher' },
        { value: 'schoolmanager', label: 'School Manager' },
        { value: 'schoolconsoloer', label: 'School Counselor' },
        { value: 'parent', label: 'Parent' },
        { value: 'generalmanager', label: 'General Manager' }
    ];

    var NAV_SECTIONS = [
        {
            role: 'all',
            title: 'Main',
            items: [
                { href: 'index.html', path: '/index', icon: 'fas fa-house', label: 'Portal Home' },
                { href: 'calendar.html', path: '/calendar', icon: 'fas fa-calendar-days', label: 'Calendar' },
                {
                    href: 'messages.html',
                    path: '/messages',
                    icon: 'fas fa-envelope',
                    label: 'Messages',
                    badge: '5'
                },
                { href: 'settings.html', path: '/settings', icon: 'fas fa-cog', label: 'Settings' }
            ]
        },
        {
            role: 'student',
            title: 'Student',
            items: [
                { href: 'Student/Dashboard.html', path: '/student/dashboard', icon: 'fas fa-user-graduate', label: 'My Dashboard' },
                { href: 'Student/Subjects.html', path: '/student/subjects', icon: 'fas fa-book-open', label: 'My Subjects' },
                { href: 'Student/Schedule.html', path: '/student/schedule', icon: 'fas fa-calendar-alt', label: 'My Schedule' },
                { href: 'Student/Attendance.html', path: '/student/attendance', icon: 'fas fa-clipboard-check', label: 'Attendance' },
                { href: 'Student/Assignments.html', path: '/student/assignments', icon: 'fas fa-list-check', label: 'Assignments' },
                { href: 'Student/Grades.html', path: '/student/grades', icon: 'fas fa-star-half-alt', label: 'Grades &amp; Results' }
            ]
        },
        {
            role: 'teacher',
            title: 'Teacher',
            items: [
                { href: 'Teacher/Dashboard.html', path: '/teacher/dashboard', icon: 'fas fa-chalkboard-teacher', label: 'Teacher Dashboard' },
                { href: 'Teacher/Classes.html', path: '/teacher/classes', icon: 'fas fa-school', label: 'My Classes' },
                { href: 'Teacher/Attendance.html', path: '/teacher/attendance', icon: 'fas fa-user-check', label: 'Attendance Entry' },
                { href: 'Teacher/Gradebook.html', path: '/teacher/gradebook', icon: 'fas fa-book', label: 'Gradebook' },
                { href: 'Teacher/Lessons.html', path: '/teacher/lessons', icon: 'fas fa-note-sticky', label: 'Lesson Plans' },
                { href: 'Teacher/Exams.html', path: '/teacher/exams', icon: 'fas fa-file-signature', label: 'Exam Schedule' }
            ]
        },
        {
            role: 'schoolmanager',
            title: 'School Manager',
            items: [
                { href: 'SchoolManager/Dashboard.html', path: '/schoolmanager/dashboard', icon: 'fas fa-chart-column', label: 'School Dashboard' },
                { href: 'SchoolManager/Students.html', path: '/schoolmanager/students', icon: 'fas fa-user-graduate', label: 'Students' },
                { href: 'SchoolManager/Teachers.html', path: '/schoolmanager/teachers', icon: 'fas fa-user-tie', label: 'Teachers' },
                { href: 'SchoolManager/Classes.html', path: '/schoolmanager/classes', icon: 'fas fa-layer-group', label: 'Classes &amp; Sections' },
                { href: 'SchoolManager/Timetable.html', path: '/schoolmanager/timetable', icon: 'fas fa-calendar-week', label: 'Timetable' },
                { href: 'SchoolManager/Finance.html', path: '/schoolmanager/finance', icon: 'fas fa-file-invoice-dollar', label: 'Finance' },
                { href: 'SchoolManager/Reports.html', path: '/schoolmanager/reports', icon: 'fas fa-chart-line', label: 'Reports' }
            ]
        },
        {
            role: 'schoolconsoloer',
            title: 'School Counselor',
            items: [
                { href: 'SchoolCounselor/Dashboard.html', path: '/schoolcounselor/dashboard', icon: 'fas fa-user-shield', label: 'Counselor Dashboard' },
                { href: 'SchoolCounselor/Cases.html', path: '/schoolcounselor/cases', icon: 'fas fa-folder-open', label: 'Student Cases' },
                { href: 'SchoolCounselor/Appointments.html', path: '/schoolcounselor/appointments', icon: 'fas fa-address-book', label: 'Appointments' },
                { href: 'SchoolCounselor/Behavior.html', path: '/schoolcounselor/behavior', icon: 'fas fa-clipboard-list', label: 'Behavior Reports' },
                { href: 'SchoolCounselor/Parents.html', path: '/schoolcounselor/parents', icon: 'fas fa-comments', label: 'Parent Meetings' },
                { href: 'SchoolCounselor/Referrals.html', path: '/schoolcounselor/referrals', icon: 'fas fa-share-nodes', label: 'Referrals' }
            ]
        },
        {
            role: 'parent',
            title: 'Parent',
            items: [
                { href: 'Parent/Dashboard.html', path: '/parent/dashboard', icon: 'fas fa-house-user', label: 'Parent Dashboard' },
                { href: 'Parent/Children.html', path: '/parent/children', icon: 'fas fa-children', label: 'My Children' },
                { href: 'Parent/Attendance.html', path: '/parent/attendance', icon: 'fas fa-clipboard-check', label: 'Attendance' },
                { href: 'Parent/Grades.html', path: '/parent/grades', icon: 'fas fa-star-half-alt', label: 'Grades &amp; Results' },
                { href: 'Parent/Fees.html', path: '/parent/fees', icon: 'fas fa-wallet', label: 'Fees &amp; Payments' },
                { href: 'Parent/Meetings.html', path: '/parent/meetings', icon: 'fas fa-calendar-check', label: 'Meeting Requests' }
            ]
        },
        {
            role: 'generalmanager',
            title: 'General Manager',
            items: [
                { href: 'GeneralManager/Dashboard.html', path: '/generalmanager/dashboard', icon: 'fas fa-sitemap', label: 'General Dashboard' },
                { href: 'GeneralManager/Schools.html', path: '/generalmanager/schools', icon: 'fas fa-school', label: 'Schools Directory' },
                { href: 'GeneralManager/Add-School.html', path: '/generalmanager/add-school', icon: 'fas fa-square-plus', label: 'Add New School' },
                { href: 'GeneralManager/Edit-Delete-School.html', path: '/generalmanager/school-lifecycle', icon: 'fas fa-trash-can', label: 'Edit / Delete Schools' },
                { href: 'GeneralManager/School-Managers.html', path: '/generalmanager/school-managers', icon: 'fas fa-user-tie', label: 'School Managers' },
                { href: 'GeneralManager/Create-Manager-Accounts.html', path: '/generalmanager/manager-accounts', icon: 'fas fa-user-plus', label: 'Create Manager Accounts' },
                { href: 'GeneralManager/Reports.html', path: '/generalmanager/reports', icon: 'fas fa-chart-pie', label: 'Platform Reports' }
            ]
        }
    ];

    function escapeHtml(value) {
        return String(value || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function renderRoleOptions() {
        return ROLE_OPTIONS.map(function (option) {
            return '<option value="' + escapeHtml(option.value) + '">' +
                escapeHtml(option.label) +
                '</option>';
        }).join('');
    }

    function prefixHref(href, rootPrefix) {
        if (!href || /^(?:[a-z]+:|\/|#)/i.test(href)) {
            return href;
        }

        return (rootPrefix || '') + href;
    }

    function renderNavigation(activePath, rootPrefix) {
        return NAV_SECTIONS.map(function (section) {
            var sectionMarkup =
                '<li data-role="' + escapeHtml(section.role) + '">' +
                    '<span class="nav-section-title">' + escapeHtml(section.title) + '</span>' +
                '</li>';

            var itemsMarkup = section.items.map(function (item) {
                var activeClass = item.path === activePath ? ' active' : '';
                var badgeMarkup = item.badge
                    ? '<span class="badge bg-success nav-badge">' + escapeHtml(item.badge) + '</span>'
                    : '';

                return '' +
                    '<li class="nav-item" data-role="' + escapeHtml(section.role) + '">' +
                        '<a href="' + escapeHtml(prefixHref(item.href, rootPrefix)) + '" class="nav-link' + activeClass + '" data-path="' + escapeHtml(item.path) + '">' +
                            '<i class="' + escapeHtml(item.icon) + ' nav-icon"></i>' +
                            '<span class="nav-label">' + item.label + '</span>' +
                            badgeMarkup +
                        '</a>' +
                    '</li>';
            }).join('');

            return sectionMarkup + itemsMarkup;
        }).join('');
    }

    function renderNotifications(rootPrefix) {
        return '' +
            '<div class="dropdown">' +
                '<button class="icon-btn" id="notifDropdown" data-bs-toggle="dropdown" aria-expanded="false" aria-label="Notifications">' +
                    '<i class="fas fa-bell"></i>' +
                    '<span class="dot-badge" aria-hidden="true"></span>' +
                '</button>' +
                '<div class="dropdown-menu dropdown-menu-end p-0 notifications-menu" aria-labelledby="notifDropdown">' +
                    '<div class="d-flex justify-content-between align-items-center px-3 py-2 border-bottom">' +
                        '<span class="fw-semibold small">Notifications</span>' +
                        '<a href="#" class="text-primary notifications-mark-all">Mark all read</a>' +
                    '</div>' +
                    '<a href="#" class="dropdown-item py-2 border-bottom">' +
                        '<div class="d-flex gap-2 align-items-start">' +
                            '<div class="notif-icon bg-primary"><i class="fas fa-user-plus"></i></div>' +
                            '<div>' +
                                '<div class="fw-semibold notification-title">New student enrolled</div>' +
                                '<div class="text-muted notification-copy">Ahmed Ali joined Class 10-A</div>' +
                                '<div class="text-muted notification-time">2 minutes ago</div>' +
                            '</div>' +
                        '</div>' +
                    '</a>' +
                    '<a href="#" class="dropdown-item py-2 border-bottom">' +
                        '<div class="d-flex gap-2 align-items-start">' +
                            '<div class="notif-icon bg-warning"><i class="fas fa-exclamation-triangle"></i></div>' +
                            '<div>' +
                                '<div class="fw-semibold notification-title">Attendance alert</div>' +
                                '<div class="text-muted notification-copy">3 students absent today</div>' +
                                '<div class="text-muted notification-time">1 hour ago</div>' +
                            '</div>' +
                        '</div>' +
                    '</a>' +
                    '<a href="#" class="dropdown-item py-2">' +
                        '<div class="d-flex gap-2 align-items-start">' +
                            '<div class="notif-icon bg-success"><i class="fas fa-check-circle"></i></div>' +
                            '<div>' +
                                '<div class="fw-semibold notification-title">Exam results published</div>' +
                                '<div class="text-muted notification-copy">Semester 1 grades are live</div>' +
                                '<div class="text-muted notification-time">Yesterday</div>' +
                            '</div>' +
                        '</div>' +
                    '</a>' +
                    '<div class="text-center py-2 border-top">' +
                        '<a href="' + escapeHtml(prefixHref('notifications.html', rootPrefix)) + '" class="text-primary notifications-view-all">View all</a>' +
                    '</div>' +
                '</div>' +
            '</div>';
    }

    function renderLanguageSwitcher() {
        return '' +
            '<div class="dropdown">' +
                '<button class="lang-btn" id="langDropdown" data-bs-toggle="dropdown" aria-expanded="false" aria-label="Switch language">' +
                    '<span id="langFlag">EN</span>' +
                    '<span id="langCode">EN</span>' +
                    '<i class="fas fa-chevron-down dropdown-chevron"></i>' +
                '</button>' +
                '<ul class="dropdown-menu dropdown-menu-end" aria-labelledby="langDropdown">' +
                    '<li><button class="dropdown-item" data-lang="en">English</button></li>' +
                    '<li><button class="dropdown-item" data-lang="fr">Fran&ccedil;ais</button></li>' +
                    '<li><button class="dropdown-item" data-lang="ar">&#1575;&#1604;&#1593;&#1585;&#1576;&#1610;&#1577;</button></li>' +
                '</ul>' +
            '</div>';
    }

    function renderUserMenu(user, rootPrefix) {
        return '' +
            '<div class="dropdown">' +
                '<button class="user-btn" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false" aria-label="User menu">' +
                    '<div class="u-avatar" id="navAvatar">' + escapeHtml(user.initial) + '</div>' +
                    '<span class="u-name d-none d-lg-inline" id="navUserName">' + escapeHtml(user.shortName) + '</span>' +
                    '<i class="fas fa-chevron-down text-muted d-none d-lg-inline dropdown-chevron"></i>' +
                '</button>' +
                '<ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">' +
                    '<li><a class="dropdown-item" href="' + escapeHtml(prefixHref('profile.html', rootPrefix)) + '"><i class="fas fa-user-circle me-2 text-muted"></i>My Profile</a></li>' +
                    '<li><a class="dropdown-item" href="' + escapeHtml(prefixHref('settings.html', rootPrefix)) + '"><i class="fas fa-cog me-2 text-muted"></i>Settings</a></li>' +
                    '<li><hr class="dropdown-divider"></li>' +
                    '<li><a class="dropdown-item text-danger" href="' + escapeHtml(prefixHref('login.html', rootPrefix)) + '"><i class="fas fa-sign-out-alt me-2"></i>Sign Out</a></li>' +
                '</ul>' +
            '</div>';
    }

    function renderShell(options, contentMarkup) {
        var pageHeading = escapeHtml(options.pageHeading || options.pageTitle || 'School Portal');
        var rootPrefix = options.rootPrefix || '';
        var user = {
            initial: options.userInitial || 'A',
            fullName: options.userFullName || 'Admin User',
            shortName: options.userShortName || 'Admin',
            role: options.userRole || 'Administrator'
        };

        return '' +
            '<div class="app-wrapper">' +
                '<aside id="appSidebar" aria-label="Main Navigation">' +
                    '<a href="' + escapeHtml(prefixHref('index.html', rootPrefix)) + '" class="sidebar-brand">' +
                        '<div class="brand-icon"><i class="fas fa-graduation-cap"></i></div>' +
                        '<div class="brand-name">School Portal<small class="brand-sub">Management System</small></div>' +
                    '</a>' +
                    '<nav class="sidebar-nav">' +
                        '<ul class="list-unstyled mb-0">' + renderNavigation(options.activePath || '', rootPrefix) + '</ul>' +
                    '</nav>' +
                    '<div class="sidebar-foot">' +
                        '<div class="s-avatar" id="sidebarAvatar">' + escapeHtml(user.initial) + '</div>' +
                        '<div class="s-info">' +
                            '<div class="s-name" id="sidebarUserName">' + escapeHtml(user.fullName) + '</div>' +
                            '<div class="s-role">' + escapeHtml(user.role) + '</div>' +
                        '</div>' +
                    '</div>' +
                '</aside>' +
                '<div id="sidebarOverlay" aria-hidden="true"></div>' +
                '<div class="main-content" id="mainContent">' +
                    '<header class="top-navbar">' +
                        '<button class="toggle-btn" id="sidebarToggleBtn" aria-label="Toggle navigation"><i class="fas fa-bars"></i></button>' +
                        '<h1 class="page-heading-sm d-none d-sm-block" id="pageHeading">' + pageHeading + '</h1>' +
                        '<div class="nav-actions">' +
                            '<button class="icon-btn d-none d-md-flex" aria-label="Search"><i class="fas fa-search"></i></button>' +
                            '<div class="role-switcher" aria-label="Role preview">' +
                                '<i class="fas fa-id-badge role-switcher-icon" aria-hidden="true"></i>' +
                                '<label class="visually-hidden" for="rolePreviewSelect">Role preview</label>' +
                                '<select id="rolePreviewSelect" class="role-switcher-select">' + renderRoleOptions() + '</select>' +
                            '</div>' +
                            renderNotifications(rootPrefix) +
                            renderLanguageSwitcher() +
                            renderUserMenu(user, rootPrefix) +
                        '</div>' +
                    '</header>' +
                    '<main class="content-area" id="pageContent">' + contentMarkup + '</main>' +
                    '<footer class="app-footer">' +
                        '<span>&copy; <span id="copyrightYear"></span> School Portal &mdash; All rights reserved.</span>' +
                        '<span>v1.0.0 &nbsp;&bull;&nbsp; <a href="' + escapeHtml(prefixHref('privacy.html', rootPrefix)) + '">Privacy Policy</a> &nbsp;&bull;&nbsp; <a href="' + escapeHtml(prefixHref('support.html', rootPrefix)) + '">Support</a></span>' +
                    '</footer>' +
                '</div>' +
            '</div>';
    }

    function render(options) {
        var config = options || {};
        var template = document.getElementById(config.templateId || 'pageContentTemplate');
        var contentMarkup = template ? template.innerHTML : '';

        if (template) {
            template.insertAdjacentHTML('afterend', renderShell(config, contentMarkup));
            template.remove();
            return;
        }

        document.body.insertAdjacentHTML('afterbegin', renderShell(config, contentMarkup));
    }

    window.SchoolPortalRootShell = {
        render: render
    };
}());
