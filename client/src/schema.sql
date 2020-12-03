DROP DATABASE IF EXISTS greenfield;

CREATE DATABASE greenfield;

USE greenfield;


-- main product table

DROP TABLE IF EXISTS products;

CREATE TABLE IF NOT EXISTS products (
  product_id int NOT NULL unsigned AUTO_INCREMENT UNIQUE PRIMARY KEY,
  product_name varchar(50) NOT NULL,
  slogan varchar(50),
  description varchar(225),
  default_price  varchar(10) NOT NULL,
  feature_id int FOREIGN KEY REFERENCES product_feature (product_feature_id)
);



-- create a product_feature join table

DROP TABLE IF EXISTS product_feature;

CREATE TABLE IF NOT EXISTS product_feature (
  product_feature_id int NOT NULL unsigned AUTO_INCREMENT UNIQUE PRIMARY KEY,
  product_id  int NOT NULL unsigned  FOREIGN KEY REFERENCES products(product_id) ,
  feature varchar(30),
  value varchar(30)
);


-- create a styles table

DROP TABLE IF EXISTS styles;

CREATE TABLE IF NOT EXISTS styles (
  style_id int NOT NULL unsigned AUTO_INCREMENT UNIQUE PRIMARY KEY,
  product_id int NOT NULL unsigned FOREIGN KEY REFERENCES products(product_id)
  style_name varchar(50) NOT NULL,
  original_price  varchar(15) NOT NULL,
  sale_price varchar(15) NOT NULL,
  default  BOOLEAN  NOT NULL unsigned,
  photo_id int FOREIGN KEY REFERENCES photos(photo_id),
  sku_id int FOREIGN KEY REFERENCES skus(sku_id)
);

-- create photos join table

DROP TABLE IF EXISTS style_photos;

CREATE TABLE IF NOT EXISTS style_photos (
  photo_id int NOT NULL unsigned AUTO_INCREMENT UNIQUE PRIMARY KEY,
  product_id  int NOT NULL unsigned  FOREIGN KEY REFERENCES products(product_id) ,
  thumbnail_url varchar(225),
  photo_url varchar(225)
);


-- create a skus join table

DROP TABLE IF EXISTS style_skus;

CREATE TABLE IF NOT EXISTS style_skus (
  sku_id int NOT NULL unsigned AUTO_INCREMENT UNIQUE PRIMARY KEY,
  product_id  int NOT NULL unsigned  FOREIGN KEY REFERENCES products(product_id),
  XS int unsigned,
  S int unsigned,
  M int unsigned,
  L int unsigned,
  XL int unsigned,
  size_7 int unsigned,
  size_7_5 int unsigned,
  size_8 int unsigned,
  size_8_5 int unsigned,
  size_9 int unsigned,
  size_9_5 int unsigned,
  size_10 int unsigned,
  size_10_5 int unsigned,
  size_11 int unsigned,
  size_11_5 int unsigned,
  size_12 int unsigned
);


-- create cart table

DROP TABLE IF EXISTS cart;

CREATE TABLE IF NOT EXISTS cart (
  cart_id int NOT NULL unsigned AUTO_INCREMENT UNIQUE PRIMARY KEY,
  user_session int NOT NULL unsigned,
  product_id int NOT NULL unsigned  FOREIGN KEY REFERENCES products(product_id),
  active BOOLEAN NOT NULL unsigned
);


-- create product rating meta join table to incorporate reviews

DROP TABLE IF EXISTS product_rating_meta;

CREATE TABLE IF NOT EXISTS cart (
  meta_id int NOT NULL unsigned AUTO_INCREMENT UNIQUE PRIMARY KEY,
  product_id int NOT NULL unsigned  FOREIGN KEY REFERENCES products(product_id),
  one_star int NOT NULL unsigned,
  two_star int NOT NULL unsigned,
  three_star int NOT NULL unsigned,
  four_star int NOT NULL unsigned,
  five_star int NOT NULL unsigned
);