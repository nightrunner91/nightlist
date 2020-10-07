# Для чего нужен этот проект?

Для хранения и редактирования списков игр, сериалов, фильмов, аниме, книг, а также списка комплектующих ПК. Сегодня существует множество сайтов, предлагающих такой функционал, но все они сконцентрированы на чём-то одном. Кроме того, не все из них предоставляют нужный мне функционал, а некоторые меня не устраивают по части дизайна. Я хочу объединить это всё вместе и сделать <i>хорошо</i>.

# Кто будет этим пользоваться?

Для начала, только я, но не исключена возможность добавления системы пользователей в будущем.

# На чём будет базироваться проект?

Front-end часть будет выполнена на Vue.js в виде SPA-приложения. Хранение и редактирование базы данных будет реализовано с помощью JSON-файла, синхронизируемого в Google Cloud. У проекта не будет никакой "изначальной" базы данных, откуда пользователь сможет добавлять в свой профайл тайтлы. Все манипуляции с коллекцией тайтлов осуществляется вручную пользователем. Это лишь первая вариация, т.н. MVP (Minimum viable product), чтобы понять возможности дальнейшего развития.
 
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

Главным источником вдохновения по части дизайна выступает GOG Galaxy 2.0, можно сказать, что будущий проект будет очень похож по стилистике на него. 

![GOG Galaxy 2.0](https://i.imgur.com/K1kRZpk.jpg "GOG Galazy 2.0")

# Планируемое к реализации

### MVP

В первой ревизии нужно сделать минимально рабочий продукт, редактирумый только лично мной

* Создание и вёрстка дизайна и базовых элементов UI для дальнейшей работы
* Реализация постраничной навигации с использованием Vue Router
* Реализация системы добавления/редактирования/удаления тайтлов в каждой категории
* Синхронизация БД с Google Cloud
* Реализация системы сортировок тайтлов по критериям (название, рейтинг, избранное, время и т.д.)
* Реализация системы свёртывания/развёртывания категорий тайтлов (с сохранением в localStorage)
* Реализация системы поиска по тайтлам в режиме реального времени
* Реализация страницы "Dashboard", на которой будет суммированная информация из остальных категорий
* Развёртка проекта на бесплатном хостинге (```dev-html.musqogee.com```)

### v.2

На этом этапе возможен (скорее, необходим) переход на более комплексный и гибкий Back-end, нежели Google Cloud

* Добавление системы пользователей
* Генерация персональных страниц с URL вида ```site.com/username``` и персональной БД
* Покупка подходящего доменного имени
* Развёртка проекта на платном хостинге
* Получение фидбэка, статистики, исправление багов

### v.3

Вероятнее всего, для продвижения сайта понадобится внедрение большего функционала

* Реализация системы импорта списков тайтлов с популярных ресурсов (steam, myshows и аналогичные им)
* Гибкая настройка профайлов пользователей
* Монетизация проекта (в планах добавление платных функций, например, возможность установки пользовательских фоновых изображений)

# Особенности и функции категорий

### Главная страница

* Отображение избранных тайтлов из каждой категории
* Отображение количества тайтлов в каждой из категорий
* Отображение тайтлов "Буду смотреть/Буду играть/Буду читать" из соответствующих категорий
* Отображение количества проведённых часов в тайтлах из каждой категории (в виде графика)

### Игры

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
  id: Number,                 // Уникальный ID
  title: String,              // Название игры
  altTitle: String,           // Альтернативное название игры (предполагается русская локализация)
  status: String,             // Играю/Пройдено/Брошено/Отложено/Буду играть
  ownership: String,          // Куплено/Спирачено
  hours: Number,              // Количество затраченных часов
  hoursApproximate: Boolean,  // Точное или нет количество затраченных часов?
  rating: Number,             // 1-5, персональный рейтинг
  favourite: Boolean,         // Является ли игра избранной?
  priority: String,           // Приоритет прохождения, в случае наличия игры в категории "Буду играть"
  link: String | null         // Ссылка на игру на любом желаемом ресурсе
}
```

### Сериалы

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
  id: Number,              // Уникальный ID
  title: String,           // Название сериала
  altTitle: String,        // Альтернативное название сериала (предполагается русская локализация)
  status: String,          // Смотрю/Просмотрено/Брошено/Отложено/Буду смотреть
  rating: Number,          // 1-5, персональный рейтинг
  viewCount: Number,       // Количество просмотров (по умолчанию 1)
  totalSeasons: Number,    // Общее количество сезонов в сериале
  viewedSeasons: Number,   // Количество полностью просмотренных сезонов
  totalEpisodes: Number,   // Общее количество серий в сериале
  viewedEpisodes: Number,  // Количество просмотренных серий в сериале
  averageDuration: Number, // Средняя продолжительность одной серии
  favourite: Boolean,      // Является ли сериал избранным?
  link: String | null      // Ссылка на сериал на любом желаемом ресурсе
}
```

### Фильмы

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
  id: Number,             // Уникальный ID
  title: String,          // Название фильма
  altTitle: String,       // Альтернативное название фильма (предполагается русская локализация)
  status: String,         // Просмотрено/Буду смотреть
  viewCount: Number,      // Количество просмотров (по умолчанию 1)
  duration: Number,       // Продолжительность фильма
  rating: Number,         // 1-5, персональный рейтинг
  favourite: Boolean,     // Является ли фильм избранным?
  link: String | null     // Ссылка на фильм на любом желаемом ресурсе
}
```

### Аниме

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
  id: Number,              // Уникальный ID
  title: String,           // Название аниме
  altTitle: String,        // Альтернативное название аниме (предполагается русская локализация)
  status: String,          // Смотрю/Просмотрено/Брошено/Отложено/Буду смотреть
  viewCount: Number,       // Количество просмотров (по умолчанию 1)
  rating: Number,          // 1-5, персональный рейтинг
  totalSeasons: Number,    // Общее количество сезонов в сериале
  viewedSeasons: Number,   // Количество полностью просмотренных сезонов
  totalEpisodes: Number,   // Общее количество серий в сериале
  viewedEpisodes: Number,  // Количество просмотренных серий в сериале
  averageDuration: Number, // Средняя продолжительность одной серии
  favourite: Boolean,      // Является ли аниме избранным?
  link: String | null      // Ссылка на аниме на любом желаемом ресурсе
}
```

### Книги

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
  id: Number,             // Уникальный ID
  title: String,          // Название книги
  author: String,         // Имя автора книги
  status: String,         // Читаю/Прочитано/Брошено/Буду читать
  rating: Number,         // 1-5, персональный рейтинг
  favourite: Boolean,     // Является ли книга избранной?
  link: String | null     // Ссылка на книгу на любом желаемом ресурсе
}
```

### Список комплектующих ПК

* Создание сборки ПК
* Редактирование созданной сборки ПК
* Удаление созданной сборки ПК

Предварительный вариант объекта класса "Комплектующие ПК":

```
{
 id: Number,               // Уникальный ID
 current: Boolean,         // Является ли сборка текущей
 createDate: Date,         // Дата создания сборки
 title: String,            // Название сборки
 cpu: {                    // Название процессора и ссылка на него
  title: String,
  link: String
 },
 cpuCooler: {              // Название кулера процессора и ссылка на него
  title: String,
  link: String
 },
 thermalCompund: String,   // Название используемой термопасты
 motherboard: {            // Название материнской платы и ссылка на неё
  title: String,
  link: String
 },
 ram: {                    // Название оперативной памяти и ссылка на неё
  title: String,
  link: String
 },
 gpu: {                    // Название видеокарты и ссылка на неё
  title: String,
  link: String
 },
 storage: [                // Названия и ссылки на используемые в сборке накопители (HDD, SSD)
  {
   title: String,
   link: String
  },
  {
   title: String,
   link: String
  }
  ...
 ],
 power: {                  // Название блока питания и ссылка на него
  title: String,
  link: String
 },
 case: {                   // Название корпуса и ссылка на него
  title: String,
  link: String
 },
 monitor: {                // Название монитора и ссылка на него
  title: String,
  link: String
 },
 keyboard: {               // Название клавиатуры и ссылка на неё
  title: String,
  link: String
 },
 mouse: {                  // Название мыши и ссылка на неё
  title: String,
  link: String
 },
 mousePad: {               // Название коврика для мыши и ссылка на него
  title: String,
  link: String
 },
 headphones: {             // Название наушников для мыши и ссылка на них
  title: String,
  link: String
 },
 speakers: {               // Название колонок для мыши и ссылка на них
  title: String,
  link: String
 },
 ups: {                    // Название источника бесперебойного питания и ссылка на него
  title: String,
  link: String
 },
 controllers: [             // Название контроллера (геймпада, например) и ссылка на него
   {
    title: String,
    link: String
   },
   {
    title: String,
    link: String
   }
 ]
}
```

# Компоненты модальных окон

Из каких элементов UI будут состоять модальные окна для добавления и редактирования тайтлов в каждой из категорий

### Игры
```
title              | input (type Text)
status             | dropdown
ownership          | selector
hours              | input (type Number)
hoursApproximate   | checkbox 
rating             | stars
favourite          | checkbox
priority           | dropdown (if status == 'Буду играть')
link               | input (type Text)
```
### Сериалы
viewedSeasons/totalSeasons и viewedEpisodes/totalEpisodes должны быть "спаренными" для удобства. 
```
title              | input (type Text)
status             | dropdown
rating             | stars
viewCount          | input (type Number)
totalSeasons       | input (type Number)
viewedSeasons      | input (type Number)
totalEpisodes      | input (type Number)
viewedEpisodes     | input (type Number)
averageDuration    | input (type Number)
favourite          | checkbox
link               | input
```
### Фильмы
```
title              | input (type Text)
status             | dropdown
viewCount          | input (type Number)
duration           | input (type Number)
rating             | stars
favourite          | checkbox
link               | input (type Text)
```
### Аниме
viewedSeasons/totalSeasons и viewedEpisodes/totalEpisodes должны быть "спаренными" для удобства. 
```
title              | input (type Text)
status             | dropdown
rating             | stars
viewCount          | input (type Number)
totalSeasons       | input (type Number)
viewedSeasons      | input (type Number)
totalEpisodes      | input (type Number)
viewedEpisodes     | input (type Number)
averageDuration    | input (type Number)
favourite          | checkbox
link               | input (type Text)
```
### Книги
```
title              | input (type Text)
author             | input (type Text)
status             | dropdown
rating             | stars
favourite          | checkbox
link               | input (type Text)
```
### Комплектующие ПК
```
title                | input (type Text)
current              | checkbox
createDate           | datepicker

cpu.title            | input (type Text)
cpu.link             | input (type Text)

cpuCooler.title      | input (type Text)
cpuCooler.link       | input (type Text)

thermalCompund.title | input (type Text)
thermalCompund.link  | input (type Text)

motherboard.title    | input (type Text)
motherboard.link     | input (type Text)

ram.title            | input (type Text)
ram.link             | input (type Text)

gpu.title            | input (type Text)
gpu.link             | input (type Text)

storage.title        | input (type Text) --- внизу должна быть кнопка +, если носителей несколько
storage.link         | input (type Text)

power.title          | input (type Text)
power.link           | input (type Text)

case.title           | input (type Text)
case.link            | input (type Text)

monitor.title        | input (type Text) --- внизу должна быть кнопка +, если мониторов несколько
monitor.link         | input (type Text)

keyboard.title       | input (type Text)
keyboard.link        | input (type Text)

mouse.title          | input (type Text)
mouse.link           | input (type Text)

mousePad.title       | input (type Text)
mousePad.link        | input (type Text)

headphones.title     | input (type Text)
headphones.link      | input (type Text)

speakers.title       | input (type Text)
speakers.link        | input (type Text)

ups.title            | input (type Text)
ups.link             | input (type Text)

controller.title     | input (type Text) --- внизу должна быть кнопка +, если контроллеров несколько
controller.link      | input (type Text)
```
