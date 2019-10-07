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

class Menu {
    constructor() {
        let self = this;

        this.sortActivated = false;
        this.sortBtn = document.querySelector('#sortBtn');
        this.sortBtn.onclick = function() {
            document.dispatchEvent(new Event('sortBtn_activated'));
            self.sortActivated = !self.sortActivated;
            if (self.sortActivated) {
                self.sortBtn.innerText = 'Отменить сортировку';
            } else {
                self.sortBtn.innerText = 'Сортировать по цене';
            }
        };

        this.filterBtn = document.querySelector('#filterBtn');
        this.filterBtn.onclick = function (event) {
            let target = event.target;
            let filterPopup = document.querySelector('.menu__filter-popup');
            filterPopup.classList.remove('menu__filter-popup_hidden');
            if (target.classList.contains('menu__filter-item')) {
                let filterType = target.getAttribute('filter');
                document.dispatchEvent(new CustomEvent('filterBtn_activated', {
                    detail: {filterType}
                }));
                filterPopup.classList.add('menu__filter-popup_hidden');
            }
        };

        this.favoriteActivated = false;
        this.favoriteBtn = document.querySelector('#favoriteBtn');
        this.favoriteBtn.onclick = function () {
            document.dispatchEvent(new Event('favoriteBtn_activated'));
            self.favoriteActivated = !self.favoriteActivated;
            if (self.favoriteActivated) {
                self.sortBtn.classList.add('menu__item_hidden');
                self.filterBtn.classList.add('menu__item_hidden');
                self.favoriteBtn.innerText = 'Показать все';
            } else {
                self.sortBtn.classList.remove('menu__item_hidden');
                self.filterBtn.classList.remove('menu__item_hidden');
                self.favoriteBtn.innerText = 'Избранное';
            }
        }
    }
}

class Gallery {
    constructor(data) {
        let self = this;
        this.gallery = document.querySelector('.gallery');
        if (data instanceof Array && data.length > 0) {
            this.data = data;
            this.isSorted = false;
            this.isFiltered = false;
            this.favorite = new Set();
            this.isFavorite = false;
            this.renderCards(this.data);
        } else {
            this.gallery.innerText = "События не найдены";
        }

        document.addEventListener('sortBtn_activated', function () {
            let data = self.isFiltered ? self.filteredData : self.data;
            if (self.isSorted) {
                self.renderCards(data);
            } else {
                self.sortCardsByPrice(data);
            }
            self.isSorted = !self.isSorted;
            self.isFavorite = false;
        });

        document.addEventListener('filterBtn_activated', function (event) {
            let filterType = event.detail.filterType;
            if (filterType === "all") {
                let data = self.isSorted ? self.sortedData : self.data;
                self.renderCards(data);
                self.isFiltered = false;
            } else if (filterType) {
                self.filterCardsByType(filterType, self.isSorted);
                self.isFiltered = true;
            }
            self.isFavorite = false;
        });

        document.addEventListener('favoriteBtn_activated', function (event) {
            self.isSorted = false;
            self.isFiltered = false;
            if (self.isFavorite) {
                self.renderCards(self.data);
            } else {
                self.showFavorite();
            }
            self.isFavorite = !self.isFavorite;
        });

        this.gallery.onclick = function (event) {
            let target = event.target;
            if (target.classList.contains('card__top-panel')) {
                let cardBox = target.parentElement;
                let checked;
                for (let elem of cardBox.children) {
                    if (elem.classList.contains('card__star-icon')) {
                        elem.classList.toggle('card__star-icon_hidden');
                        checked = !elem.classList.contains('card__star-icon_hidden');
                        break;
                    }
                }
                target.innerText = checked ? 'Удалить из избранного' : 'Добавить в избранное';
                if (checked) {
                    self.favorite.add(parseInt(cardBox.getAttribute('rec_id')));
                } else {
                    self.favorite.delete(parseInt(cardBox.getAttribute('rec_id')));
                }
            } else {
                if (target.classList.contains('full-card')) {
                    target.remove();
                } else {
                    while (!target.classList.contains('card') || target === document.body) {
                        target = target.parentElement;
                    }
                    if (target.classList.contains('card')) {
                        self.renderFullCard(parseInt(target.getAttribute('rec_id')));
                    }
                }
            }
        }
    }

    get sortedData() {
        if (!this._sortedData) {
            this._sortedData = this.data.slice();
            Gallery.sortDataByPrice(this._sortedData);
        }
        return this._sortedData;
    }

    set sortedData(data) {
        this._sortedData = data;
    }

    renderCards(data) {
        this.gallery.innerHTML = '';
        for (let item of data) {
            this.renderCard(item);
        }
    }

    renderCard(itemData) {
        let card = document.createElement("div");
        let topPanelText;
        let starIconHiddenClass;
        card.className = "card";
        card.setAttribute('rec_id', itemData.id);
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
        this.gallery.appendChild(card);
    }

    sortCardsByPrice(data) {
        if (this.isFiltered) {
            let sortedData = data.slice();
            Gallery.sortDataByPrice(sortedData);
            this.renderCards(sortedData);
        } else {
            this.renderCards(this.sortedData);
        }
    }

    static sortDataByPrice(data) {
        data.sort((item1, item2) => {
            if (item1['price'] < item2['price'])
                return -1;
            else
                return 1
        });
    }

    filterCardsByType(type, isSorted) {
        this.filteredData = this.data.filter(
            item => item['type'] === type
        );
        if (isSorted) {
            let resultData = this.filteredData.slice();
            Gallery.sortDataByPrice(resultData);
            this.renderCards(resultData);
        } else {
            this.renderCards(this.filteredData);
        }
    }

    showFavorite() {
        let favoriteData = this.data.filter(
            item => this.favorite.has(item['id'])
        );
        this.renderCards(favoriteData);
    }

    renderFullCard(id) {
        let itemData;
        let fullCard = document.createElement("div");
        for (let item of DATA) {
            if (item['id'] === id) {
                itemData = item;
                break;
            }
        }
        fullCard.className = 'full-card';
        fullCard.innerHTML = `
            <div class="full-card__content">
                <img class="full-card__cover" src="./img/cover_of_full-card_${itemData.id}.jpg" alt="">
                <div class="full-card__side-box">
                    <div class="full-card__title">${itemData.title}</div>
                    <div class="full-card__price">${itemData.price} &#8381</div>
                    <div class="full-card__description">${itemData.description}</div>
                </div>
            </div>`;
        this.gallery.appendChild(fullCard);
    }

}

let gallery = new Gallery(DATA);
let menu = new Menu();