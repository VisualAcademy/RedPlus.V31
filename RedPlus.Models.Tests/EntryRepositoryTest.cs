using Dul.Articles;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace EntryApp.Models.Tests
{
    /// <summary>
    /// [!] Test Class: (Arrange -> Act -> Assert) Pattern
    /// 필요한 NuGet 패키지: Install-Package Microsoft.EntityFrameworkCore.InMemory
    /// </summary>
    [TestClass]
    public class EntryRepositoryTest
    {
        [TestMethod]
        public async Task EntryRepositoryAllMethodTest()
        {
            #region [0] DbContextOptions<T> Object Creation and ILoggerFactory Object Creation
            //[0] DbContextOptions<T> Object Creation and ILoggerFactory Object Creation
            var options = new DbContextOptionsBuilder<EntryAppDbContext>()
                .UseInMemoryDatabase(databaseName: $"EntryApp{Guid.NewGuid()}").Options;
            //.UseSqlServer("server=(localdb)\\mssqllocaldb;database=EntryApp;integrated security=true;").Options;

            var serviceProvider = new ServiceCollection().AddLogging().BuildServiceProvider();
            var factory = serviceProvider.GetService<ILoggerFactory>();
            #endregion

            #region [1] AddAsync() Method Test
            //[1] AddAsync() Method Test
            //[1][1] Repository 클래스를 사용하여 저장
            using (var context = new EntryAppDbContext(options))
            {
                context.Database.EnsureCreated(); // 데이터베이스가 만들어져 있는지 확인

                //[A] Arrange: 1번 데이터를 아래 항목으로 저장합니다. 
                var repository = new EntryRepository(context, factory);
                var model = new Entry { Name = "[1] 관리자", Title = "게시판입니다.", Content = "내용입니다." };

                //[B] Act: AddAsync() 메서드 테스트
                await repository.AddAsync(model); // Id: 1
            }
            //[1][2] DbContext 클래스를 통해서 개수 및 레코드 확인 
            using (var context = new EntryAppDbContext(options))
            {
                //[C] Assert: 현재 총 데이터 개수가 1개인 것과, 1번 데이터의 이름이 "[1] 관리자"인지 확인합니다. 
                Assert.AreEqual(1, await context.Entries.CountAsync());

                var model = await context.Entries.Where(n => n.Id == 1).SingleOrDefaultAsync();
                Assert.AreEqual("[1] 관리자", model.Name);
            }
            #endregion

            #region [2] GetAllAsync() Method Test
            //[2] GetAllAsync() Method Test
            using (var context = new EntryAppDbContext(options))
            {
                // 트랜잭션 관련 코드는 InMemoryDatabase 공급자에서는 지원 X
                // using (var transaction = context.Database.BeginTransaction()) { transaction.Commit(); }

                //[A] Arrange
                var repository = new EntryRepository(context, factory);
                var model = new Entry { Name = "[2] 홍길동", Title = "게시판입니다.", Content = "내용입니다." };

                //[B] Act
                await repository.AddAsync(model); // Id: 2
                await repository.AddAsync(new Entry { Name = "[3] 백두산", Title = "게시판입니다." }); // Id: 3
            }
            using (var context = new EntryAppDbContext(options))
            {
                //[C] Assert
                var repository = new EntryRepository(context, factory);
                var models = await repository.GetAllAsync();
                Assert.AreEqual(3, models.Count()); // TotalRecords: 3
            }
            #endregion

            #region [3] GetByIdAsync() Method Test
            //[3] GetByIdAsync() Method Test
            using (var context = new EntryAppDbContext(options))
            {
                var repository = new EntryRepository(context, factory);
                var model = await repository.GetByIdAsync(2);
                Assert.IsTrue(model.Name.Contains("길동"));
                Assert.AreEqual("[2] 홍길동", model.Name);
            }
            #endregion

            #region [4] UpdateAsync() Method Test
            //[4] UpdateAsync() Method Test
            using (var context = new EntryAppDbContext(options))
            {
                var repository = new EntryRepository(context, factory);
                var model = await repository.GetByIdAsync(2); // "[2] 홍길동"

                model.Name = "[2] 임꺽정"; // Modified
                await repository.UpdateAsync(model);

                var updateModel = await repository.GetByIdAsync(2);

                Assert.IsTrue(updateModel.Name.Contains("꺽정"));
                Assert.AreEqual("[2] 임꺽정", updateModel.Name);
                Assert.AreEqual("[2] 임꺽정",
                    (await context.Entries.Where(m => m.Id == 2).SingleOrDefaultAsync())?.Name);
            }
            #endregion

            #region [5] DeleteAsync() Method Test
            //[5] DeleteAsync() Method Test
            using (var context = new EntryAppDbContext(options))
            {
                var repository = new EntryRepository(context, factory);
                await repository.DeleteAsync(2);

                Assert.AreEqual(2, await context.Entries.CountAsync());
                Assert.IsNull(await repository.GetByIdAsync(2));
            }
            #endregion

            #region [6] GetByAsync() Method Test
            //[6] GetByAsync() Method Test
            using (var context = new EntryAppDbContext(options))
            {
                var repository = new EntryRepository(context, factory);

                FilterOptions<long> filter = new FilterOptions<long>() 
                { 
                    PageIndex = 0, PageSize = 1
                }; 
                var entriesSet = await repository.GetByAsync<long>(filter);

                var firstName = entriesSet.Items.FirstOrDefault()?.Name;
                var totalCount = entriesSet.TotalCount;

                Assert.AreEqual("[3] 백두산", firstName);
                Assert.AreEqual(2, totalCount);
            }
            #endregion

            #region [7] PagingAsync() Method Test
            //[7] PagingAsync() Method Test
            using (var context = new EntryAppDbContext(options))
            {
                int pageIndex = 0;
                int pageSize = 1;

                var repository = new EntryRepository(context, factory);
                var entriesSet = await repository.GetAllAsync(pageIndex, pageSize);

                var firstName = entriesSet.Records.FirstOrDefault()?.Name;
                var recordCount = entriesSet.TotalRecords;

                Assert.AreEqual("[3] 백두산", firstName);
                Assert.AreEqual(2, recordCount);
            }
            #endregion
        }
    }
}
