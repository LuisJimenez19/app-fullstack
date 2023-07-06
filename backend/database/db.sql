CREATE DATABASE IF NOT EXISTS taskifyDB;
USE taskifyDB;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(50) NOT NULL,
    completed_tasks_count INT DEFAULT 0,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    default_url_id INT DEFAULT 4 NOT NULL,
    FOREIGN KEY (default_url_id) REFERENCES default_url_gravatar (id) ON DELETE SET DEFAULT ON UPDATE CASCADE
) CHARSET=utf8mb4;

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255) NOT NULL,
    done BOOLEAN,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    completed_at DATETIME NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE RESTRICT ON UPDATE CASCADE
) CHARSET=utf8mb4;

CREATE TABLE sites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    alias VARCHAR(50) NOT NULL,
    url VARCHAR(255) NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE RESTRICT ON UPDATE CASCADE
) CHARSET=utf8mb4;

CREATE TABLE default_url_gravatar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    default_url VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(255) NOT NULL
) CHARSET=utf8mb4;

/* Valores para la tabla default_url_gravatar */
INSERT INTO default_url_gravatar (default_url, description)
VALUES
  ('404', 'do not load any image if none is associated with the email hash, instead return an HTTP 404 (File Not Found) response'),
  ('mp', 'a simple, cartoon-style silhouetted outline of a person'),
  ('identicon', 'a geometric pattern based on an email hash'),
  ('monsterid', 'a generated ''monster'' with different colors, faces, etc'),
  ('wavatar', 'generated faces with differing features and backgrounds'),
  ('retro', 'awesome generated, 8-bit arcade-style pixelated faces'),
  ('robohash', 'a generated robot with different colors, faces, etc'),
  ('blank', 'a transparent PNG image (border added to HTML below for demonstration purposes)'),
  ('default-placeholder', 'sin imagen');

/* Primero la entidad catalogo y sus datos */