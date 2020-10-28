CREATE DATABASE stock;
USE stock;

CREATE TABLE IF NOT EXISTS item(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name TEXT,
    barcode INT,
    price DECIMAL(15, 2)
);

CREATE TABLE IF NOT EXISTS branch(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name TEXT,
    address TEXT
);

CREATE TABLE IF NOT EXISTS item_branch(
	id_item INT NOT NULL,
	id_branch INT NOT NULL,
    lot INT DEFAULT 0,
    FOREIGN KEY (id_item) REFERENCES item(id),
    FOREIGN KEY (id_branch) REFERENCES branch(id)
);

CREATE TABLE users (
	id_user INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user TEXT,
    password TEXT
)