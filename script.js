const DATA = [
    {
        id: 1,
        title: "Выступление DJ Flexbox",
        description: "Новая программа от легенды танцевальной музыки и верстки сайтов в рамках мирового тура",
        price: 300,
        type: "concert"
    },
    {
        id: 2,
        title: "Выступление DJ Flexbox",
        description: "Новая программа от легенды танцевальной музыки и верстки сайтов в рамках мирового тура",
        price: 300,
        type: "concert"
    },
    {
        id: 3,
        title: "Выступление DJ Flexbox",
        description: "Новая программа от легенды танцевальной музыки и верстки сайтов в рамках мирового тура",
        price: 300,
        type: "concert"
    },
    {
        id: 4,
        title: "Выступление DJ Flexbox",
        description: "Новая программа от легенды танцевальной музыки и верстки сайтов в рамках мирового тура",
        price: 300,
        type: "concert"
    },
    {
        id: 5,
        title: "Выступление DJ Flexbox",
        description: "Новая программа от легенды танцевальной музыки и верстки сайтов в рамках мирового тура",
        price: 300,
        type: "concert"
    },
    {
        id: 6,
        title: "Выступление DJ Flexbox",
        description: "Новая программа от легенды танцевальной музыки и верстки сайтов в рамках мирового тура",
        price: 300,
        type: "concert"
    },
    {
        id: 7,
        title: "Выступление DJ Flexbox",
        description: "Новая программа от легенды танцевальной музыки и верстки сайтов в рамках мирового тура",
        price: 300,
        type: "concert"
    },
    {
        id: 8,
        title: "Выступление DJ Flexbox",
        description: "Новая программа от легенды танцевальной музыки и верстки сайтов в рамках мирового тура",
        price: 300,
        type: "concert"
    },
    {
        id: 9,
        title: "Выступление DJ Flexbox",
        description: "Новая программа от легенды танцевальной музыки и верстки сайтов в рамках мирового тура",
        price: 300,
        type: "concert"
    },
];

class Gallery {
    constructor(data) {
        if (data instanceof Array && data.length > 0) {
            this.data = data;
        } else {
            this.data = [];
        }
        for (let item of this.data) {
            Gallery.renderCard(item);
        }
    }

    static renderCard(itemData) {
        let gallery = document.querySelector('.gallery');
        let card = document.createElement("div");
        card.className = "card";
        card.setAttribute('event_type', itemData.type);
        card.innerHTML = `
            <img class="card__cover" src="./img/cover_of_card_${itemData.id}.jpg">
            <div class="card__info">
                <div class="card__title">
                    <p>${itemData.title}</p>
                </div>
                <div class="card__description">
                    <p>${itemData.description}</p>
                </div>
            </div>`;
        gallery.appendChild(card);
    }

}

let gallery = new Gallery(DATA);