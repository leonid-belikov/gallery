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
            this.renderCards();
        } else {
            this.gallery.innerText = "События не найдены";
        }

        document.addEventListener('sortBtn_activated', function () {
            if (self.isSorted) {
                self.gallery.innerHTML = '';
                self.renderCards();
            } else {
                self.sortCardsByPrice();
            }
            self.isSorted = !self.isSorted;
        });
    }

    renderCards() {
        for (let item of this.data) {
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

    sortCardsByPrice() {
        if (this.sortedData === undefined) {
            this.sortedData = this.data.slice();
            this.sortedData.sort((item1, item2) => {
                if (item1['price'] < item2['price'])
                    return -1;
                else
                    return 1
            });
        }
        this.gallery.innerHTML = '';
        for (let item of this.sortedData) {
            this.renderCard(item);
        }
    }

}

let gallery = new Gallery(DATA);
let menu = new Menu();