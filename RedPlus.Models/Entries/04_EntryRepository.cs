using Dul.Articles;
using Dul.Domain.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EntryApp.Models
{
    /// <summary>
    /// [4] Repository Class: ADO.NET or Dapper(Micro ORM) or Entity Framework Core(ORM)
    /// ~Repository, ~Provider, ~Data
    /// </summary>
    public class EntryRepository : IEntryRepository, IDisposable
    {
        private readonly EntryAppDbContext _context;
        private readonly ILogger _logger;

        public EntryRepository(EntryAppDbContext context, ILoggerFactory loggerFactory)
        {
            this._context = context;
            this._logger = loggerFactory.CreateLogger(nameof(EntryRepository));
        }

        #region [4][1] 입력: AddAsync
        //[4][1] 입력: AddAsync
        public async Task<Entry> AddAsync(Entry model)
        {
            try
            {
                _context.Entries.Add(model);
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                _logger?.LogError($"ERROR({nameof(AddAsync)}): {e.Message}");
            }

            return model;
        }
        #endregion

        #region [4][2] 출력: GetAllAsync
        //[4][2] 출력: GetAllAsync
        public async Task<IEnumerable<Entry>> GetAllAsync()
        {
            // 학습 목적으로... InMemory 데이터베이스에선 사용 금지 
            //return await _context.Entries.FromSqlRaw<Entry>("Select * From dbo.Entries Order By Id Desc") 
            return await _context.Entries.OrderByDescending(m => m.Id)
                //.Include(m => m.EntriesComments)
                .ToListAsync();
        }
        #endregion

        #region [4][3] 상세: GetByIdAsync
        //[4][3] 상세: GetByIdAsync
        public async Task<Entry> GetByIdAsync(long id)
        {
            var model = await _context.Entries
                //.Include(m => m.EntriesComments)
                .SingleOrDefaultAsync(m => m.Id == id);

            return model;
        }
        #endregion

        #region [4][4] 수정: UpdateAsync
        //[4][4] 수정: UpdateAsync
        public async Task<bool> UpdateAsync(Entry model)
        {
            try
            {
                //_context.Entries.Attach(model);
                //_context.Entry(model).State = EntityState.Modified;
                _context.Update(model);
                return (await _context.SaveChangesAsync() > 0 ? true : false);
            }
            catch (Exception e)
            {
                _logger?.LogError($"ERROR({nameof(UpdateAsync)}): {e.Message}");
            }

            return false;
        }
        #endregion

        #region [4][5] 삭제: DeleteAsync
        //[4][5] 삭제
        public async Task<bool> DeleteAsync(long id)
        {
            //var model = await _context.Entries.SingleOrDefaultAsync(m => m.Id == id);
            try
            {
                var model = await _context.Entries.FindAsync(id);
                //_context.Entries.Remove(model);
                _context.Remove(model);
                return (await _context.SaveChangesAsync() > 0 ? true : false);
            }
            catch (Exception ಠ_ಠ) // Disapproval Look
            {
                _logger?.LogError($"ERROR({nameof(DeleteAsync)}): {ಠ_ಠ.Message}");
            }

            return false;
        }
        #endregion

        #region [4][6] 검색: GetByAsync()
        //[4][6] 검색: GetByAsync()
        public async Task<ArticleSet<Entry, long>> GetByAsync<TParentIdentifier>(
            FilterOptions<TParentIdentifier> options)
        {
            //var items = from m in _context.Entries select m; // 쿼리 구문(Query Syntax)
            //var items = _context.Entries.Select(m => m); // 메서드 구문(Method Syntax)
            var items = _context.Entries.AsQueryable();

            #region ParentBy: 특정 부모 키 값(int, string)에 해당하는 리스트인지 확인
            if (options.ChildMode)
            {
                // ParentBy 
                if (options.ParentIdentifier is int parentId && parentId != 0)
                {
                    //items = items.Where(m => m.ParentId == parentId);
                }
                else if (options.ParentIdentifier is string parentKey && !string.IsNullOrEmpty(parentKey))
                {
                    //items = items.Where(m => m.ParentKey == parentKey);
                }
            }
            #endregion

            #region Search Mode: SearchField와 SearchQuery에 해당하는 데이터 검색
            if (options.SearchMode)
            {
                // Search Mode
                if (!string.IsNullOrEmpty(options.SearchQuery))
                {
                    if (options.SearchField == "Name")
                    {
                        // Name
                        items = items.Where(m => m.Name.Contains(options.SearchQuery));
                    }
                    else if (options.SearchField == "Title")
                    {
                        // Title
                        items = items.Where(m => m.Title.Contains(options.SearchQuery));
                    }
                    else if (options.SearchField == "Content")
                    {
                        // Title
                        items = items.Where(m => m.Content.Contains(options.SearchQuery));
                    }
                    else
                    {
                        // All: 기타 더 검색이 필요한 컬럼이 있다면 추가 가능
                        items = items.Where(m => m.Name.Contains(options.SearchQuery) || m.Title.Contains(options.SearchQuery) || m.Content.Contains(options.SearchQuery));
                    }
                }
            }
            #endregion

            // 총 레코드 수 계산
            var totalCount = await items.CountAsync();

            #region Sorting: 어떤 열에 대해 정렬(None, Asc, Desc)할 것인지 원하는 문자열로 지정
            if (options.SortMode && options.SortFields != null)
            {
                // Sorting
                foreach (var sf in options.SortFields)
                {
                    switch ($"{sf.Key}{sf.Value}")
                    {
                        case "NameAsc":
                            items = items.OrderBy(m => m.Name);
                            break;
                        case "NameDesc":
                            items = items.OrderByDescending(m => m.Name);
                            break;
                        case "TitleAsc":
                            items = items.OrderBy(m => m.Title);
                            break;
                        case "TitleDesc":
                            items = items.OrderByDescending(m => m.Title);
                            break;
                        default:
                            items = items.OrderByDescending(m => m.Id); 
                            break;
                    }
                }
            }
            else
            {
                items = items.OrderByDescending(m => m.Id); 
            }
            #endregion

            // Paging
            items = items.Skip(options.PageIndex * options.PageSize).Take(options.PageSize);
            
            return new ArticleSet<Entry, long>(await items.ToListAsync(), totalCount);
        }
        #endregion

        #region [4][7] 페이징: PagingAsync()
        //[4][7] 페이징: PagingAsync()
        public async Task<PagingResult<Entry>> GetAllAsync(int pageIndex, int pageSize)
        {
            var totalRecords = await _context.Entries.CountAsync();
            var models = await _context.Entries
                .OrderByDescending(m => m.Id)
                //.Include(m => m.EntriesComments)
                .Skip(pageIndex * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PagingResult<Entry>(models, totalRecords);
        }
        #endregion

        #region Dispose
        // https://docs.microsoft.com/ko-kr/dotnet/api/system.gc.suppressfinalize?view=net-5.0
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (_context != null)
                {
                    _context.Dispose(); //_context = null;
                }
            }
        }
        #endregion
    }

    public class EntryRepositoryAdoNet
    { 
        // Empty    
    }

    public class EntryRepositoryDapper
    {
        // Empty
    }
}
