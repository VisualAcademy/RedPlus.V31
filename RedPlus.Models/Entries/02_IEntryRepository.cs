using Dul.Articles;
using Dul.Domain.Common;
using System.Threading.Tasks;

namespace EntryApp.Models
{
    public interface IEntryRepository : IRepositoryBase<Entry, long, long>
    {
        // PM> Install-Package Dul
        // Empty

        Task<PagingResult<Entry>> GetAllAsync(int pageIndex, int pageSize); // 페이징

        // 검색
        Task<PagingResult<Entry>> SearchAllAsync(
            int pageIndex,
            int pageSize,
            string searchQuery);
    }
}
