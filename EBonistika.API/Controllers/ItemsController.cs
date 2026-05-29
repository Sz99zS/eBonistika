using EBonistika.API.Dtos;
using EBonistika.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace EBonistika.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ItemsController(ItemsService itemsService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<ItemDto>>> GetAll([FromQuery] Guid? seriesId) =>
        Ok(await itemsService.GetAllAsync(seriesId));

    // TODO (Ваня): добавить эндпоинты CRUD — см. CRUD_CONTRACT.md (раздел 4):
    //   POST   /api/items        <- CreateItemDto (SeriesId + поля, без CollectionId) -> 201 ItemDto
    //   PUT    /api/items/{id}   <- UpdateItemDto (без SeriesId/CollectionId) -> 200 / 404
    //   DELETE /api/items/{id}   -> 204 / 404
    // Расширить ItemDto: + IsOwned. POST: CollectionId взять из Series по SeriesId.
    // Фото (ObverseUrl/ReverseUrl) в этой итерации не трогаем — отдельная таска.
}
