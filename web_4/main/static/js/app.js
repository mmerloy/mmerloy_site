const select = document.querySelector('select');
const allLang = ['en', 'ru'];

const langArr = {
    "about-me" :  {
        "ru": "Сайт разработан в учебных целях Мариной Алиной, студенткой 3 курса специальности <Программная инженерия>",
        "en": "The site was developed for educational purposes by Marina Alina, a 3rd year student of the specialty Software engineering",
    },
    "contacts": {
        "ru": "Вы можете связаться со мной следующим образом <br> Телефон: +7(977)396-03-51 <br> Почта: a.mmerloy@gmail.com <br> Адрес: г.Зеленоград ул.Юности д.9 <br>",
        "en": "You can contact me as follows <br>Phone: +7(977)396-03-51 <br> Email: a.mmerloy@gmail.com <br> Address: Zelenograd, Yunosti street, 9 ",
    },
}

select.addEventListener('change', changeURLLanguage);

// перенаправить на url с указанием языка
function changeURLLanguage() {
    let lang = select.value;
    location.href = window.location.pathname + '#' + lang;
    location.reload();
}

function changeLanguage() {
    let hash = window.location.hash;
    hash = hash.substring(1);
    console.log(hash);
    console.log(langArr);
    if (!allLang.includes(hash)) {
        location.href = window.location.pathname + '#en';
        location.reload();
    }
    select.value = hash;
    for (let key in langArr) {
        let elem = document.querySelector('.lng-' + key);
        if (elem) {
            elem.innerHTML = langArr[key][hash];
        }

    }
}

changeLanguage();

