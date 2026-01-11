# Superhero Directory


This project is a React web application built using [Vite](https://vite.dev/), with [Tailwind CSS](https://tailwindcss.com/) for styling.

## Install dependencies

Run installation with selected package manager `npm install`

## Create .env file

Copy .env.example to .env.local and set the environment variables.

```bash
cp .env.example .env.local
```

Then go to <https://superheroapi.com/>, generate a new API key and set it in the `.env.local` file.

```bash

## Usage

- `npm start` - run development server
- `npm build` - production build

Open an example superhero page at <http://localhost:5173/63>.

# Список доработок
0) В ридми выше косяк - названия скриптов отличаются от реальных из package
1) Создал папку хуков у сущности героя, перенес хук на получение героя туда, явный ренейм с методом
2) Выделил апи в отдельную функцию, чтобы ее юзать в queryFn
3) Т.к. это фсд создал интерфейс сущности с экспортами в индексе
4)* Мне привычнее делать явный нейм ключей квери и хранить рядом с апи сразу, но это чисто моя привычка
5) У гета героев были лишние хэдеры формата тела, видимо от пута, убрал + смешивание await и then как по мне лишнее, убрал
6) нейминг у файла с типами у сущности поменял на types.ts
7) Удалил файл с типизацией респонсов - не очень понял, зачем эта лишняя обертка над возвращаемым значением

* Добавлял отбивки импортов по привычке
