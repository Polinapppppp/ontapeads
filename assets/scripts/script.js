document.addEventListener('DOMContentLoaded', function () {

    const faqSection = document.querySelector('.faq-mobile-accordion');
    if (faqSection) {
        const tabs = Array.from(faqSection.querySelectorAll('.questions_tab'));
        const contents = Array.from(faqSection.querySelectorAll('.question_content'));
        const rightContainer = faqSection.querySelector('.questions_block__right');
        const MOBILE_BREAKPOINT = 1100;

        let activeIndex = 0;
        let isMobileMode = window.innerWidth <= MOBILE_BREAKPOINT;

        function initMobileLayout() {
            if (window.innerWidth <= MOBILE_BREAKPOINT) {
                contents.forEach((content, index) => {
                    if (rightContainer && content.parentElement === rightContainer) {
                        rightContainer.removeChild(content);
                    }
                    if (tabs[index]) {
                        tabs[index].after(content);
                    }
                });
                isMobileMode = true;
            }
        }


        tabs.forEach((tab, index) => {
            tab.addEventListener('click', function (e) {
                e.preventDefault();
                const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;

                if (isMobile) {
                    const isAlreadyActive = tab.classList.contains('active');

                    if (isAlreadyActive) {
                        tab.classList.remove('active');
                        contents[index].classList.remove('active');
                        contents[index].style.maxHeight = null;
                        return;
                    }

                    tab.classList.add('active');
                    contents[index].classList.add('active');

                    contents[index].style.maxHeight =
                        contents[index].scrollHeight + 'px';

                    tabs.forEach((t, i) => {
                        if (i !== index) {
                            t.classList.remove('active');
                            contents[i].classList.remove('active');
                            contents[i].style.maxHeight = null;
                        }
                    });

                    scrollToActiveTab(tab);

                } else {
                    tabs.forEach((t, i) => {
                        if (i === index) {
                            t.classList.add('active');
                            contents[i].classList.add('active');
                        } else {
                            t.classList.remove('active');
                            contents[i].classList.remove('active');
                        }
                    });
                    activeIndex = index;
                }
            });
        });

        let resizeTimer;
        window.addEventListener('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                const mobileNow = window.innerWidth <= MOBILE_BREAKPOINT;
                if (mobileNow !== isMobileMode) {
                    if (mobileNow) {
                        contents.forEach((content, index) => {
                            if (rightContainer && content.parentElement === rightContainer) {
                                rightContainer.removeChild(content);
                            }
                            if (tabs[index]) {
                                tabs[index].after(content);
                            }
                        });
                    } else {
                        contents.forEach(content => {
                            if (rightContainer && content.parentElement !== rightContainer) {
                                rightContainer.appendChild(content);
                            }
                        });
                    }
                    isMobileMode = mobileNow;
                }
            }, 250);
        });

        initMobileLayout();
        if (tabs.length) {
            tabs[0].classList.add('active');
            contents[0].classList.add('active');

            contents[0].style.maxHeight =
                contents[0].scrollHeight + 'px';
        }
    }

    const forwardSlider = document.querySelector('.partners_slider--forward');
    const reverseSlider = document.querySelector('.partners_slider--reverse');

    if (typeof Swiper !== 'undefined') {
        if (forwardSlider) {
            new Swiper('.partners_slider--forward', {
                slidesPerView: 3,
                spaceBetween: 16,
                loop: true,
                speed: 5000,
                autoplay: {
                    delay: 0,
                    disableOnInteraction: false,
                },
                breakpoints: {
                    768: { slidesPerView: 4 },
                    1024: { slidesPerView: 4 },
                    1280: { slidesPerView: 5 }
                }
            });
            console.log('Forward slider initialized');
        } else {
            console.warn('Forward slider element not found');
        }

        if (reverseSlider) {
            new Swiper('.partners_slider--reverse', {
                slidesPerView: 3,
                spaceBetween: 16,
                loop: true,
                speed: 5000,
                autoplay: {
                    delay: 0,
                    disableOnInteraction: false,
                    reverseDirection: true,
                },
                breakpoints: {
                    768: { slidesPerView: 4 },
                    1024: { slidesPerView: 4 },
                    1280: { slidesPerView: 5 }
                }
            });
            console.log('Reverse slider initialized');
        } else {
            console.warn('Reverse slider element not found');
        }
    } else {
        console.error('Swiper library not loaded!');
    }

    const modal = document.getElementById('popupModal');
    const closeBtn = document.getElementById('closePopupBtn');
    const openButtons = document.querySelectorAll('.js-open-modal');

    if (modal) {
        function openModal(e) {
            if (e) e.preventDefault();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }

        openButtons.forEach(btn => {
            btn.addEventListener('click', openModal);
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    const modalKit = document.getElementById('popupModalKit');
    const closeBtnKit = document.getElementById('closePopupBtnKit');
    const openButtonsKit = document.querySelectorAll('.js-open-modal2');

    if (modalKit) {
        function openModal(e) {
            if (e) e.preventDefault();
            modalKit.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            modalKit.classList.remove('active');
            document.body.style.overflow = '';
        }

        if (openButtonsKit.length > 0) {
            openButtonsKit.forEach(btn => {
                btn.addEventListener('click', openModal);
            });
        }

        if (closeBtnKit) {
            closeBtnKit.addEventListener('click', closeModal);
        }

        modalKit.addEventListener('click', (e) => {
            if (e.target === modalKit) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalKit.classList.contains('active')) {
                closeModal();
            }
        });
    }

    const vacancyModal = document.getElementById('vacancyModal');
    const vacancyCloseBtn = document.getElementById('closeVacancyBtn');
    const vacancyButtons = document.querySelectorAll('.js-open-modalVacancy');

    if (vacancyModal) {
        function openVacancyModal(e) {
            if (e) e.preventDefault();
            vacancyModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeVacancyModal() {
            vacancyModal.classList.remove('active');
            document.body.style.overflow = '';
        }

        vacancyButtons.forEach(btn => {
            btn.addEventListener('click', openVacancyModal);
        });

        if (vacancyCloseBtn) {
            vacancyCloseBtn.addEventListener('click', closeVacancyModal);
        }

        vacancyModal.addEventListener('click', (e) => {
            if (e.target === vacancyModal) closeVacancyModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && vacancyModal.classList.contains('active')) {
                closeVacancyModal();
            }
        });
    }

    const cookieModal = document.getElementById('cookieModal');
    if (cookieModal) {
        const cookieClose = cookieModal.querySelector('.cookie-modal__close');
        const cookieAcceptBtn = cookieModal.querySelector('.js-cookie-accept');
        const isCookieAccepted = localStorage.getItem('cookieAccepted');

        if (!isCookieAccepted) {
            setTimeout(() => {
                cookieModal.classList.add('active');
            }, 1000);
        }

        function acceptCookies() {
            cookieModal.classList.remove('active');
            localStorage.setItem('cookieAccepted', 'true');
        }

        const cookieLinks = document.querySelectorAll('.js-cookie-popup');
        if (cookieLinks.length > 0) {
            cookieLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    cookieModal.classList.add('active');
                });
            });
        }

        if (cookieAcceptBtn) cookieAcceptBtn.addEventListener('click', acceptCookies);
        if (cookieClose) cookieClose.addEventListener('click', acceptCookies);
    }

    const burgerBtn = document.getElementById('burgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const headerInner = document.querySelector('.header__inner');

    if (burgerBtn && mobileMenu) {
        burgerBtn.addEventListener('click', () => {
            burgerBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');

            const isOpen = mobileMenu.classList.contains('active');
            if (headerInner) headerInner.style.background = '#FFFFFF99';
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        const mobileLinks = mobileMenu.querySelectorAll('.nav__link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                burgerBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                if (headerInner) headerInner.style.background = '#FFFFFF99';
                document.body.style.overflow = '';
            });
        });

        document.addEventListener('click', (e) => {
            if (!burgerBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                burgerBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                if (headerInner) headerInner.style.background = '#FFFFFF99';
                document.body.style.overflow = '';
            }
        });
    }

    const casesBtn = document.querySelector('.text_block__v3__btn');
    if (casesBtn) {
        const desktopText = 'Посмотреть все кейсы';
        const mobileText = 'Все кейсы';
        const MOBILE_BREAKPOINT = 768;

        function updateCasesBtnText() {
            if (window.innerWidth <= MOBILE_BREAKPOINT) {
                casesBtn.textContent = mobileText;
            } else {
                casesBtn.textContent = desktopText;
            }
        }

        window.addEventListener('resize', updateCasesBtnText);
        updateCasesBtnText();
    }

    const bannerSpan = document.querySelector('.banner-span[data-texts]');
    if (bannerSpan) {
        const texts = bannerSpan.dataset.texts.split('|');
        let currentIndex = 0;
        let intervalId = null;

        const textWrapper = document.createElement('span');
        textWrapper.className = 'banner-text-wrapper';
        textWrapper.style.display = 'inline-block';
        textWrapper.style.position = 'relative';
        textWrapper.style.height = '110%';
        textWrapper.style.verticalAlign = 'bottom';
        textWrapper.style.overflow = 'hidden';

        const innerSpan = document.createElement('span');
        innerSpan.className = 'banner-text-inner';
        innerSpan.style.display = 'block';
        innerSpan.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        innerSpan.textContent = texts[0];

        textWrapper.appendChild(innerSpan);
        bannerSpan.innerHTML = '';
        bannerSpan.appendChild(textWrapper);

        function changeText() {
            innerSpan.style.opacity = '0';
            innerSpan.style.transform = 'translateY(10px)';

            setTimeout(() => {
                currentIndex = (currentIndex + 1) % texts.length;
                innerSpan.textContent = texts[currentIndex];

                requestAnimationFrame(() => {
                    innerSpan.style.opacity = '1';
                    innerSpan.style.transform = 'translateY(0)';
                });
            }, 400);
        }

        function startRotator() {
            if (intervalId) clearInterval(intervalId);
            intervalId = setInterval(changeText, 2500);
        }

        function stopRotator() {
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
        }

        window.addEventListener('resize', () => {
            stopRotator();
            startRotator();
        });

        startRotator();
    }

       const servicesSection = document.querySelector('.text_block__v2');
    if (servicesSection) {
        const filterTabs = servicesSection.querySelectorAll('.filter_tab');
        const cardsContainers = servicesSection.querySelectorAll('.text_block__v2__cards');
        const filterBg = servicesSection.querySelector('.filter_tab-bg');

        const mobileFilterActive = document.getElementById('mobileFilterActive');
        const mobileFilterToggle = document.getElementById('mobileFilterToggle');
        const filterSheet = document.getElementById('filterSheet');
        const filterSheetOverlay = document.getElementById('filterSheetOverlay');
        const filterSheetClose = document.getElementById('filterSheetClose');
        const mobileFilterOptions = document.querySelectorAll('input[name="mobile-filter"]');

        const filterNames = {
            'all': 'Все услуги',
            'promotion': 'Продвижение',
            'strategies': 'Стратегии',
            'outstaff': 'Аутстафф'
        };

        // === FLIP-анимация подложки ===
        function moveBgToTab(tab, animate = true) {
            if (!filterBg || !tab) return;

            const containerRect = tab.parentElement.getBoundingClientRect();
            const tabRect = tab.getBoundingClientRect();

            const targetX = tabRect.left - containerRect.left;
            const targetW = tabRect.width;

            if (!animate) {
                // Без анимации — мгновенное позиционирование
                filterBg.style.transition = 'none';
                filterBg.style.transform = `translateX(${targetX}px)`;
                filterBg.style.width = `${targetW}px`;
                // Форсируем reflow
                filterBg.offsetHeight;
                filterBg.style.transition = '';
            } else {
                filterBg.style.transform = `translateX(${targetX}px)`;
                filterBg.style.width = `${targetW}px`;
            }
        }

        // === Инициализация: ждём готовности шрифтов и layout ===
        function initFilterBg() {
            const activeTab = servicesSection.querySelector('.filter_tab.active');
            if (!activeTab || !filterBg) return;

            // Сначала позиционируем без анимации и без видимости
            moveBgToTab(activeTab, false);

            // Два RAF чтобы гарантировать, что браузер успел всё отрисовать
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    filterBg.classList.add('is-ready');
                });
            });
        }

        // Запускаем инициализацию
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(initFilterBg);
        } else {
            // Fallback для старых браузеров
            window.addEventListener('load', initFilterBg);
            // + запасной вариант через таймаут
            setTimeout(initFilterBg, 100);
        }

        // Обновление при ресайзе — тоже без анимации, чтобы не было «плавания»
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                const activeTab = servicesSection.querySelector('.filter_tab.active');
                if (activeTab) moveBgToTab(activeTab, false);
            }, 150);
        });

        filterTabs.forEach((tab) => {
            tab.addEventListener('click', function (e) {
                e.preventDefault();
                const filterValue = this.dataset.filter;
                switchFilter(filterValue);
            });
        });

        function openFilterSheet() {
            if (!filterSheet) return;
            filterSheet.classList.add('open');
            document.body.style.overflow = 'hidden';
        }

        function closeFilterSheet() {
            if (!filterSheet) return;
            filterSheet.classList.remove('open');
            document.body.style.overflow = '';
        }

        if (mobileFilterToggle) {
            mobileFilterToggle.addEventListener('click', function (e) {
                e.preventDefault();
                openFilterSheet();
            });
        }

        if (mobileFilterActive) {
            mobileFilterActive.addEventListener('click', function (e) {
                e.preventDefault();
                openFilterSheet();
            });
        }

        if (filterSheetOverlay) {
            filterSheetOverlay.addEventListener('click', closeFilterSheet);
        }

        if (filterSheetClose) {
            filterSheetClose.addEventListener('click', closeFilterSheet);
        }

        mobileFilterOptions.forEach(option => {
            option.addEventListener('change', function () {
                const filterValue = this.value;
                switchFilter(filterValue);
                setTimeout(closeFilterSheet, 150);
            });
        });

        function switchFilter(filterValue) {
            filterTabs.forEach(t => {
                t.classList.remove('active');
                if (t.dataset.filter === filterValue) {
                    t.classList.add('active');
                    moveBgToTab(t, true); // ← с анимацией
                }
            });

            if (mobileFilterActive && filterNames[filterValue]) {
                mobileFilterActive.textContent = filterNames[filterValue];
            }

            mobileFilterOptions.forEach(opt => {
                opt.checked = (opt.value === filterValue);
            });

            if (filterValue === 'all') {
                cardsContainers.forEach((container, index) => {
                    if (index === 0) {
                        container.classList.add('active');
                    } else {
                        container.classList.remove('active');
                    }
                });
            } else {
                cardsContainers.forEach(container => container.classList.remove('active'));
                const targetContainer = document.getElementById(filterValue);
                if (targetContainer) {
                    targetContainer.classList.add('active');
                }
            }
        }

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && filterSheet && filterSheet.classList.contains('open')) {
                closeFilterSheet();
            }
        });
    }

    let principeSwiper = null;

    function initSliders() {
        const principeSlider = document.querySelector('.principles-slider');

        if (principeSlider) {
            if (window.innerWidth <= 768 && !principeSwiper) {
                principeSwiper = new Swiper(principeSlider, {
                    slidesPerView: 1.2,
                    spaceBetween: 16,
                    loop: true,
                });
            } else if (window.innerWidth > 768 && principeSwiper) {
                principeSwiper.destroy(true, true);
                principeSwiper = null;
            }
        }

    }

    initSliders();

    window.addEventListener('resize', initSliders);

    let etapSwiper = null;

    function initetapSliders() {
        const etapSlider = document.querySelector('.etap-slider');

        if (etapSlider) {
            if (window.innerWidth <= 768 && !etapSwiper) {
                etapSwiper = new Swiper(etapSlider, {
                    slidesPerView: 1.2,
                    spaceBetween: 16,
                    loop: true,
                });
            } else if (window.innerWidth > 768 && etapSwiper) {
                etapSwiper.destroy(true, true);
                etapSwiper = null;
            }
        }

    }

    initetapSliders();

    window.addEventListener('resize', initetapSliders);

    let advSwiper = null;

    function initadvSliders() {
        const advSlider = document.querySelector('.adventages-slider');

        if (advSlider) {
            if (window.innerWidth <= 768 && !advSwiper) {
                advSwiper = new Swiper(advSlider, {
                    slidesPerView: 1.3,
                    spaceBetween: 16,
                    loop: true,
                });
            } else if (window.innerWidth > 768 && advSwiper) {
                advSwiper.destroy(true, true);
                advSwiper = null;
            }
        }

    }

    initadvSliders();

    window.addEventListener('resize', initadvSliders);
});