--[1] Table: Entries(게시판) 테이블(기본형 게시판)
Create Table Entries (
    Id BigInt Not Null Primary Key Identity(1, 1),  --[1] 번호 
    Name NVarChar(25) Not Null,                     --[2] 이름
    Title NVarChar(150) Not Null,                   --[3] 제목
    Content NVarChar(Max) Not Null,                 --[4] 내용
    Created DateTime Null Default(GetDate())        --[5] 날짜
);
