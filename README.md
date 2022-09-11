## Summary

This is a front-end project for personal usage. It uses localStorage and/or local JSON file to store all my games, movies and books statistics in one pretty looking app. You can use it too, but be prepared to fill it with your data as I did.

Since you are using this app on your device at localhost it will use localStorage of your browser to store your data. Be aware not to clean it, otherwise you will loose all your data. Production mode uses [JSON file](backup.json) stored in core folder of the project. To save localStorage data to JSON file use keyboard combination `Ctrl + I`.

If you have any questions or you need some help feel free to contact me. Good luck. 😉

## Preview

[Github pages](https://nightrunner91.github.io/nightlist/)

## How to use it?

Clone repo and install dependencies
```
git clone git@github.com:nightrunner91/nightlist.git
npm i
```
Run hot-reload dev server
```
npm run serve
```
Build your project
```
npm run build
```
## Ideas for future

- [] Add 'About me' page
- [] Add 'My PC' page
- [] Add 'Statistics' page
- [] Add statistics widgets for each category
- [] Show replay counter for movies, tv shows and anime
