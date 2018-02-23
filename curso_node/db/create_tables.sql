create table noticias(
  id_noticia int not null primary key auto_increment,
  titulo varchar(100),
  noticia text,
  data_criacao timestamp default current_timestamp
);

insert into noticias(titulo, noticia) values('Titulo da Noticia 2', 'Corpo da noticia 2');

  alter table noticias add column autor varchar(30);
  alter table noticias add column data_noticia date;
  alter table noticias add column resumo varchar(100);