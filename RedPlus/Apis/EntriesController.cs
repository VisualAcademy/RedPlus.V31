using EntryApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EntryApp.Apis.Controllers
{
    [ApiController] // @RestController
    [Route("/api/[controller]")] // [Route("/api/Entries")] // @RequestMapping
    [Produces("application/json")]
    public class EntriesController : ControllerBase
    {
        private readonly IEntryRepository _repository;
        private readonly ILogger _logger;

        public EntriesController(IEntryRepository repository, ILoggerFactory loggerFactory)
        {
            this._repository = repository ?? throw new ArgumentNullException(nameof(EntriesController));
            this._logger = loggerFactory.CreateLogger(nameof(EntriesController));
        }

        #region 시험
        [HttpGet("Test")] // api/Entries/Test
        public IEnumerable<Entry> Get() => Enumerable.Empty<Entry>();  
        #endregion

        #region 입력
        // 입력
        // POST api/Entries
        [HttpPost] // @PostMapping
        public async Task<IActionResult> AddAsync([FromBody] Entry dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            // <>
            var temp = new Entry();
            temp.Name = dto.Name;
            temp.Title = dto.Title;
            temp.Content = dto.Content;
            temp.Created = DateTime.Now;
            // --TODO-- 
            // </>

            try
            {
                var model = await _repository.AddAsync(temp);
                if (model == null)
                {
                    return BadRequest();
                }

                //[!] 다음 항목 중 원하는 방식 사용
                if (DateTime.Now.Second % 60 == 0)
                {
                    return Ok(model); // 200 OK
                }
                else if (DateTime.Now.Second % 3 == 0)
                {
                    return CreatedAtRoute(nameof(GetEntryById), new { id = model.Id }, model); // Status: 201 Created
                }
                else if (DateTime.Now.Second % 2 == 0)
                {
                    var uri = Url.Link(nameof(GetEntryById), new { id = model.Id });
                    return Created(uri, model); // 201 Created
                }
                else
                {
                    // GetById 액션 이름 사용해서 입력된 데이터 반환 
                    return CreatedAtAction(nameof(GetEntryById), new { id = model.Id }, model);
                }
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return BadRequest();
            }
        }
        #endregion

        #region 출력
        // 출력
        // GET api/Entries
        [HttpGet] // [HttpGet("[action]")] // @GetMapping
        public async ValueTask<ActionResult<IEnumerable<Entry>>> GetAll()
        {
            try
            {
                var models = await _repository.GetAllAsync();
                if (!models.Any())
                {
                    return new NoContentResult(); // 참고용 코드
                }
                return new JsonResult(models); //return Ok(models); // 200 OK
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return BadRequest();
            }
        }
        #endregion

        #region 상세
        // 상세
        // GET api/Entries/123
        [HttpGet("{id:int}", Name = nameof(GetEntryById))] // Name 속성으로 RouteName 설정
        public async Task<IActionResult> GetEntryById([FromRoute] int id)
        {
            try
            {
                var model = await _repository.GetByIdAsync(id);
                if (model == null)
                {
                    //return new NoContentResult(); // 204 No Content
                    return NotFound();
                }
                return Ok(model);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return BadRequest();
            }
        }
        #endregion

        #region 수정
        // 수정
        // PUT api/Entries/123
        [HttpPut("{id}")] // @PutMapping
        public async Task<IActionResult> UpdateAsync([FromRoute] long? id, [FromBody] Entry dto)
        {
            if (id is null)
            {
                return NotFound(); 
            }

            if (dto == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            // <>
            var origin = await _repository.GetByIdAsync(id ?? default);
            if (origin != null)
            {
                origin.Name = dto.Name;
                origin.Title = dto.Title;
                origin.Content = dto.Content;
                // --TODO--
            }
            // </>

            try
            {
                origin.Id = id ?? default;
                var status = await _repository.UpdateAsync(origin);
                if (!status)
                {
                    return BadRequest();
                }

                // 204 No Content
                return NoContent(); // 이미 전송된 정보에 모든 값 가지고 있기에...
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return BadRequest();
            }
        }
        #endregion

        #region 삭제
        // 삭제
        // DELETE api/Entries/1
        [HttpDelete("{id:int}")] // @DeleteMapping 
        public async Task<IActionResult> DeleteAsync(int id)
        {
            try
            {
                var status = await _repository.DeleteAsync(id);
                if (!status)
                {
                    return BadRequest();
                }

                return NoContent(); // 204 NoContent
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return BadRequest("삭제할 수 없습니다.");
            }
        }
        #endregion

        #region 검색
        // 페이징
        // GET api/Entries/Page/1/10
        [HttpGet("Page/{pageNumber:int}/{pageSize:int}")]
        public async Task<IActionResult> GetAll(int pageNumber = 1, int pageSize = 10)
        {
            try
            {
                // 페이지 번호는 1, 2, 3 사용, 리포지토리에서는 0, 1, 2 사용
                int pageIndex = (pageNumber > 0) ? pageNumber - 1 : 0;

                var resultSet = await _repository.GetAllAsync(pageIndex, pageSize);
                if (resultSet.Records == null)
                {
                    return NotFound($"아무런 데이터가 없습니다.");
                }

                // 응답 헤더에 총 레코드 수를 담아서 출력
                Response.Headers.Add("X-TotalRecordCount", resultSet.TotalRecords.ToString());
                Response.Headers.Add("Access-Control-Expose-Headers", "X-TotalRecordCount");

                //return Ok(resultSet.Records);
                var ʘ‿ʘ = resultSet.Records; // 재미를 위해서 
                return Ok(ʘ‿ʘ); // Look of Approval
            }
            catch (Exception ಠ_ಠ) // Look of Disapproval
            {
                _logger?.LogError($"ERROR({nameof(GetAll)}): {ಠ_ಠ.Message}");
                return BadRequest();
            }
        }
        // 페이징
        // GET api/Entries/Page/1/10
        [HttpGet("Search/{pageNumber:int}/{pageSize:int}")]
        public async Task<IActionResult> GetAll(int pageNumber = 1, int pageSize = 10, string searchQuery = "")
        {
            try
            {
                // 페이지 번호는 1, 2, 3 사용, 리포지토리에서는 0, 1, 2 사용
                int pageIndex = (pageNumber > 0) ? pageNumber - 1 : 0;

                var resultSet = await _repository.SearchAllAsync(pageIndex, pageSize, searchQuery);
                if (resultSet.Records == null)
                {
                    return NotFound($"아무런 데이터가 없습니다.");
                }

                // 응답 헤더에 총 레코드 수를 담아서 출력
                Response.Headers.Add("X-TotalRecordCount", resultSet.TotalRecords.ToString());
                Response.Headers.Add("Access-Control-Expose-Headers", "X-TotalRecordCount");

                //return Ok(resultSet.Records);
                var ʘ‿ʘ = resultSet.Records; // 재미를 위해서 
                return Ok(ʘ‿ʘ); // Look of Approval
            }
            catch (Exception ಠ_ಠ) // Look of Disapproval
            {
                _logger?.LogError($"ERROR({nameof(GetAll)}): {ಠ_ಠ.Message}");
                return BadRequest();
            }
        }
        #endregion
    }

    // C# 9 레코드 형식으로 모델 바인딩 및 유효성 검사
    // https://docs.microsoft.com/ko-kr/aspnet/core/release-notes/aspnetcore-5.0?view=aspnetcore-5.0#model-binding-and-validation-with-c-9-record-types
    //public record EntryDto(long Id, [Required] string Name, [Required] string Title, string Content);
}
