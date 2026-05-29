using EBonistika.API.Dtos;
using EBonistika.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace EBonistika.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SeriesController(SeriesService seriesService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<SeriesDto>>> GetAll([FromQuery] Guid? collectionId) =>
        Ok(await seriesService.GetAllAsync(collectionId));

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<SeriesDto>> GetById(Guid id)
    {
        var series = await seriesService.GetByIdAsync(id);
        return series is null ? NotFound() : Ok(series);
    }

    // TODO (Ваня): добавить эндпоинты CRUD — см. CRUD_CONTRACT.md (раздел 3):
    //   POST   /api/series        <- CreateSeriesDto { CollectionId, Name, YearFrom, YearTo } -> 201 SeriesDto
    //   PUT    /api/series/{id}   <- UpdateSeriesDto { Name, YearFrom, YearTo }  (CollectionId менять нельзя) -> 200 / 404
    //   DELETE /api/series/{id}   -> 204 / 404  (каскад на Items уже настроен)
    // CreatedAt ставит бэк; проверить существование CollectionId при POST.
}
