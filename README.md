# Суть проекта

Это сайт для хранения и редактирования списков игр, сериалов, фильмов, аниме и книг. Сегодня существует множество сайтов, предлагающих такой функционал, но все они сконцентрированы на чём-то одном. Кроме того, не все из них предоставляют нужный мне функционал, а некоторые меня не устраивают по части дизайна. Я хочу объединить это всё вместе и сделать <i>хорошо</i>.
 
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

# Планируемое к реализации

### v.1

В первой ревизии нужно сделать минимально рабочий продукт.

* ~~Создание и вёрстка дизайна и базовых элементов UI для дальнейшей работы.~~
* ~~Реализация постраничной навигации с использованием Vue Router.~~
* ~~Реализация системы сортировок тайтлов по критериям (название, рейтинг, избранное, время и т.д.).~~
* ~~Реализация системы свёртывания/развёртывания категорий тайтлов (с сохранением в localStorage).~~
* ~~Реализация системы поиска по тайтлам в режиме реального времени.~~
* ~~Написание Back-end составляющей для действий добавления/редактирования/удаления тайтлов.~~
* Реализация системы добавления/редактирования/удаления тайтлов в каждой категории.
* Реализация системы пользователей с персональными настройками и БД.
* Генерация персональных страниц с URL вида ```site.com/username```.
* Реализация страницы "Dashboard", на которой будет суммированная информация из остальных категорий (избранное, затраченные часы и прочее).
* Адаптивная вёрстка всех разделов сайта.
* Поиск и покупка подходящего доменного имени (```collct.me, collection.page, mycollection.cc, mylists.cc ```).
* Развёртка проекта на production.

### v.2

Во второй ревизии будет уже полноценный публичный продукт. 

* Реализация системы импорта списков тайтлов с популярных ресурсов (steam, myshows и аналогичные им).
* Создание лэндинга с описанием функций сайта, который будет вести на регистрацию/авторизацию.
* Добавление средств аналитики (Google Analytics / Yandex Метрика).
* Добавление функции репорта о багах.
* Создание Discord канала.
* Получение фидбэка, статистики, исправление багов.

### v.3

Когда (если) наберу достаточную базу пользователей, придёт пора переходить на следующий этап, финальный.

* Внедрение премиум-аккаунтов с продвинутыми функциями (вроде установки собственных фоновых изображений).
* Создание страницы добровольных пожертвований.
* Активное продвижение проекта (SEO).
* Регулярная поддержка проекта.

# Форматы данных

### Игры
```
{
  id: Number,                 // Уникальный ID
  category: String,           // Название категории
  title: String,              // Название игры
  status: String,             // Название статуса (Играю, Пройдено, Буду играть...)
  statusId: String,           // ID статуса
  platform: String,           // Название платформы (Steam, Origin...)
  platformId: String,         // ID платформы
  hours: Number,              // Количество затраченных часов
  hoursApproximate: Boolean,  // Точное или нет количество затраченных часов?
  rating: Number,             // 1-5, персональный рейтинг
  favourite: Boolean,         // Является ли игра избранной?
  link: String,               // Ссылка на игру на любом желаемом ресурсе
  refreshed: Boolean          // Параметр для внутренних нужд (для дизайна)
}
```
### Сериалы
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
  link: String             // Ссылка на сериал на любом желаемом ресурсе
}
```
### Фильмы
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
  link: String            // Ссылка на фильм на любом желаемом ресурсе
}
```
### Аниме
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
  link: String             // Ссылка на аниме на любом желаемом ресурсе
}
```
### Книги
```
{
  id: Number,             // Уникальный ID
  title: String,          // Название книги
  author: String,         // Имя автора книги
  status: String,         // Читаю/Прочитано/Брошено/Буду читать
  rating: Number,         // 1-5, персональный рейтинг
  favourite: Boolean,     // Является ли книга избранной?
  link: String            // Ссылка на книгу на любом желаемом ресурсе
}
```
