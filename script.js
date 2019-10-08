const DATA = [
    {
        id: 1,
        title: "Выступление DJ Flexbox",
        description: "Новая программа от легенды танцевальной музыки и верстки сайтов в рамках мирового тура",
        price: 1300,
        type: "concert"
    },
    {
        id: 2,
        title: "Фестиваль красок",
        description: "Самый яркий, зажигательный и красочный праздник Петербурга этой осенью",
        price: 750,
        type: "festival"
    },
    {
        id: 3,
        title: "Стендап-шоу \"Открытый микрофон\"",
        description: "Море смеха и веселья, отличный свет и звук - все это в ДК Ленсовета 22.12.19. Скучно не будет!",
        price: 800,
        type: "concert"
    },
    {
        id: 4,
        title: "Классика рока в Ледовом",
        description: "Классические рок-баллады в исполнении легенд зарубежной рок-музыки в Ледовом дворце! ",
        price: 1100,
        type: "concert"
    },
    {
        id: 5,
        title: "Выставка современной фотографии",
        description: "Этой осенью откройте для себя удивительный мир черно-белой фотографии!",
        price: 900,
        type: "exhibition"
    },
    {
        id: 6,
        title: "Кубок по моторалли",
        description: "Финалисты кубка России по моторалли встретятся в Зеленогорске, чтобы поботься за первое место.",
        price: 1600,
        type: "sport"
    },
    {
        id: 7,
        title: "Выступление DJ Sass и DJ Less",
        description: "Новая программа от восходящих звезд электронной музыки в рамках их первого мирового тура",
        price: 1500,
        type: "concert"
    },
    {
        id: 8,
        title: "Drift racing",
        description: "Незабываемое автошоу с участием признанных звезд дрифта и молодых гонщиков",
        price: 2000,
        type: "sport"
    },
    {
        id: 9,
        title: "Рок-фестиваль",
        description: "Все звезды рока с их лучшими хитами и новыми творениями на одной сцене",
        price: 3000,
        type: "concert"
    },
];

// Класс, определяющий поведение меню в хэдере.
class Menu {
    constructor() {
        let self = this;

        this.sortActivated = false;
        this.sortBtn = document.querySelector('#sortBtn');

        // При клике по кнопке сортировки:..
        this.sortBtn.onclick = function() {

            // объявляем событие, на которое есть подписка в галерее,..
            document.dispatchEvent(new Event('sortBtn_activated'));

            // меняем внешний вид кнопки.
            self.sortActivated = !self.sortActivated;
            if (self.sortActivated) {
                self.sortBtn.innerText = 'Отменить сортировку';
            } else {
                self.sortBtn.innerText = 'Сортировать по цене';
            }
        };

        this.filterBtn = document.querySelector('#filterBtn');
        this.filterPopup = document.querySelector('.menu__filter-popup');

        // При наведении курсора на кнопку фильтрации:..
        this.filterBtn.onmouseenter = function () {

            // показываем всплывающее подменю.
            self.showFilterPopup();
        };

        // При клике по кнопке фильтрации (включая подменю):..
        this.filterBtn.onclick = function (event) {
            let target = event.target;

            // обрабатываем только клики по подменю,..
            if (target.classList.contains('menu__filter-item')) {
                let filterType = target.getAttribute('filter');
                let previousSelect = document.querySelector('.menu__filter-item_selected');

                // отправляем событие, содержащее тип мероприятий, для галереи,..
                document.dispatchEvent(new CustomEvent('filterBtn_activated', {
                    detail: {filterType}
                }));

                // меняем внешний вид выбранного пункта и предыдущего выбранного,..
                target.classList.add('menu__filter-item_selected');
                previousSelect.classList.remove('menu__filter-item_selected');

                // скрываем подменю.
                self.hideFilterPopup();
            }
        };

        // При уходе курсора с кнопки фильтрации:..
        this.filterBtn.onmouseleave = function () {

            // скрываем подменю.
            self.hideFilterPopup();
        };

        this.favoriteActivated = false;
        this.favoriteBtn = document.querySelector('#favoriteBtn');

        // При клике по кнопке Избранное:..
        this.favoriteBtn.onclick = function () {

            // отправляем событие для галереи,..
            document.dispatchEvent(new Event('favoriteBtn_activated'));
            self.favoriteActivated = !self.favoriteActivated;

            // если избранное активно, скрываем другие кнопки
            // и меняем внешний вид кнопки Избранное,..
            if (self.favoriteActivated) {
                self.sortBtn.classList.add('menu__item_hidden');
                self.filterBtn.classList.add('menu__item_hidden');
                self.favoriteBtn.innerText = 'Показать все';

            // иначе: сбрасываем сортировку (если она была),
            // показываем скрытые кнопки меню, и меняем обратно
            // внешний вид кнопки Избранное.
            } else {
                let previousSelect = document.querySelector('.menu__filter-item_selected');
                let allEventsItem = document.querySelector('.menu__filter-item:first-of-type');
                previousSelect.classList.remove('menu__filter-item_selected');
                allEventsItem.classList.add('menu__filter-item_selected');
                self.sortActivated = false;
                self.sortBtn.innerText = 'Сортировать по цене';
                self.sortBtn.classList.remove('menu__item_hidden');
                self.filterBtn.classList.remove('menu__item_hidden');
                self.favoriteBtn.innerText = 'Избранное';
            }
        }
    }

    // Скрывает всплывающее подменю кнопки фильтрации.
    hideFilterPopup() {
        this.filterPopup.classList.add('menu__filter-popup_hidden');
    }

    // Показывает всплывающее подменю кнопки фильтрации.
    showFilterPopup() {
        this.filterPopup.classList.remove('menu__filter-popup_hidden');
    }
}

// Класс, определяющий поведение галереи.
class Gallery {
    constructor(data) {
        let self = this;
        this.gallery = document.querySelector('.gallery');

        // Проверим тип полученных данных,..
        if (data instanceof Array && data.length > 0) {

            // зададим начальные значения свойств,..
            this.data = data;
            this.isSorted = false;
            this.isFiltered = false;
            this.favorite = new Set();
            this.isFavorite = false;

            // и отрисуем все карточки.
            this.renderCards(this.data);
        } else {
            this.gallery.innerText = "События не найдены";
        }

        // Подписка на нажатие кнопки сортировки в меню:..
        document.addEventListener('sortBtn_activated', function () {

            // проверяем, применен ли фильтр. Если да, работаем только
            // с отфильтрованными данными, иначе - со всеми,..
            let data = self.isFiltered ? self.filteredData : self.data;

            // если отключаем сортировку:..
            if (self.isSorted) {

                // отрисуем карточки в исходном порядке,..
                self.renderCards(data);
            } else {

                // иначе отрисуем карточки в порядке возрастания цен,..
                self.sortCardsByPrice(data);
            }

            // установим соответствующие флаги.
            self.isSorted = !self.isSorted;
            self.isFavorite = false;
        });

        // Подписка на нажатие кнопки фильтрации в меню:..
        document.addEventListener('filterBtn_activated', function (event) {
            let filterType = event.detail.filterType;

            // если выбран пункт "Все":..
            if (filterType === "all") {

                // проверим, применена ли сортировка, и возьмем соответствующие данные,..
                let data = self.isSorted ? self.sortedData : self.data;

                // отрисуем карточки, установим флаг,..
                self.renderCards(data);
                self.isFiltered = false;

            // если выбран пункт с конкретным типом:..
            } else if (filterType) {

                // отфильтруем карточки по типу, установим флаги.
                self.filterCardsByType(filterType, self.isSorted);
                self.isFiltered = true;
            }
            self.isFavorite = false;
        });

        // Подписка на нажатие кнопки Избранное в меню:..
        document.addEventListener('favoriteBtn_activated', function (event) {

            // сортировку и фильтрацию отменяем,..
            self.isSorted = false;
            self.isFiltered = false;

            // если закрываем Избранное, отрисуем все карточки,..
            if (self.isFavorite) {
                self.renderCards(self.data);

            // иначе отрисуем только избранное,..
            } else {
                self.showFavorite();
            }

            // установим флаг.
            self.isFavorite = !self.isFavorite;
        });

        // Подписка на клик по галерее:..
        this.gallery.onclick = function (event) {
            let target = event.target;

            // Определяем, где был клик:
            // если по верхней панели карточки,..
            if (target.classList.contains('card__top-panel')) {
                let cardBox = target.parentElement;
                let checked;

                // меняем отображение звездочки,..
                for (let elem of cardBox.children) {
                    if (elem.classList.contains('card__star-icon')) {
                        elem.classList.toggle('card__star-icon_hidden');
                        checked = !elem.classList.contains('card__star-icon_hidden');
                        break;
                    }
                }

                // меняем внешний вид панели,..
                target.innerText = checked ? 'Удалить из избранного' : 'Добавить в избранное';

                // и либо добавляем,..
                if (checked) {
                    self.favorite.add(parseInt(cardBox.getAttribute('rec_id')));

                // либо удаляем из избранного ID записи о мероприятии;
                } else {
                    self.favorite.delete(parseInt(cardBox.getAttribute('rec_id')));
                }
            } else {

                // если клик был по заглушке вокруг большой карточки:..
                if (target.classList.contains('full-card')) {

                    // скрываем большую карточку;
                    target.remove();
                } else {

                    // проверим, был ли клик по карточке (по остальному полю карточки, кроме вехней панели),..
                    while (!target.classList.contains('card') || target === document.body) {
                        target = target.parentElement;
                    }

                    // если клик был по карточке,..
                    if (target.classList.contains('card')) {

                        // отрисуем большую карточку.
                        self.renderFullCard(parseInt(target.getAttribute('rec_id')));
                    }
                }
            }
        }
    }

    get sortedData() {

        // при первом обращении сгенерируем отсортированные данные.
        if (!this._sortedData) {
            this._sortedData = this.data.slice();
            Gallery.sortDataByPrice(this._sortedData);
        }
        return this._sortedData;
    }

    set sortedData(data) {
        this._sortedData = data;
    }

    // Отрисует карточки мероприятий по переданным данным.
    renderCards(data) {
        this.gallery.innerHTML = '';
        for (let item of data) {
            this.renderCard(item);
        }
    }

    // Отрисует карточку конкретного мероприятия по переданным данным.
    renderCard(itemData) {

        // Создаем новый div,..
        let card = document.createElement("div");
        let topPanelText;
        let starIconHiddenClass;

        // устанавливаем атрибуты,..
        card.className = "card";
        card.setAttribute('rec_id', itemData.id);

        // устанавливаем верстку,..
        topPanelText = this.favorite.has(itemData.id) ? 'Удалить из избранного' : 'Добавить в избранное';
        starIconHiddenClass = this.favorite.has(itemData.id) ? '' : ' card__star-icon_hidden';
        card.innerHTML = `
            <img class="card__cover" src="./img/cover_of_card_${itemData.id}.gif">
            <div class="card__top-panel">${topPanelText}</div>
            <img class="card__star-icon${starIconHiddenClass}" src="./img/star-icon.png">
            <div class="card__info">
                <div class="card__title">
                    <p>${itemData.title}</p>
                </div>
                <div class="card__price">
                    <p>${itemData.price} &#8381</p>
                </div>
                <div class="card__description">
                    <p>${itemData.description}</p>
                </div>
            </div>`;

        // добавляем в галерею.
        this.gallery.appendChild(card);
    }

    // Отсортирует данные и отрисует карточки.
    sortCardsByPrice(data) {

        // Если включена фильтрация,..
        if (this.isFiltered) {

            // отсортируем и отрисуем переданные данные,..
            let sortedData = data.slice();
            Gallery.sortDataByPrice(sortedData);
            this.renderCards(sortedData);

        // иначе - все данные.
        } else {
            this.renderCards(this.sortedData);
        }
    }

    // Метод для сортировки записей.
    static sortDataByPrice(data) {
        data.sort((item1, item2) => {
            if (item1['price'] < item2['price'])
                return -1;
            else
                return 1
        });
    }

    // Отрисует карточки, отфильтрованные по типу.
    // В зависимости от isSorted - отсортированные либо нет.
    filterCardsByType(type, isSorted) {

        // Получим отфильтованные данные,..
        this.filteredData = this.data.filter(
            item => item['type'] === type
        );

        // при необходимости отсортируем по цене,..
        if (isSorted) {
            let resultData = this.filteredData.slice();
            Gallery.sortDataByPrice(resultData);
            this.renderCards(resultData);

        // иначе отрисуем без сортировки.
        } else {
            this.renderCards(this.filteredData);
        }
    }

    // Покажет карточки, добавленные в избранное.
    showFavorite() {

        // Получим отфильтрованные данные,..
        let favoriteData = this.data.filter(
            item => this.favorite.has(item['id'])
        );

        // отрисуем карточки.
        this.renderCards(favoriteData);
    }

    // Отрисует большую карточку мероприятия.
    renderFullCard(id) {
        let itemData;

        // Создадим новый div,..
        let fullCard = document.createElement("div");

        // получим данные записи о мероприятии,..
        for (let item of DATA) {
            if (item['id'] === id) {
                itemData = item;
                break;
            }
        }

        // установим атрибуты и верстку,..
        fullCard.className = 'full-card';
        fullCard.innerHTML = `
            <div class="full-card__content">
                <img class="full-card__cover" src="./img/cover_of_full-card_${itemData.id}.gif" alt="">
                <div class="full-card__side-box">
                    <div class="full-card__title">${itemData.title}</div>
                    <div class="full-card__price">${itemData.price} &#8381</div>
                    <div class="full-card__description">${itemData.description}</div>
                </div>
            </div>`;

        // добавим в галерею.
        this.gallery.appendChild(fullCard);
    }
}

// Создадим экземпляры классов.
let gallery = new Gallery(DATA);
let menu = new Menu();