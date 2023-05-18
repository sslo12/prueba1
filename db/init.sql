create database proyecto;
use proyecto;

create table usuario( 
id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
tipo_usuario varchar(20) NOT NULL, 
usuario varchar(30) NOT NULL UNIQUE, 
contrasena varchar(30),correo varchar(40),
telefono1 int NOT NULL,
telefono2 int
);
CREATE TABLE nodo (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    direccion VARCHAR(50),
    id_usuario INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id)
);

CREATE TABLE dato (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_nodo INT NOT NULL,
    gas DOUBLE,
    temperatura DOUBLE,
    distancia VARCHAR(25),
    tiempo TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tipo VARCHAR(30),
    FOREIGN KEY (id_nodo) REFERENCES nodo(id)
);

CREATE TABLE alerta (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_nodo INT NOT NULL,
    tiempo TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(20),
    tipo VARCHAR(30),
    FOREIGN KEY (id_nodo) REFERENCES nodo(id)
);

INSERT INTO usuario (tipo_usuario, usuario, contrasena, correo, telefono1, telefono2)
VALUES
  ('admin', 'admin', 'admin123', 'admin@example.com', 5551234, NULL),
  ('ciudadano', 'ciudadano1', 'ciudadano123', 'ciudadano1@example.com', 5552345, 5553456),
  ('bombero', 'bombero1', 'bombero123', 'bombero1@example.com', 5554567, NULL),
  ('ciudadano', 'ciudadano2', 'ciudadano456', 'ciudadano2@example.com', 5555678, 5556789),
  ('bombero', 'bombero2', 'bombero456', 'bombero2@example.com', 5557890, NULL),
  ('bombero', 'bombero3', 'bombero789', 'bombero3@example.com', 5558901, NULL),
  ('admin', 'admin2', 'admin456', 'admin2@example.com', 5559012, NULL),
  ('ciudadano', 'ciudadano3', 'ciudadano789', 'ciudadano3@example.com', 5550123, 5551234),
  ('bombero', 'bombero4', 'bomberoabc', 'bombero4@example.com', 5552345, NULL),
  ('ciudadano', 'ciudadano4', 'ciudadanoabc', 'ciudadano4@example.com', 5553456, 5554567);

INSERT INTO nodo (direccion, id_usuario)
VALUES
  ('Calle 1, Ciudad 1', 1),
  ('Calle 2, Ciudad 2', 2),
  ('Calle 3, Ciudad 3', 3),
  ('Calle 4, Ciudad 4', 4),
  ('Calle 5, Ciudad 5', 5),
  ('Calle 6, Ciudad 6', 6),
  ('Calle 7, Ciudad 7', 7),
  ('Calle 8, Ciudad 8', 8),
  ('Calle 9, Ciudad 9', 9),
  ('Calle 10, Ciudad 10', 10),
  ('Calle 11, Ciudad 11', 1),
  ('Calle 12, Ciudad 12', 2),
  ('Calle 13, Ciudad 13', 3),
  ('Calle 14, Ciudad 14', 4),
  ('Calle 15, Ciudad 15', 5);

INSERT INTO dato (id_nodo, gas, temperatura, distancia, tipo)
VALUES
  (1, 1.2, 24.3, '10.5 cm', 'verde'),
  (1, 2.3, 22.5, '11.2 cm', 'rojo'),
  (2, 1.1, 23.1, '9.8 cm', 'verde'),
  (2, 1.9, 24.8, '10.9 cm', 'amarilla'),
  (3, 1.5, 22.0, '12.1 cm', 'verde'),
  (3, 1.3, 23.5, '11.5 cm', 'rojo'),
  (4, 1.8, 21.7, '9.6 cm', 'amarilla'),
  (4, 2.1, 24.2, '10.3 cm', 'verde'),
  (5, 1.6, 22.8, '12.8 cm', 'amarilla'),
  (5, 1.4, 23.9, '11.7 cm', 'rojo'),
  (6, 1.1, 24.0, '11.4 km', 'verde'),
  (6, 1.7, 21.9, '9.3 km', 'rojo'),
  (7, 1.3, 23.2, '10.6 km', 'verde'),
  (7, 1.9, 24.5, '10.1 km', 'amarilla'),
  (8, 1.2, 22.5, '12.0 km', 'verde'),
  (8, 1.4, 23.8, '10.9 km', 'rojo'),
  (9, 1.8, 22.1, '10.1 km', 'amarilla'),
  (9, 2.0, 24.6, '11.7 km', 'verde'),
  (10, 1.5, 23.3, '9.7 km', 'amarilla'),
  (10, 1.2, 24.1, '11.1 km', 'rojo'),
  (11, 1.1, 23.6, '10.5 km', 'verde'),
  (11, 1.9, 24.3, '11.3 km', 'amarilla'),
  (12, 1.5, 22.2, '10.9 km', 'verde'),
  (12, 1.8, 23.9, '9.8 km', 'rojo'),
  (13, 1.4, 22.8, '12.4 km', 'amarilla'),
  (13, 1.3, 23.7, '11.6 km', 'verde'),
  (14, 1.2, 23.5, '10.2 km', 'rojo'),
  (14, 2.1, 24.7, '11.9 km', 'verde'),
  (15, 1.8, 22.7, '12.6 km', 'amarilla'),
  (15, 1.6, 23.4, '10.4 km', 'verde');

INSERT INTO alerta (id_nodo, estado, tipo)
VALUES
  (1, 'activo', 'rojo'),
  (1, 'inactivo', 'verde'),
  (2, 'activo', 'amarilla'),
  (2, 'inactivo', 'verde'),
  (3, 'activo', 'rojo'),
  (3, 'inactivo', 'amarilla'),
  (4, 'activo', 'verde'),
  (4, 'inactivo', 'rojo'),
  (5, 'activo', 'amarilla'),
  (5, 'inactivo', 'verde'),
  (6, 'activo', 'rojo'),
  (6, 'inactivo', 'verde'),
  (7, 'activo', 'amarilla'),
  (7, 'inactivo', 'verde'),
  (8, 'activo', 'rojo'),
  (8, 'inactivo', 'amarilla'),
  (9, 'activo', 'verde'),
  (9, 'inactivo', 'rojo'),
  (10, 'activo', 'amarilla'),
  (10, 'inactivo', 'verde'),
  (11, 'activo', 'rojo'),
  (11, 'inactivo', 'amarilla'),
  (12, 'activo', 'verde'),
  (12, 'inactivo', 'rojo');



