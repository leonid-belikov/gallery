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
        description: "Новая программа от легенды танцевальной музыки и верстки сайтов в рамках мирового тура",
        price: 750,
        type: "festival"
    },
    {
        id: 3,
        title: "Стендап-шоу \"Открытый микрофон\"",
        description: "Новая программа от легенды танцевальной музыки и верстки сайтов в рамках мирового тура",
        price: 800,
        type: "concert"
    },
    {
        id: 4,
        title: "Классика рока в Ледовом",
        description: "Новая программа от легенды танцевальной музыки и верстки сайтов в рамках мирового тура",
        price: 1100,
        type: "concert"
    },
    {
        id: 5,
        title: "Выставка современной фотографии",
        description: "Новая программа от легенды танцевальной музыки и верстки сайтов в рамках мирового тура",
        price: 900,
        type: "exhibition"
    },
    {
        id: 6,
        title: "Кубок по моторалли",
        description: "Новая программа от легенды танцевальной музыки и верстки сайтов в рамках мирового тура",
        price: 1600,
        type: "sport"
    },
    {
        id: 7,
        title: "Выступление DJ Sass и DJ Less",
        description: "Новая программа от легенды танцевальной музыки и верстки сайтов в рамках мирового тура",
        price: 1500,
        type: "concert"
    },
    {
        id: 8,
        title: "Drift racing",
        description: "Новая программа от легенды танцевальной музыки и верстки сайтов в рамках мирового тура",
        price: 2000,
        type: "sport"
    },
    {
        id: 9,
        title: "Рок-фестиваль",
        description: "Новая программа от легенды танцевальной музыки и верстки сайтов в рамках мирового тура",
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
                self.sortBtn.innerText = 'Оменить сортировку';
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
        });
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
        card.className = "card";
        card.setAttribute('event_type', itemData.type);
        card.innerHTML = `
            <img class="card__cover" src="./img/cover_of_card_${itemData.id}.gif">
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
        this.filteredData = this.data.filter(function (item) {
            return item['type'] === type;
        });
        if (isSorted) {
            let resultData = this.filteredData.slice();
            Gallery.sortDataByPrice(resultData);
            this.renderCards(resultData);
        } else {
            this.renderCards(this.filteredData);
        }
    }

}

let gallery = new Gallery(DATA);
let menu = new Menu();