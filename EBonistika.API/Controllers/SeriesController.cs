using EBonistika.API.Data;
using EBonistika.API.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace EBonistika.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SeriesController : ControllerBase
{
    [HttpGet]
    public ActionResult<IReadOnlyList<SeriesDto>> GetAll([FromQuery] Guid? collectionId)
    {
        var result = collectionId.HasValue
            ? MockSeries.All.Where(s => s.CollectionId == collectionId.Value)
            : MockSeries.All;
        return Ok(result.ToList());
    }

    [HttpGet("{id:guid}")]
    public ActionResult<SeriesDto> GetById(Guid id)
    {
        var series = MockSeries.All.FirstOrDefault(s => s.Id == id);
        return series is null ? NotFound() : Ok(series);
    }
}
