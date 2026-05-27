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
}
