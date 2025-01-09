# Синдикация BI

Система создания кабинетов с графиками, фильтрами.

## Команды

### Запуск локального проекта:

```bash
npm run dev
```

### Сборка проекта:

```bash
npm run build
```

## Основной стек

- **React + TS + Vite** — [сборка](https://vite.dev/guide/)
- **Redux** — [стейт-менеджер](https://redux.js.org/introduction/getting-started)
- **Axios** — [запросы](https://axios-http.com/ru/docs/api_intro)
- **RSuite** — [UI-компоненты](https://rsuitejs.com/components/overview/)
- **Tailwind CSS** — [стилизация](https://tailwindcss.ru/docs)
- **React-Hook-Form** — [работа с формами](https://react-hook-form.com/)
- **Yup** — [валидация](https://github.com/jquense/yup?tab=readme-ov-file)
- **ECharts** — [основная работа с графиками](https://echarts.apache.org/examples/en/index.html)
- **Ag-Grid** — [сводные таблицы](https://www.ag-grid.com/javascript-data-grid/getting-started/)
- **Cytoscape** — [работа с графами](https://js.cytoscape.org/)
- **PptxGenJS** — [выгрузка презентаций в PowerPoint](https://gitbrent.github.io/PptxGenJS/docs/quick-start/)
- **React-DnD** — [работа с drag and drop](https://react-dnd.github.io/react-dnd/about)
- **React-Grid-Layout** — [адаптивные изменяемые перетаскиваемые контейнеры](https://github.com/react-grid-layout/react-grid-layout)
- **Swiper** — [слайдер](https://swiperjs.com/get-started)

## Архитектура

В основу архитектуры положено [**Feature-Sliced Design**](https://feature-sliced.design/ru/docs).

# Слои

## **app** — верхний уровень. Основная конфигурация приложения.

Может импортировать из любого слоя.  
Содержит:

- [app/index.tsx](https://git.romir.ru/romir-ds/sindicat-bi-front/-/tree/main/src/app/index.tsx) — основной файл;
- [app/store.ts](https://git.romir.ru/romir-ds/sindicat-bi-front/-/tree/main/src/app/store.ts) — объявление стора;
- [app/config/open-question-client.ts](https://git.romir.ru/romir-ds/sindicat-bi-front/-/tree/main/src/app/config/api-client.ts), [app/config/login-client.ts](https://git.romir.ru/romir-ds/sindicat-bi-front/-/tree/main/src/app/config/login-client.ts) — инстансы запросов;
- [app/config/constants.ts](https://git.romir.ru/romir-ds/sindicat-bi-front/-/tree/main/src/app/config/constants.ts) — глобальные константы;
- [app/config/router.ts](https://git.romir.ru/romir-ds/sindicat-bi-front/-/tree/main/src/app/config/router.ts) — маршрутизация;
- [app/providers/](https://git.romir.ru/romir-ds/sindicat-bi-front/-/tree/main/src/app/providers/) — провайдеры;
- [app/styles/](https://git.romir.ru/romir-ds/sindicat-bi-front/-/tree/main/src/app/styles/) — глобальные стили;
- [app/types/](https://git.romir.ru/romir-ds/sindicat-bi-front/-/tree/main/src/app/types/) — глобальные типы.

## **pages** — страницы. Страницы являются контейнерами для композиции `widgtes` и `features`.

Может импортировать из любого слоя кроме `app`.  
Содержит:

- [pages/auth.tsx](https://git.romir.ru/romir-ds/sindicat-bi-front/-/tree/main/src/pages/auth.tsx) — авторизация. Отображает `LoginForm`;
- [pages/main.ts](https://git.romir.ru/romir-ds/sindicat-bi-front/-/tree/main/src/pages/main.ts) — контейнер-layout. Обертка для всех страниц которые содрежат `header`. Остальной контент меняется динамически. Запрашивает юзера`getMe`, клиентов`getClients` и записывает текущего клиента и роль в стор`setClient`;
- [pages/home.tsx](https://git.romir.ru/romir-ds/sindicat-bi-front/-/tree/main/src/pages/home.tsx) — главная страница синдикации. Здесь импортируются фичи и виджеты отвечающие за выборку клиентов, отчетов, групп, графиков, фильтров, навигация по доступным группам и основных настроек;

## **widgets** — виджеты. Виджеты являются контейнерами для композиции `features`, `entities` и `shared` слой.

Может импортировать только из  `features`, `entities` и `shared`.  
Содержит:

- [widgets/header/](https://git.romir.ru/romir-ds/sindicat-bi-front/-/tree/main/src/widgets/header) — header;
- [widgtes/top-panel.tsx](https://git.romir.ru/romir-ds/sindicat-bi-front/-/tree/main/src/widgets/top-panel.tsx) — верхняя панель. импортирует `features`: для работы с выборкой клиентов(зависит от роли), выборка отчета, сохранение фильтров, режим редактирования `react-grid-layout`, открытие настроек(зависит от роли);
- [widgtes/active-group.tsx](https://git.romir.ru/romir-ds/sindicat-bi-front/-/tree/main/src/widgets/active-group.tsx) — активная группа получает выбранную группу. Здесь происходит запрос на фильтры`getFilters` группы. Если в группе есть картинки то отображает их оборачивая `react-grid-layout`, иначе отображает фильтры(если есть) и графики группы(если есть);
- [widgtes/drawer-create-chart.tsx](https://git.romir.ru/romir-ds/sindicat-bi-front/-/tree/main/src/widgets/drawer-create-chart.tsx) — Дровер создания графика. Отображает фичу `SwitchForm`
- [widgtes/drawer-edit-chart/](https://git.romir.ru/romir-ds/sindicat-bi-front/-/tree/main/src/widgets/drawer-edit-chart/) — Дровер редактирования графика. Инициализирует `useForm` и дефолтные поля. Оборачивает все `Form-Provider`. Импортирует активную активную группу(которая содержит данные графиков и `formatting`). Отображает `ChartSwitcher` и `FormSwitcher`
- [widgtes/drawer-create-group.tsx](https://git.romir.ru/romir-ds/sindicat-bi-front/-/tree/main/src/widgets/drawer-create-group.tsx), [widgtes/drawer-edit-group/](https://git.romir.ru/romir-ds/sindicat-bi-front/-/tree/main/src/widgets/drawer-edit-group/) — Дроверы для создания и редактирования группы. Отображает фичу `GroupForm`
- [widgtes/drawer-filters.tsx/](https://git.romir.ru/romir-ds/sindicat-bi-front/-/tree/main/src/widgets/drawer-filters.tsx) - Дровер работы с фильтрами. Отображает фичу `FilterManager`


## **features** — фичи. Фичи это действия пользователя или действия которые влияют на бизнес логику.

Может импортировать только из `entities` и  `shared`.  
Содержит:

- [features/auth/](https://git.romir.ru/romir-ds/sindicat-bi-front/-/tree/main/src/features/auth/) — Содержит модель `auth`, `slice`, `selectors`, `types`, `schema`, `LoginForm` - форма отправляет запрос на `login`. При успехе записываем полученный токен в `localStorage` и навигирует на главную;
- [features/react-grid-layout/](https://git.romir.ru/romir-ds/sindicat-bi-front/-/tree/main/src/features/react-grid-layout/) — `React-Grid-Layout` оборачивает компонеты(любой массив jsx элементов). эти компонеты становятся перетасиваемыми, можем менять их ширину и высоту(если активирован режим редактирования), следит и обновляет изменения положений графиков, записывает стор(`setGraphsPosition`);
- [features/save-filter-button.tsx](https://git.romir.ru/romir-ds/sindicat-bi-front/-/tree/main/src/features/save-filter-button.tsx) - Сохраняет выбранные фильтры(если нет сохраненных)`save_filter` или обновляет существующие сохранения `update_filter`
- [features/toggle-edit-mode-button.tsx](https://git.romir.ru/romir-ds/sindicat-bi-front/-/tree/main/src/features/toggle-edit-mode-button.tsx) - Переключает активность режима редактирования`setIsEditMode`, сохраняет позиции элементов`saveGraphsPosition` или обновляет`updateGraphsPosition`(если есть)
- [features/change-group-tabs/](https://git.romir.ru/romir-ds/sindicat-bi-front/-/tree/main/src/features/change-group-tabs/) - Слайдер с доступными группами активного отчета. Содержит `hooks`, `utils`, `ui`. Запрашивает активную группу`getGroupById` и сбрасывает локальные состояния графиков, фильтров, позиций, лоадеров
- [features/group-form/](https://git.romir.ru/romir-ds/sindicat-bi-front/-/tree/main/src/features/group-form/) - Форма создания`createGroup` или редактирования`updateGroup` и удаления`deleteGroup` группы. После успеха делает запрос и обновление активной группы`getGroupById` 
- [features/filter-group/](https://git.romir.ru/romir-ds/sindicat-bi-front/-/tree/main/src/features/filter-group/) - Отображает список фильтров группы. Изменени фильтра записывает в стора`setFilterValue`, этот процесс запускает запрос на зависимые фильтры справа`getDependentFilters` - получаем все фильтра справа от активного с пересчитанными`original_values`(при условии если активный фильтр не является крайним справа). Фильтры отменяют текущий запрос`abortController.signal` если во время запроса фильтры менялись`setFilterValue`
- [features/filter-manager/](https://git.romir.ru/romir-ds/sindicat-bi-front/-/tree/main/src/features/filter-manager/) - Форма создания`createFilter`, редактирования`updateFilterById` и удаления`deleteFilterById` фильтров группы.