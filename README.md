# Для чего этот проект?

Для хранения и редактирования списков игр, сериалов, фильмов, аниме, а также списка комплектующих ПК. Сегодня существует множество сайтов, предлагающих такой функционал, но все они сконцентрированы на чём-то одном. Я хочу объединить это всё вместе.

# Кто будет этим пользоваться?

Для начала, только я, но не исключена возможность добавления система пользователей в будущем.

# На чём будет базироваться проект?

Front-end часть будет выполнена на Vue.js. Хранение и редактирование базы данных будет реализовано с помощью JSON-файла, синхронизируемого в Google Cloud.

# Список планируемого к реализации:

### Общее

* Создание дизайна
* Написание SPA приложения на базе vue.js
* Синхронизация БД с Google Cloud
* Покупка подходящего доменного имени
* Развёртка проекта на хостинге

### Игры:

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

### Сериалы:

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
