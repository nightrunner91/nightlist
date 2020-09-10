# Для чего нужен этот проект?

Для хранения и редактирования списков игр, сериалов, фильмов, аниме, книг, а также списка комплектующих ПК. Сегодня существует множество сайтов, предлагающих такой функционал, но все они сконцентрированы на чём-то одном. Кроме того, не все из них предоставляют нужный мне функционал, а некоторые меня не устраивают по части дизайна. Я хочу объединить это всё вместе и сделать <i>хорошо</i>.

# Кто будет этим пользоваться?

Для начала, только я, но не исключена возможность добавления системы пользователей в будущем.

# На чём будет базироваться проект?

Front-end часть будет выполнена на Vue.js. Хранение и редактирование базы данных будет реализовано с помощью JSON-файла, синхронизируемого в Google Cloud. У проекта не будет никакой "изначальной" базы данных, откуда пользователь сможет добавлять в свой профайл тайтлы. Всё будет осуществляться вручную.
 
# Источники вдохновения

- [GOG Galaxy 2.0](https://www.gog.com/galaxy) (игры и дизайнерские решения)
- [ag.ru](https://ag.ru/) (игры и дизайнерские решения)
- [metacritic.com](https://metacritic.com/) (игры, сериалы и фильмы)
- [rottentomatoes.com](https://www.rottentomatoes.com/) (игры, сериалы и фильмы)
- [myvideogamelist.com](https://myvideogamelist.com/) (игры)
- [store.steampowered.com](https://store.steampowered.com/) (игры)
- [kanobu.ru](https://kanobu.ru/) (игры)
- [myshows.me](https://myshows.me/) (сериалы)
- [kinopoisk.ru](https://kinopoisk.ru/) (сериалы и фильмы)
- [imdb.com](https://imdb.com/) (сериалы и фильмы)
- [letterboxd.com](https://letterboxd.com/) (фильмы и дизайнерские решения)
- [kinopoisk.ru](https://kinopoisk.ru/) (фильмы и сериалы)
- [shikimori.org](https://shikimori.org/) (аниме)
- [readly.ru](http://readly.ru/) (книги)
- [pcpartpicker.com](https://pcpartpicker.com/) (комплектующие ПК)
- [pchound.com](https://pchound.com/) (комплектующие ПК)

Главным источником вдохновения по части дизайна выступает GOG Galaxy 2.0, можно сказать, что будущий проект будет очень похож на стилистике и функционалу на него. 

![GOG Galaxy 2.0](https://i.imgur.com/K1kRZpk.jpg "GOG Galazy 2.0")

# Планируемое к реализации

## Общее

* Создание дизайна
* Написание SPA приложения на базе vue.js
* Синхронизация БД с Google Cloud
* Покупка подходящего доменного имени
* Развёртка проекта на хостинге

## Главная страница

* Отображение избранных тайтлов из каждой категории
* Отображение количества тайтлов в каждой из категории

## Игры

* Добавление новой игры в БД
* Редактирование добавленной игры в БД
* Удаление добавленной игры из БД
* Поиск среди списка игр в режиме real-time
* Категоризация списка игр
* Маркировка избранных игр
* Сортировка игр по персональному рейтингу
* Сортировка игр по затраченным часам
* Сортировка "списка желаемого" по приоритету

Предварительный вариант объекта класса "Игры":

```
{
  id: Number,          // уникальный ID
  title: String,       // Название игры
  status: String,      // Играю/Пройдено/Брошено/Отложено/Буду играть
  ownership: String,   // Куплено/Спирачено
  hours: Number,       // Количество затраченных часов,
  rating: Number,      // 1-10, персональный рейтинг
  favourite: Boolean   // Является ли игра избранной
  link: String | null  // Ссылка на игру на любом желаемом ресурсе
}
```

## Сериалы

* Добавление нового сериала в БД
* Редактирование добавленного сериала в БД
* Удаление добавленного сериала из БД
* Поиск среди списка сериалов в режиме real-time
* Категоризация списка сериалов
* Маркировка избранных сериалов
* Отображение прогресса по сезонам
* Сортировка сериалов по персональному рейтингу

Предварительный вариант объекта класса "Сериал":

```
{
  id: Number,             // уникальный ID
  title: String,          // Название сериала
  status: String,         // Смотрю/Просмотрено/Брошено/Отложено/Буду смотреть
  rating: Number,         // 1-10, персональный рейтинг
  totalSeasons: Number,   // Общее количество сезонов в сериале
  viewedSeasons: Number,  // Количество полностью просмотренных сезонов
  favourite: Boolean      // Является ли сериал избранным
  link: String | null     // Ссылка на сериал на любом желаемом ресурсе
}
```

## Фильмы

* Добавление нового фильма в БД
* Редактирование добавленного фильма в БД
* Удаление добавленного фильма из БД
* Поиск среди списка фильмов в режиме real-time
* Категоризация списка фильмов
* Маркировка избранных фильмов
* Сортировка фильмов по персональному рейтингу

Предварительный вариант объекта класса "Фильм":

```
{
  id: Number,             // уникальный ID
  title: String,          // Название фильма
  status: String,         // Просмотрено/Буду смотреть
  rating: Number,         // 1-10, персональный рейтинг
  favourite: Boolean      // Является ли фильм избранным
  link: String | null     // Ссылка на сериал на любом желаемом ресурсе
}
```

## Аниме

* Добавление нового аниме в БД
* Редактирование добавленного аниме в БД
* Удаление добавленного аниме из БД
* Поиск среди списка аниме в режиме real-time
* Категоризация списка аниме
* Маркировка избранного аниме
* Отображение прогресса по сезонам
* Сортировка сериалов по персональному рейтингу

Предварительный вариант объекта класса "Аниме":

```
{
  id: Number,             // уникальный ID
  title: String,          // Название аниме
  status: String,         // Смотрю/Просмотрено/Брошено/Отложено/Буду смотреть
  rating: Number,         // 1-10, персональный рейтинг
  totalSeasons: Number,   // Общее количество сезонов в сериале
  viewedSeasons: Number,  // Количество полностью просмотренных сезонов
  favourite: Boolean      // Является ли аниме избранным
  link: String | null     // Ссылка на аниме на любом желаемом ресурсе
}
```

## Книги

* Добавление новой книги в БД
* Редактирование добавленной книги в БД
* Удаление добавленной книги из БД
* Поиск среди списка книг в режиме real-time
* Категоризация списка книг
* Маркировка избранных книг
* Сортировка книг по персональному рейтингу
* Сортировка книг по автору

Предварительный вариант объекта класса "Книга":

```
{
  id: Number,             // уникальный ID
  title: String,          // Название книги
  author: String          // Имя автора книги
  status: String,         // Читаю/Прочитано/Брошено/Буду читать
  rating: Number,         // 1-10, персональный рейтинг
  favourite: Boolean      // Является ли книга избранной
  link: String | null     // Ссылка на книгу на любом желаемом ресурсе
}
```

## Список комплектующих ПК

* Создание сборки ПК
* Редактирование созданной сборки ПК
* Удаление созданной сборки ПК

Предварительный вариант объекта класса "Комплектующие ПК":

```
{
  id: Number,             // уникальный ID
  title: String,          // Название сборки
  cpu: String,            // Название процессора
  cpuCooler: String,      // Название кулера процессора
  thermalCompund: String, // Название используемой термопасты
  motherboard: String,    // Название материнской платы
  ram: String,            // Название оперативной памяти
  storage: {
   storage_1: String,     // Используемые в сборке 
   storage_2: String      // жесткие и твердотепльные накопители
   ...
  },
  gpu: String,            // Название видеокарты
  power: String,          // Название блока питания
  case: String,           // Название корпуса
  monitor: String,        // Название монитора
  keyboard: String,       // Название клавиатуры
  mouse: String,          // Название мыши
  mousePad: String,       // Название коврика для мыши
  headphones: String,     // Название гарнитуры
  peakers: String,        // Название колонок
  UPS: String,            // Название источника бесперебойного питания
  accessories: {
   controller: String     // Название игрового контроллера
  }
}
```
