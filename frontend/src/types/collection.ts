export interface Collection {
  id: string;
  name: string;

  // Заполняются бэком (см. EBonistika.API/CRUD_CONTRACT.md, раздел 2).
  // Опциональны, пока бэк не расширил CollectionDto — UI деградирует мягко.
  createdAt?: string;
  seriesCount?: number;
  itemCount?: number;
}
