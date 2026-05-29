using EBonistika.API.Dtos;
using EBonistika.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace EBonistika.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CollectionsController(CollectionsService collectionsService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<CollectionDto>>> GetAll() =>
        Ok(await collectionsService.GetAllAsync());

    // TODO (Ваня): добавить эндпоинты CRUD — см. CRUD_CONTRACT.md (раздел 2):
    //   GET    /api/collections/{id}   -> CollectionDto / 404
    //   POST   /api/collections        <- CreateCollectionDto { Name } -> 201 CollectionDto
    //   PUT    /api/collections/{id}   <- UpdateCollectionDto { Name } -> 200 / 404
    //   DELETE /api/collections/{id}   -> 204 / 404  (каскад уже настроен в AppDbContext)
    // Расширить CollectionDto: + CreatedAt, SeriesCount, ItemCount.
}
