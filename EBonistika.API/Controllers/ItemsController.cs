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

    [HttpPost]
    public async Task<ActionResult<ItemDto>> Create([FromBody] CreateItemDto dto)
    {
        var item = await itemsService.CreateAsync(dto);
        return item is null ? NotFound() : CreatedAtAction(nameof(GetAll), new { seriesId = item.SeriesId }, item);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<ItemDto>> Update(Guid id, [FromBody] UpdateItemDto dto)
    {
        var item = await itemsService.UpdateAsync(id, dto);
        return item is null ? NotFound() : Ok(item);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var deleted = await itemsService.DeleteAsync(id);
        return deleted ? NoContent() : NotFound();
    }
}
