# Для чего этот проект?

Для хранения и редактирования списков игр, сериалов, фильмов, аниме, книг, а также списка комплектующих ПК. Сегодня существует множество сайтов, предлагающих такой функционал, но все они сконцентрированы на чём-то одном. Кроме того, не все из них предоставляют нужный мне функционал, а некоторые меня не устраивают по части дизайна. Я хочу объединить это всё вместе и сделать <i>хорошо</i>.

# Кто будет этим пользоваться?

Для начала, только я, но не исключена возможность добавления системы пользователей в будущем.

# На чём будет базироваться проект?

Front-end часть будет выполнена на Vue.js. Хранение и редактирование базы данных будет реализовано с помощью JSON-файла, синхронизируемого в Google Cloud. У проекта не будет никакой "изначальной" базы данных, откуда пользователь сможет добавлять в свой профайл объекты. Всё будет осуществляться вручную.
 
# Источники вдохновения 

Источником вдохновения для дизайна будет служить [GOG Galaxy 2.0](https://www.gog.com/galaxy).

Источниками для реализации функционала будут служить следующие ресурсы:

### Игры:
- [myvideogamelist.com](https://myvideogamelist.com/)
- [ag.ru](https://ag.ru/)
- [kanobu.ru](https://kanobu.ru/)
- [metacritic.com](https://metacritic.com/)

### Сериалы:
- [myshows.me](https://myshows.me/)
- [kinopoisk.ru](https://kinopoisk.ru/)
- [imdb.com](https://imdb.com/)

### Аниме:
- [shikimori.org](https://shikimori.org/)

### Фильмы:
- [letterboxd.com](https://letterboxd.com/)
- [kinopoisk.ru](https://kinopoisk.ru/)
- [imdb.com](https://imdb.com/)

### Книги:
- [readly.ru](http://readly.ru/)

## Общее

* Создание дизайна
* Написание SPA приложения на базе vue.js
* Синхронизация БД с Google Cloud
* Покупка подходящего доменного имени
* Развёртка проекта на хостинге

## Игры:

* Добавление новой игры в БД
* Редактирование добавленной игры в БД
* Удаление добавленной игры из БД
* Маркировка избранных игр
* Сортировка игр по персональному рейтингу
* Сортировка игр по затраченным часам
* Сортировка "списка желаемого" по приоритету

Предварительный вариант объекта класса "Игры":

```
{
  title: String,       // Название игры
  status: String,      // Играю/Пройдено/Брошено/Отложено/Буду играть
  ownership: String,   // Куплено/Спирачено
  hours: Number,       // Количество затраченных часов,
  rating: Boolean,     // 1-10, персональный рейтинг
  favourite: Boolean   // Является ли игра избранной
  link: String | null  // Ссылка на игру на любом желаемом ресурсе
}
```

## Сериалы:

* Добавление нового сериала в БД
* Редактирование добавленного сериала в БД
* Удаление добавленного сериала из БД
* Маркировка избранных сериалов
* Отображение прогресса по сезонам
* Сортировка сериалов по персональному рейтингу

Предварительный вариант объекта класса "Сериал":

```
{
  title: String,          // Название сериала
  status: String,         // Смотрю/Просмотрено/Брошено/Отложено/Буду смотреть
  rating: Boolean,        // 1-10, персональный рейтинг
  totalSeasons: Boolean,  // Общее количество сезонов в сериале
  viewedSeasons: Boolean  // Количество полностью просмотренных сезонов
  favourite: Boolean      // Является ли сериал избранным
  link: String | null     // Ссылка на сериал на любом желаемом ресурсе
}
```
