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
}
