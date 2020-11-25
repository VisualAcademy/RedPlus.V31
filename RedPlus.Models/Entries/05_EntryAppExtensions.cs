using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace EntryApp.Models
{
    /// <summary>
    /// 게시판앱(EntryApp) 관련 의존성(종속성) 주입 관련 코드만 따로 모아서 관리 
    /// </summary>
    public static class EntryAppExtensions
    {
        public static void AddDependencyInjectionContainerForEntryApp(this IServiceCollection services, IConfiguration configuration)
        {
            // EntryAppDbContext.cs Inject: New DbContext Add
            services.AddDbContext<EntryAppDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")), ServiceLifetime.Transient);

            // IEntryRepository.cs Inject: DI Container에 서비스(리포지토리) 등록 
            services.AddTransient<IEntryRepository, EntryRepository>();
        }
        public static void AddDependencyInjectionContainerForEntryApp(this IServiceCollection services, string connectionString)
        {
            // EntryAppDbContext.cs Inject: New DbContext Add
            services.AddDbContext<EntryAppDbContext>(options =>
                options.UseSqlServer(connectionString), ServiceLifetime.Transient);

            // IEntryRepository.cs Inject: DI Container에 서비스(리포지토리) 등록 
            services.AddTransient<IEntryRepository, EntryRepository>();
        }
    }
}
