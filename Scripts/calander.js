(function () {
    'use strict';

    var today = stripTime(new Date());
    var selectedDate = stripTime(new Date());
    var visibleMonth = firstOfMonth(selectedDate);
    var explicitEvents = buildExplicitEvents();
    var els = {};

    var CATEGORY_CLASS = {
        activity: 'success',
        deadline: 'warning',
        exam: 'danger',
        general: '',
        meeting: ''
    };

    var CATEGORY_LABEL = {
        activity: 'Activity',
        deadline: 'Deadline',
        exam: 'Exam',
        general: 'Event',
        meeting: 'Meeting'
    };

    function initCalendar() {
        els.days = document.getElementById('calendarDays');
        if (!els.days) {
            return;
        }

        els.todayHeading = document.getElementById('calendarTodayHeading');
        els.selectedHint = document.getElementById('calendarSelectedHint');
        els.datePicker = document.getElementById('calendarDatePicker');
        els.todayDateValue = document.getElementById('calendarTodayDateValue');
        els.todayDateLabel = document.getElementById('calendarTodayDateLabel');
        els.selectedEventCount = document.getElementById('calendarSelectedEventCount');
        els.selectedEventLabel = document.getElementById('calendarSelectedEventLabel');
        els.meetingsCount = document.getElementById('calendarMeetingsCount');
        els.deadlinesCount = document.getElementById('calendarDeadlinesCount');
        els.monthTitle = document.getElementById('calendarMonthTitle');
        els.monthSubtitle = document.getElementById('calendarMonthSubtitle');
        els.selectedDayNumber = document.getElementById('calendarSelectedDayNumber');
        els.selectedDateTitle = document.getElementById('calendarSelectedDateTitle');
        els.selectedDateMeta = document.getElementById('calendarSelectedDateMeta');
        els.scheduleTitle = document.getElementById('selectedScheduleTitle');
        els.scheduleSubtitle = document.getElementById('calendarScheduleSubtitle');
        els.scheduleList = document.getElementById('calendarScheduleList');
        els.generalCount = document.getElementById('calendarGeneralCount');
        els.activitiesCount = document.getElementById('calendarActivitiesCount');
        els.deadlineCount = document.getElementById('calendarDeadlineCount');
        els.examCount = document.getElementById('calendarExamCount');

        document.querySelectorAll('[data-calendar-action]').forEach(function (button) {
            button.addEventListener('click', function () {
                handleAction(button.dataset.calendarAction);
            });
        });

        els.days.addEventListener('click', function (event) {
            var dayButton = event.target.closest('.calendar-day');
            if (!dayButton || !dayButton.dataset.date) {
                return;
            }

            selectDate(parseDateKey(dayButton.dataset.date));
        });

        if (els.datePicker) {
            els.datePicker.addEventListener('change', function () {
                if (els.datePicker.value) {
                    selectDate(parseDateKey(els.datePicker.value));
                }
            });
        }

        renderCalendar();
    }

    function handleAction(action) {
        if (action === 'prev-day') {
            selectDate(addDays(selectedDate, -1));
            return;
        }

        if (action === 'next-day') {
            selectDate(addDays(selectedDate, 1));
            return;
        }

        if (action === 'prev-month') {
            selectDate(shiftMonth(selectedDate, -1));
            return;
        }

        if (action === 'next-month') {
            selectDate(shiftMonth(selectedDate, 1));
            return;
        }

        if (action === 'today') {
            selectDate(today);
        }
    }

    function selectDate(date) {
        selectedDate = stripTime(date);
        visibleMonth = firstOfMonth(selectedDate);
        renderCalendar();
    }

    function renderCalendar() {
        var selectedEvents = getEventsForDate(selectedDate);
        var stats = getMonthStats(visibleMonth);

        setText(els.todayHeading, formatFullDate(today));
        setText(els.selectedHint, getSelectedHint(selectedDate));
        setText(els.todayDateValue, String(today.getDate()));
        setText(els.todayDateLabel, formatFullDate(today));
        setText(els.selectedEventCount, String(selectedEvents.length));
        setText(
            els.selectedEventLabel,
            selectedEvents.length === 1 ? '1 event on selected day' : selectedEvents.length + ' events on selected day'
        );
        setText(els.meetingsCount, String(stats.meeting));
        setText(els.deadlinesCount, String(stats.deadline));
        setText(els.monthTitle, formatMonth(visibleMonth));
        setText(els.monthSubtitle, 'Select any day in ' + formatMonth(visibleMonth) + ' to review its schedule.');
        setText(els.selectedDayNumber, String(selectedDate.getDate()));
        setText(els.selectedDateTitle, getSelectedTitle(selectedDate));
        setText(els.selectedDateMeta, formatFullDate(selectedDate));
        setText(els.scheduleTitle, getSelectedTitle(selectedDate) + ' schedule');
        setText(
            els.scheduleSubtitle,
            selectedEvents.length === 1 ? '1 scheduled item for ' + formatShortDate(selectedDate) + '.' :
                selectedEvents.length + ' scheduled items for ' + formatShortDate(selectedDate) + '.'
        );
        setText(els.generalCount, String(stats.general));
        setText(els.activitiesCount, String(stats.activity));
        setText(els.deadlineCount, String(stats.deadline));
        setText(els.examCount, String(stats.exam));

        if (els.datePicker) {
            els.datePicker.value = toDateKey(selectedDate);
        }

        renderMonthGrid();
        renderSchedule(selectedEvents);
    }

    function renderMonthGrid() {
        var firstDay = firstOfMonth(visibleMonth);
        var monthStartOffset = (firstDay.getDay() + 6) % 7;
        var gridStart = addDays(firstDay, -monthStartOffset);

        els.days.textContent = '';

        for (var index = 0; index < 42; index += 1) {
            var cellDate = addDays(gridStart, index);
            var events = getEventsForDate(cellDate);
            var button = document.createElement('button');
            var dateLabel = document.createElement('span');
            var dateNumber = document.createElement('span');

            button.type = 'button';
            button.className = 'calendar-day';
            button.dataset.date = toDateKey(cellDate);
            button.setAttribute('aria-label', formatFullDate(cellDate));
            button.setAttribute('aria-pressed', String(isSameDate(cellDate, selectedDate)));

            if (cellDate.getMonth() !== visibleMonth.getMonth()) {
                button.classList.add('muted');
            }
            if (isSameDate(cellDate, today)) {
                button.classList.add('today');
            }
            if (isSameDate(cellDate, selectedDate)) {
                button.classList.add('is-selected');
            }

            dateLabel.className = 'calendar-date';
            dateNumber.textContent = String(cellDate.getDate());
            dateLabel.appendChild(dateNumber);

            if (isSameDate(cellDate, today)) {
                dateLabel.appendChild(createDateNote('Today'));
            } else if (isSameDate(cellDate, selectedDate)) {
                dateLabel.appendChild(createDateNote('Selected'));
            }

            button.appendChild(dateLabel);

            events.slice(0, 2).forEach(function (item) {
                button.appendChild(createEventChip(item));
            });

            if (events.length > 2) {
                button.appendChild(createMoreChip(events.length - 2));
            }

            els.days.appendChild(button);
        }
    }

    function renderSchedule(events) {
        els.scheduleList.textContent = '';

        if (!events.length) {
            var emptyState = document.createElement('div');
            var icon = document.createElement('i');
            var copy = document.createElement('div');
            var title = document.createElement('strong');
            var description = document.createElement('small');

            emptyState.className = 'calendar-empty-state';
            icon.className = 'fas fa-calendar-plus';
            title.textContent = 'No events scheduled';
            description.textContent = 'Use Add Event when this day needs a class, meeting, exam, or deadline.';

            copy.appendChild(title);
            copy.appendChild(description);
            emptyState.appendChild(icon);
            emptyState.appendChild(copy);
            els.scheduleList.appendChild(emptyState);
            return;
        }

        events.forEach(function (item) {
            var row = document.createElement('div');
            var time = document.createElement('div');
            var copy = document.createElement('div');
            var title = document.createElement('strong');
            var description = document.createElement('small');
            var badge = document.createElement('span');

            row.className = 'schedule-row';
            time.className = 'schedule-time';
            copy.className = 'schedule-copy';
            badge.className = 'status-pill ' + statusClassForCategory(item.category);

            time.textContent = item.time;
            title.textContent = item.title;
            description.textContent = item.description;
            badge.textContent = CATEGORY_LABEL[item.category] || 'Event';

            copy.appendChild(title);
            copy.appendChild(description);
            row.appendChild(time);
            row.appendChild(copy);
            row.appendChild(badge);
            els.scheduleList.appendChild(row);
        });
    }

    function createDateNote(text) {
        var note = document.createElement('span');
        note.className = 'calendar-date-note';
        note.textContent = text;
        return note;
    }

    function createEventChip(item) {
        var chip = document.createElement('span');
        var categoryClass = CATEGORY_CLASS[item.category];

        chip.className = 'calendar-event';
        if (categoryClass) {
            chip.classList.add(categoryClass);
        }
        chip.textContent = item.title;
        return chip;
    }

    function createMoreChip(count) {
        var chip = document.createElement('span');
        chip.className = 'calendar-event calendar-event-more';
        chip.textContent = '+' + count + ' more';
        return chip;
    }

    function getEventsForDate(date) {
        var key = toDateKey(date);
        var events = (explicitEvents[key] || []).slice();
        var weekday = date.getDay();
        var day = date.getDate();

        if (weekday === 1) {
            events.push({
                time: '08:00',
                title: 'Teacher briefing',
                description: 'Weekly planning check-in for department leads.',
                category: 'general'
            });
        }

        if (weekday === 3 && day > 7 && day < 23) {
            events.push({
                time: '14:30',
                title: 'Parent calls',
                description: 'Follow up with families on attendance and support plans.',
                category: 'meeting'
            });
        }

        if (weekday === 5) {
            events.push({
                time: '16:00',
                title: 'Assignment due',
                description: 'Teachers close weekly assignment submissions.',
                category: 'deadline'
            });
        }

        if (day === 10 || day === 24) {
            events.push({
                time: '12:30',
                title: day === 10 ? 'Clubs showcase' : 'Sports day',
                description: 'Student activity schedule managed by the school office.',
                category: 'activity'
            });
        }

        if (day === 15) {
            events.push({
                time: '11:00',
                title: 'Grade review',
                description: 'Department review before grades are published.',
                category: 'deadline'
            });
        }

        if (day === 20) {
            events.push({
                time: '09:00',
                title: 'Midterm exams',
                description: 'Shared exam block for core subjects.',
                category: 'exam'
            });
        }

        return events.sort(function (a, b) {
            return a.time.localeCompare(b.time);
        });
    }

    function buildExplicitEvents() {
        var events = {};

        addSeedEvent(events, 0, {
            time: '08:15',
            title: 'Math room check',
            description: 'Confirm Room 12 projector and seating before first period.',
            category: 'general'
        });
        addSeedEvent(events, 0, {
            time: '10:30',
            title: 'Counselor meeting',
            description: 'Review referral notes with the grade 9 support team.',
            category: 'meeting'
        });
        addSeedEvent(events, 0, {
            time: '13:00',
            title: 'Parent conference',
            description: 'Meet with Class 10-A parent group in Meeting Room B.',
            category: 'meeting'
        });
        addSeedEvent(events, 0, {
            time: '15:45',
            title: 'Attendance follow-up',
            description: 'Resolve absences flagged by the morning attendance report.',
            category: 'deadline'
        });
        addSeedEvent(events, 1, {
            time: '09:00',
            title: 'Science lab check',
            description: 'Prepare lab stations and safety sheets for section B.',
            category: 'general'
        });
        addSeedEvent(events, 1, {
            time: '16:00',
            title: 'Essay draft deadline',
            description: 'English draft submissions close for Class 10-A.',
            category: 'deadline'
        });
        addSeedEvent(events, 2, {
            time: '11:30',
            title: 'Drama rehearsal',
            description: 'Auditorium booking for the spring performance group.',
            category: 'activity'
        });
        addSeedEvent(events, 4, {
            time: '09:00',
            title: 'Math midterm',
            description: 'Hall B exam block for grade 10 mathematics.',
            category: 'exam'
        });
        addSeedEvent(events, 6, {
            time: '13:30',
            title: 'Staff workshop',
            description: 'Professional development session for assessment planning.',
            category: 'general'
        });
        addSeedEvent(events, 11, {
            time: '10:00',
            title: 'Report cards',
            description: 'Report card draft review before parent release.',
            category: 'general'
        });

        return events;
    }

    function addSeedEvent(events, offset, eventData) {
        var key = toDateKey(addDays(today, offset));
        if (!events[key]) {
            events[key] = [];
        }
        events[key].push(eventData);
    }

    function getMonthStats(monthDate) {
        var stats = {
            activity: 0,
            deadline: 0,
            exam: 0,
            general: 0,
            meeting: 0
        };
        var year = monthDate.getFullYear();
        var month = monthDate.getMonth();
        var lastDay = new Date(year, month + 1, 0).getDate();

        for (var day = 1; day <= lastDay; day += 1) {
            getEventsForDate(new Date(year, month, day)).forEach(function (item) {
                if (Object.prototype.hasOwnProperty.call(stats, item.category)) {
                    stats[item.category] += 1;
                }
            });
        }

        return stats;
    }

    function getSelectedHint(date) {
        var daysFromToday = Math.round((date.getTime() - today.getTime()) / 86400000);

        if (daysFromToday === 0) {
            return 'Viewing today.';
        }
        if (daysFromToday === 1) {
            return 'Viewing tomorrow.';
        }
        if (daysFromToday === -1) {
            return 'Viewing yesterday.';
        }
        if (daysFromToday > 1) {
            return 'Viewing ' + daysFromToday + ' days from today.';
        }
        return 'Viewing ' + Math.abs(daysFromToday) + ' days before today.';
    }

    function getSelectedTitle(date) {
        if (isSameDate(date, today)) {
            return 'Today';
        }
        if (isSameDate(date, addDays(today, 1))) {
            return 'Tomorrow';
        }
        if (isSameDate(date, addDays(today, -1))) {
            return 'Yesterday';
        }
        return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
    }

    function statusClassForCategory(category) {
        if (category === 'activity') {
            return 'active';
        }
        if (category === 'deadline') {
            return 'pending';
        }
        if (category === 'exam') {
            return 'inactive';
        }
        return 'review';
    }

    function formatMonth(date) {
        return new Intl.DateTimeFormat('en-US', {
            month: 'long',
            year: 'numeric'
        }).format(date);
    }

    function formatFullDate(date) {
        return new Intl.DateTimeFormat('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        }).format(date);
    }

    function formatShortDate(date) {
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        }).format(date);
    }

    function toDateKey(date) {
        return [
            date.getFullYear(),
            pad(date.getMonth() + 1),
            pad(date.getDate())
        ].join('-');
    }

    function parseDateKey(value) {
        var parts = value.split('-').map(Number);
        return new Date(parts[0], parts[1] - 1, parts[2]);
    }

    function pad(value) {
        return String(value).padStart(2, '0');
    }

    function stripTime(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

    function firstOfMonth(date) {
        return new Date(date.getFullYear(), date.getMonth(), 1);
    }

    function addDays(date, amount) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);
    }

    function shiftMonth(date, amount) {
        var targetMonth = new Date(date.getFullYear(), date.getMonth() + amount, 1);
        var targetLastDay = new Date(targetMonth.getFullYear(), targetMonth.getMonth() + 1, 0).getDate();
        return new Date(
            targetMonth.getFullYear(),
            targetMonth.getMonth(),
            Math.min(date.getDate(), targetLastDay)
        );
    }

    function isSameDate(firstDate, secondDate) {
        return firstDate.getFullYear() === secondDate.getFullYear() &&
            firstDate.getMonth() === secondDate.getMonth() &&
            firstDate.getDate() === secondDate.getDate();
    }

    function setText(element, value) {
        if (element) {
            element.textContent = value;
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCalendar);
    } else {
        initCalendar();
    }
}());
