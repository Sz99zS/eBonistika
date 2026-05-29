import { ApiError } from "@/lib/api-client";

/** Человекочитаемое сообщение об ошибке мутации (для модалок). */
export function mutationErrorMessage(e: unknown): string {
  if (e instanceof ApiError) {
    // Бэк ещё не реализовал CRUD-эндпоинты (см. CRUD_CONTRACT.md) — частый кейс на этой ветке.
    if (e.status === 404 || e.status === 405) {
      return "Эндпоинт ещё не реализован на бэке (CRUD в работе у бэкенда).";
    }
    if (e.status === 400) {
      return "Проверьте поля: данные не прошли валидацию на сервере.";
    }
    return `Ошибка сервера: ${e.status} ${e.statusText}.`;
  }
  return "Не удалось выполнить запрос. Проверьте, запущен ли бэкенд.";
}
