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

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<CollectionDto>> GetById(Guid id)
    {
        var collection = await collectionsService.GetByIdAsync(id);
        return collection is null ? NotFound() : Ok(collection);
    }

    [HttpPost]
    public async Task<ActionResult<CollectionDto>> Create([FromBody] CreateCollectionDto dto)
    {
        var collection = await collectionsService.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = collection.Id }, collection);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<CollectionDto>> Update(Guid id, [FromBody] UpdateCollectionDto dto)
    {
        var collection = await collectionsService.UpdateAsync(id, dto);
        return collection is null ? NotFound() : Ok(collection);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var deleted = await collectionsService.DeleteAsync(id);
        return deleted ? NoContent() : NotFound();
    }
}
