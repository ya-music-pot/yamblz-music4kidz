# yamblz-music4kidz

## Сборка
- Первоначальная установка зависимостей: `npm i`.
- Запуск проекта с webpack-dev-server: `npm start`.
- Сборка dev версии проекта: `npm run dev`
- Продакшен сборка версии проекта: `npm run prod`

## Соглашения

### Типизация
Для типизации функций используем jsDoc.

Виды типов:
- `String`
- `Number`
- `Boolean`
- `Object`
- `Object[]` — массив объектов
- `Number[]` — массив цифр
- `String[]` — массив строк
- `Boolean[]` — массив булевых значений
- `Function`
- `Node` — jsx/html.
- `String|Number` — может быть возвращен разные тип.

jsDoc для функции render в react-компонентах, если он возвращает `Node` — не пишем.

по возможности описывать внутренние параметрны объекта (не нужно для return):
```
 * @param  {Object} list
 * @param  {String} list.type
 * @param  {Object} list.payload 
```
или массива, если он содержит объекты (не нужно для return):
```
 * @param  {Object[]} list
 * @param  {String} list[].type
 * @param  {Object} list[].payload 
```
Описываем только один уровень: внутренний объект в list, не нужно.

**Примеры:**
```
/**
 * testFunc
 * @param  {Object} list
 * @param  {String} list.name
 * @param  {Object} action
 * @param  {String} action[].type
 * @param  {Object} action[].payload 
 * @return {Object}
 */
function testFunc(list, action) {...}
```

Если считаете необходимым добавить описание, то:
```
/**
 * testFunc — Функция делает то-то
 * @param  {Object} list    ....
 * @param  {Object} action  ....
 * @return {Object}         ....
 */
function testFunc(list, action) {...}
```

Если функция ничего не принимает и не возвращает jsDoc не нужен.
```
function testFunc() {...}
```

Если только возвращает (для return не описываем развертку массива или объекта):
```
/**
 * testFunc
 * @return {Object}
 */
function testFunc(list, action) {...}
```
