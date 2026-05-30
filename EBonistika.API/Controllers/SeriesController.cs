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

    [HttpPost]
    public async Task<ActionResult<SeriesDto>> Create([FromBody] CreateSeriesDto dto)
    {
        var series = await seriesService.CreateAsync(dto);
        return series is null ? NotFound() : CreatedAtAction(nameof(GetById), new { id = series.Id }, series);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<SeriesDto>> Update(Guid id, [FromBody] UpdateSeriesDto dto)
    {
        var series = await seriesService.UpdateAsync(id, dto);
        return series is null ? NotFound() : Ok(series);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var deleted = await seriesService.DeleteAsync(id);
        return deleted ? NoContent() : NotFound();
    }
}
