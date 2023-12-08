create database docker;
use docker;

create table container(
  id int not null auto_increment,
  loaded int,
  content text,
  primary key (id)
);