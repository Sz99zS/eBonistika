using EBonistika.API.Data;
using EBonistika.API.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace EBonistika.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CollectionsController : ControllerBase
{
    [HttpGet]
    public ActionResult<IReadOnlyList<CollectionDto>> GetAll() => Ok(MockCollections.All);
}
