CREATE DATABASE IF NOT EXISTS delivery_management;

USE delivery_management;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,

    full_name VARCHAR(100) NOT NULL,

    email VARCHAR(100) UNIQUE NOT NULL,

    password VARCHAR(255) NOT NULL,

    phone VARCHAR(20),

    role ENUM('customer','delivery_partner','admin')
    DEFAULT 'customer',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);