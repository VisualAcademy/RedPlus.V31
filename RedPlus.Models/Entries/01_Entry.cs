using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EntryApp.Models
{
    /// <summary>
    /// [!] 기본 클래스: 공통 속성들을 모두 모아 놓은 모델 클래스
    /// MemoBase, ArticleBase, PostBase, EntryBase, ...
    /// Scaffold-DbContext: https://docs.microsoft.com/ko-kr/ef/core/cli/powershell#scaffold-dbcontext
    /// </summary>
    public class EntryBase
    {
        /// <summary>
        /// [1] 일련 번호(Serial Number)
        /// </summary>
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Display(Name = "번호")]
        public long Id { get; set; }

        /// <summary>
        /// [2] 이름(작성자)
        /// </summary>
        [Required(ErrorMessage = "이름을 입력하세요.")]
        [MaxLength(255)]
        [Display(Name = "작성자")]
        [Column(TypeName = "NVarChar(255)")]
        public string Name { get; set; }

        /// <summary>
        /// [3] 제목
        /// </summary>
        [MaxLength(255)]
        [Required(ErrorMessage = "제목을 입력하세요.")]
        [Display(Name = "제목")]
        [Column(TypeName = "NVarChar(255)")]
        public string Title { get; set; }

        /// <summary>
        /// [4] 내용
        /// </summary>
        [Display(Name = "내용")]
        public string Content { get; set; }

        /// <summary>
        /// [5] 등록일(생성일): Created
        /// DateTime? 또는 DateTimeOffset? 
        /// </summary>        
        public DateTime? Created { get; set; }
    }

    /// <summary>
    /// [1] Model Class: Entry 모델 클래스 == Entries 테이블과 일대일로 매핑
    /// Entry, EntryModel, EntryViewModel, EntryDto, EntryEntity, EntryObject, ...
    /// </summary>
    [Table("Entries")]
    public class Entry : EntryBase
    {
        // PM> Install-Package System.ComponentModel.Annotations
        // Empty
    }
}
