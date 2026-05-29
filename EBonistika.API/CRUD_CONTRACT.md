# CRUD-контракт eBonistika (ТЗ для бэка)

> Этот файл — «контракт» между фронтом и бэком. Фронт (ветка `maz-36-frontend-crud`)
> уже написан под эти endpoint'ы и DTO. Задача бэка — реализовать их **ровно в этой форме**,
> тогда на стыке всё сойдётся без переделок фронта.
>
> Каскадное удаление Collection→Series→Items **уже настроено** в `Data/AppDbContext.cs`
> (`OnDelete(DeleteBehavior.Cascade)`), отдельно делать не нужно.
>
> Поля помечены `// TODO (Ваня)` в соответствующих файлах.

## 0. Изменения схемы (одна миграция)

| Сущность     | Добавить поле                | Примечание                                              |
|--------------|------------------------------|---------------------------------------------------------|
| `Collection` | `DateTimeOffset CreatedAt`   | Заполнять `DateTimeOffset.UtcNow` при создании.         |
| `Item`       | `bool IsOwned`               | «в коллекции» (true) / «в поиске» (false). Default `true`. |

В сид-данных (`AppDbContext`) проставить дефолты: всем `Collection.CreatedAt` — фикс. дату
(нельзя `UtcNow` в `HasData` — будет «модель меняется при каждой миграции», ставь литерал),
всем `Item.IsOwned = true`.

После правок: `dotnet ef migrations add AddCrudFields` + `dotnet ef database update`.

## 1. Общие правила

- Отдельные **input-DTO** на создание/изменение (НЕ переиспользовать выходные DTO).
- `Id`, `CreatedAt`, `CollectionId` (у Item) клиент НЕ присылает и менять НЕ может.
- Валидация `Name`: обязательно, `Trim()`, не пусто и не одни пробелы → иначе `400`.
- `POST` → `201 Created` + созданный выходной DTO (с `Id`/`CreatedAt`).
- `PUT` → `200 OK` + обновлённый DTO, либо `404`.
- `DELETE` → `204 No Content`, либо `404`.
- Базовый префикс: `/api`. CORS на `http://localhost:3000` уже настроен в `Program.cs`.

---

## 2. Collections

Выходной DTO нужно **расширить** (фронт уже читает эти поля):

```csharp
public record CollectionDto(
    Guid Id,
    string Name,
    DateTimeOffset CreatedAt,
    int SeriesCount,   // db.Series.Count(s => s.CollectionId == c.Id)
    int ItemCount);    // db.Items.Count(i => i.CollectionId == c.Id)  — для текста модалки удаления
```
> Обнови проекции в `CollectionsService.GetAllAsync` под новый конструктор.

| Метод  | Маршрут                  | Тело (input)                       | Ответ                  |
|--------|--------------------------|------------------------------------|------------------------|
| GET    | `/api/collections`       | —                                  | `200` `CollectionDto[]`|
| GET    | `/api/collections/{id}`  | —                                  | `200` `CollectionDto` / `404` |
| POST   | `/api/collections`       | `CreateCollectionDto { string Name }` | `201` `CollectionDto` |
| PUT    | `/api/collections/{id}`  | `UpdateCollectionDto { string Name }` | `200` `CollectionDto` / `404` |
| DELETE | `/api/collections/{id}`  | —                                  | `204` / `404`          |

> `GET /{id}` — новый, фронт его подключит для detail-страницы.

---

## 3. Series

`SeriesDto` менять не нужно (он уже отдаёт `ItemCount`). Country у серии НЕ добавляем — страна живёт на Item.

```csharp
public record CreateSeriesDto(Guid CollectionId, string Name, int YearFrom, int YearTo);
public record UpdateSeriesDto(string Name, int YearFrom, int YearTo); // CollectionId менять нельзя
```

| Метод  | Маршрут                       | Тело                | Ответ                |
|--------|-------------------------------|---------------------|----------------------|
| GET    | `/api/series?collectionId=..` | —                   | `200` `SeriesDto[]`  |
| GET    | `/api/series/{id}`            | —                   | `200` `SeriesDto` / `404` |
| POST   | `/api/series`                 | `CreateSeriesDto`   | `201` `SeriesDto`    |
| PUT    | `/api/series/{id}`            | `UpdateSeriesDto`   | `200` `SeriesDto` / `404` |
| DELETE | `/api/series/{id}`            | —                   | `204` / `404`        |

> POST: проверь, что `CollectionId` существует, иначе `400`. `CreatedAt` ставит бэк.

---

## 4. Items

`ItemDto` нужно **расширить** полем `IsOwned`:

```csharp
public record ItemDto(
    Guid Id, Guid CollectionId, Guid SeriesId,
    string Kind, string Nominal, string Currency, string Country, int Year,
    string Condition, int Count, int YearFrom, int YearTo,
    decimal? PurchasePrice, string? PurchaseCurrency, DateTimeOffset? PurchaseDate,
    string Notes, bool IsOwned,           // <-- НОВОЕ
    string? ObverseUrl, string? ReverseUrl);
```

Input-DTO (фронт НЕ шлёт `CollectionId` — бэк берёт его из Series по `SeriesId`):

```csharp
public record CreateItemDto(
    Guid SeriesId,
    string Kind, string Nominal, string Currency, string Country, int Year,
    string Condition, int Count, int YearFrom, int YearTo,
    decimal? PurchasePrice, string? PurchaseCurrency, DateTimeOffset? PurchaseDate,
    string Notes, bool IsOwned);

public record UpdateItemDto(           // SeriesId / CollectionId менять нельзя
    string Kind, string Nominal, string Currency, string Country, int Year,
    string Condition, int Count, int YearFrom, int YearTo,
    decimal? PurchasePrice, string? PurchaseCurrency, DateTimeOffset? PurchaseDate,
    string Notes, bool IsOwned);
```

| Метод  | Маршрут                  | Тело             | Ответ              |
|--------|--------------------------|------------------|--------------------|
| GET    | `/api/items?seriesId=..` | —                | `200` `ItemDto[]`  |
| POST   | `/api/items`             | `CreateItemDto`  | `201` `ItemDto`    |
| PUT    | `/api/items/{id}`        | `UpdateItemDto`  | `200` `ItemDto` / `404` |
| DELETE | `/api/items/{id}`        | —                | `204` / `404`      |

> POST: найти Series по `SeriesId` (иначе `400`), проставить `item.CollectionId = series.CollectionId`.
> Фото (`ObverseUrl`/`ReverseUrl`) в этой итерации НЕ трогаем — отдельная таска (multipart).

---

## 5. Контрольный список для бэка

- [ ] Миграция: `Collection.CreatedAt`, `Item.IsOwned` + дефолты в сиде.
- [ ] `CollectionDto` (+CreatedAt/SeriesCount/ItemCount), `ItemDto` (+IsOwned) — расширить + поправить проекции.
- [ ] Input-DTO: Create/Update для Collections, Series, Items.
- [ ] Сервисы: Add/Update/Delete + валидация Name (Trim/пусто), вывод CollectionId для Item из Series.
- [ ] Контроллеры: POST/PUT/DELETE + `GET /collections/{id}`.
- [ ] Проверка через Swagger и прогон против фронта.
