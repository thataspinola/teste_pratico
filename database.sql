/*CREATE DATABASE teste;

USE teste;

CREATE TABLE automovel (
	id int not null primary key auto_increment,
	placa varchar(10) not null,
	cor varchar(50) not null,
	marca char(120) not null
)

CREATE TABLE motorista (
	id int not null primary key auto_increment,
	nome varchar(150) not null
)

CREATE TABLE utilizacao (
	id int not null primary key auto_increment,
	data_init datetime not null default CURRENT_TIMESTAMP,
	data_fim datetime not null default CURRENT_TIMESTAMP,
	motorista int not null,
	automovel int not null,
	motivo text not null
)*/