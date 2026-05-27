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
}
