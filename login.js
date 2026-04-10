(function () {
    "use strict";

    try {
        var initialLang = localStorage.getItem("sp_lang") || "en";
        if (initialLang !== "en" && initialLang !== "fr" && initialLang !== "ar") {
            initialLang = "en";
        }
        document.documentElement.lang = initialLang;
        document.documentElement.dir = initialLang === "ar" ? "rtl" : "ltr";
    } catch (e) { /* ignore */ }

    var LANG_FLAGS = {
        en: { flag: "\uD83C\uDDEC\uD83C\uDDE7", code: "EN" },
        fr: { flag: "\uD83C\uDDEB\uD83C\uDDF7", code: "FR" },
        ar: { flag: "\uD83C\uDDF8\uD83C\uDDE6", code: "AR" }
    };

    var STRINGS = {
        en: {
            title: "Sign in | School Portal",
            metaDesc: "Sign in to School Portal — Management System",
            ariaWelcome: "Welcome",
            langMenu: "Language",
            brandTitle: "School Portal",
            brandSub: "Management System",
            heroTitle: "One place for your school community",
            heroLead: "Students, teachers, parents, and administrators stay connected with schedules, grades, attendance, and reports in a single secure workspace.",
            feat1: "Role-based access so everyone sees what they need—nothing more.",
            feat2: "Dashboards and reports that keep leadership and staff aligned.",
            feat3: "Built for daily use: messages, calendar, and settings at your fingertips.",
            welcome: "Welcome back",
            subtitle: "Sign in with your school account to continue.",
            emailLabel: "Email or username",
            emailPh: "you@school.edu",
            passLabel: "Password",
            passPh: "Enter your password",
            remember: "Remember me",
            forgot: "Forgot password?",
            signin: "Sign in",
            divider: "or",
            backHome: "Back to portal home",
            demoStrong: "Static demo:",
            demoRest: " submitting the form opens the portal home. Wire this form to your real authentication when you connect a backend.",
            showPass: "Show password",
            hidePass: "Hide password",
            langEn: "English",
            langFr: "Français",
            langAr: "العربية",
            weatherLocation: "N'Djamena, Chad",
            weatherLoading: "Loading weather...",
            weatherSunny: "Sunny",
            weatherRainy: "Rainy",
            weatherCloudy: "Cloudy",
            weatherUnavailable: "Weather unavailable"
        },
        fr: {
            title: "Connexion | Portail scolaire",
            metaDesc: "Connectez-vous au Portail scolaire — Système de gestion",
            ariaWelcome: "Bienvenue",
            langMenu: "Langue",
            brandTitle: "Portail scolaire",
            brandSub: "Système de gestion",
            heroTitle: "Un espace pour toute votre communauté scolaire",
            heroLead: "Élèves, enseignants, parents et administrateurs restent connectés avec emplois du temps, notes, présences et rapports dans un espace sécurisé unique.",
            feat1: "Accès par rôle : chacun voit ce dont il a besoin—rien de plus.",
            feat2: "Tableaux de bord et rapports pour aligner la direction et les équipes.",
            feat3: "Conçu pour le quotidien : messages, calendrier et paramètres à portée de main.",
            welcome: "Bon retour",
            subtitle: "Connectez-vous avec votre compte école pour continuer.",
            emailLabel: "E-mail ou identifiant",
            emailPh: "vous@ecole.fr",
            passLabel: "Mot de passe",
            passPh: "Saisissez votre mot de passe",
            remember: "Se souvenir de moi",
            forgot: "Mot de passe oublié ?",
            signin: "Se connecter",
            divider: "ou",
            backHome: "Retour à l’accueil du portail",
            demoStrong: "Démo statique :",
            demoRest: " l’envoi du formulaire ouvre l’accueil du portail. Branchez ce formulaire à votre authentification réelle lorsque vous aurez un serveur.",
            showPass: "Afficher le mot de passe",
            hidePass: "Masquer le mot de passe",
            langEn: "English",
            langFr: "Français",
            langAr: "العربية",
            weatherLocation: "N'Djamena, Tchad",
            weatherLoading: "Meteo en cours...",
            weatherSunny: "Ensoleille",
            weatherRainy: "Pluvieux",
            weatherCloudy: "Nuageux",
            weatherUnavailable: "Meteo indisponible"
        },
        ar: {
            title: "تسجيل الدخول | البوابة المدرسية",
            metaDesc: "سجّل الدخول إلى البوابة المدرسية — نظام الإدارة",
            ariaWelcome: "مرحباً",
            langMenu: "اللغة",
            brandTitle: "البوابة المدرسية",
            brandSub: "نظام الإدارة",
            heroTitle: "مكان واحد لمجتمع مدرستك",
            heroLead: "يتواصل الطلاب والمعلمون وأولياء الأمور والإداريون عبر الجداول والدرجات والحضور والتقارير في منصة آمنة واحدة.",
            feat1: "صلاحيات حسب الدور ليرى كل شخص ما يحتاجه فقط.",
            feat2: "لوحات معلومات وتقارير تنسّق الإدارة والطاقم.",
            feat3: "مصمم للاستخدام اليومي: الرسائل والتقويم والإعدادات في متناول اليد.",
            welcome: "مرحباً بعودتك",
            subtitle: "سجّل الدخول بحساب المدرسة للمتابعة.",
            emailLabel: "البريد الإلكتروني أو اسم المستخدم",
            emailPh: "you@school.edu",
            passLabel: "كلمة المرور",
            passPh: "أدخل كلمة المرور",
            remember: "تذكرني",
            forgot: "نسيت كلمة المرور؟",
            signin: "تسجيل الدخول",
            divider: "أو",
            backHome: "العودة إلى الصفحة الرئيسية للبوابة",
            demoStrong: "عرض ثابت:",
            demoRest: " إرسال النموذج يفتح الصفحة الرئيسية. اربط هذا النموذج بنظام المصادقة الفعلي عند ربط الخادم.",
            showPass: "إظهار كلمة المرور",
            hidePass: "إخفاء كلمة المرور",
            langEn: "English",
            langFr: "Français",
            langAr: "العربية",
            weatherLocation: "نجامينا، تشاد",
            weatherLoading: "جار تحميل الطقس...",
            weatherSunny: "مشمس",
            weatherRainy: "ممطر",
            weatherCloudy: "غائم",
            weatherUnavailable: "الطقس غير متاح"
        }
    };

    var weatherState = "loading";
    var weatherTemp = null;

    function getStoredLang() {
        try {
            return localStorage.getItem("sp_lang") || "en";
        } catch (e) {
            return "en";
        }
    }

    function setStoredLang(lang) {
        try {
            localStorage.setItem("sp_lang", lang);
        } catch (e) { /* ignore */ }
    }

    function t(lang, key) {
        var pack = STRINGS[lang] || STRINGS.en;
        return pack[key] !== undefined ? pack[key] : STRINGS.en[key];
    }

    function getWeatherLabel(lang, state) {
        if (state === "sunny") {
            return t(lang, "weatherSunny");
        }
        if (state === "rainy") {
            return t(lang, "weatherRainy");
        }
        if (state === "cloudy") {
            return t(lang, "weatherCloudy");
        }
        if (state === "loading") {
            return t(lang, "weatherLoading");
        }
        return t(lang, "weatherUnavailable");
    }

    function applyWeatherState(state, tempC) {
        var widget = document.getElementById("weatherWidget");
        var status = document.getElementById("weatherStatus");
        if (!widget || !status) {
            return;
        }
        var langNow = getStoredLang();
        if (!LANG_FLAGS[langNow]) {
            langNow = "en";
        }

        weatherState = state;
        weatherTemp = typeof tempC === "number" ? tempC : null;
        widget.classList.remove("weather-loading", "weather-sunny", "weather-rainy", "weather-cloudy");

        if (state === "sunny" || state === "rainy" || state === "cloudy") {
            widget.classList.add("weather-" + state);
        } else if (state === "loading") {
            widget.classList.add("weather-loading");
        }

        var label = getWeatherLabel(langNow, state);
        if (weatherTemp !== null && (state === "sunny" || state === "rainy" || state === "cloudy")) {
            label += " - " + Math.round(weatherTemp) + "°C";
        }
        status.textContent = label;
    }

    function mapWeatherCode(code) {
        if (code === 0) {
            return "sunny";
        }
        if (
            (code >= 51 && code <= 67) ||
            (code >= 80 && code <= 82) ||
            (code >= 95 && code <= 99)
        ) {
            return "rainy";
        }
        if ((code >= 1 && code <= 3) || code === 45 || code === 48) {
            return "cloudy";
        }
        return "cloudy";
    }

    function loadNjamenaWeather() {
        var endpoint = "https://api.open-meteo.com/v1/forecast?latitude=12.1348&longitude=15.0557&current=temperature_2m,weather_code&timezone=Africa%2FNdjamena";
        applyWeatherState("loading", null);
        fetch(endpoint)
            .then(function (res) {
                if (!res.ok) {
                    throw new Error("Weather request failed");
                }
                return res.json();
            })
            .then(function (data) {
                if (!data || !data.current) {
                    throw new Error("Invalid weather payload");
                }
                var code = Number(data.current.weather_code);
                var temp = Number(data.current.temperature_2m);
                applyWeatherState(mapWeatherCode(code), isNaN(temp) ? null : temp);
            })
            .catch(function () {
                applyWeatherState("unavailable", null);
            });
    }

    function applyLoginLanguage(lang) {
        var safe = LANG_FLAGS[lang] ? lang : "en";
        setStoredLang(safe);
        document.documentElement.lang = safe;
        document.documentElement.dir = safe === "ar" ? "rtl" : "ltr";

        document.title = t(safe, "title");
        var meta = document.querySelector('meta[name="description"]');
        if (meta) {
            meta.setAttribute("content", t(safe, "metaDesc"));
        }

        var hero = document.getElementById("loginHeroSection");
        if (hero) {
            hero.setAttribute("aria-label", t(safe, "ariaWelcome"));
        }

        document.querySelectorAll("[data-i18n]").forEach(function (el) {
            var key = el.getAttribute("data-i18n");
            el.textContent = t(safe, key);
        });

        var y = String(new Date().getFullYear());
        var foot = document.getElementById("footerLine");
        if (foot) {
            if (safe === "ar") {
                foot.textContent = "© " + y + " البوابة المدرسية. جميع الحقوق محفوظة.";
            } else if (safe === "fr") {
                foot.textContent = "© " + y + " Portail scolaire. Tous droits réservés.";
            } else {
                foot.textContent = "© " + y + " School Portal. All rights reserved.";
            }
        }

        document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
            var key = el.getAttribute("data-i18n-placeholder");
            el.setAttribute("placeholder", t(safe, key));
        });

        document.querySelectorAll("[data-i18n-label]").forEach(function (el) {
            var key = el.getAttribute("data-i18n-label");
            el.textContent = t(safe, key);
        });

        var weatherLocation = document.querySelector("[data-i18n='weatherLocation']");
        if (weatherLocation) {
            weatherLocation.textContent = t(safe, "weatherLocation");
        }

        var lbl = document.getElementById("langMenuLabel");
        if (lbl) {
            lbl.textContent = t(safe, "langMenu");
        }

        var fg = document.getElementById("langFlag");
        var cd = document.getElementById("langCode");
        var fc = LANG_FLAGS[safe];
        if (fg && fc) {
            fg.textContent = fc.flag;
        }
        if (cd && fc) {
            cd.textContent = fc.code;
        }

        var pwBtn = document.getElementById("togglePw");
        if (pwBtn) {
            var show = t(safe, "showPass");
            var hide = t(safe, "hidePass");
            var isText = document.getElementById("password") && document.getElementById("password").type === "text";
            pwBtn.setAttribute("aria-label", isText ? hide : show);
        }

        document.querySelectorAll(".lang-menu button[data-lang]").forEach(function (btn) {
            btn.classList.toggle("active", btn.getAttribute("data-lang") === safe);
        });

        applyWeatherState(weatherState, weatherTemp);
    }

    var current = getStoredLang();
    if (!LANG_FLAGS[current]) {
        current = "en";
    }
    applyLoginLanguage(current);
    loadNjamenaWeather();

    var langBtn = document.getElementById("langMenuBtn");
    var langList = document.getElementById("langMenuList");
    if (langBtn && langList) {
        langBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            var open = !langList.classList.contains("open");
            langList.hidden = !open;
            langList.classList.toggle("open", open);
            langBtn.setAttribute("aria-expanded", open ? "true" : "false");
        });

        document.addEventListener("click", function () {
            langList.classList.remove("open");
            langList.hidden = true;
            langBtn.setAttribute("aria-expanded", "false");
        });

        langList.addEventListener("click", function (e) {
            e.stopPropagation();
        });

        langList.querySelectorAll("button[data-lang]").forEach(function (btn) {
            btn.addEventListener("click", function () {
                var sel = btn.getAttribute("data-lang");
                applyLoginLanguage(sel);
                langList.classList.remove("open");
                langList.hidden = true;
                langBtn.setAttribute("aria-expanded", "false");
            });
        });

        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape") {
                langList.classList.remove("open");
                langList.hidden = true;
                langBtn.setAttribute("aria-expanded", "false");
            }
        });
    }

    var input = document.getElementById("password");
    var pwToggle = document.getElementById("togglePw");
    if (input && pwToggle) {
        pwToggle.addEventListener("click", function () {
            var langNow = getStoredLang();
            if (!LANG_FLAGS[langNow]) {
                langNow = "en";
            }
            var show = input.type === "password";
            input.type = show ? "text" : "password";
            pwToggle.setAttribute("aria-pressed", show ? "true" : "false");
            pwToggle.setAttribute(
                "aria-label",
                show ? t(langNow, "hidePass") : t(langNow, "showPass")
            );
            var icon = pwToggle.querySelector("i");
            if (icon) {
                icon.className = show ? "fas fa-eye-slash" : "fas fa-eye";
            }
        });
    }
})();
