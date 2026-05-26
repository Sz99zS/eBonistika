using EBonistika.API.Data;
using EBonistika.API.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace EBonistika.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ItemsController : ControllerBase
{
    [HttpGet]
    public ActionResult<IReadOnlyList<ItemDto>> GetAll([FromQuery] Guid? seriesId)
    {
        var result = seriesId.HasValue
            ? MockItems.All.Where(i => i.SeriesId == seriesId.Value)
            : MockItems.All;
        return Ok(result.ToList());
    }
}
