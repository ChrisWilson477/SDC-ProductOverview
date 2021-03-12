
-- main product table
DROP TABLE IF EXISTS products;
CREATE TABLE IF NOT EXISTS products (
  id int PRIMARY KEY,
  name varchar(50) NOT NULL,
  slogan varchar(250),
  description varchar(225),
  category varchar(50) NOT NULL,
  default_price  varchar(20) NOT NULL

);

-- product_features table
DROP TABLE IF EXISTS product_features;
CREATE TABLE IF NOT EXISTS product_features (
  product_id int REFERENCES products(id),
  feature varchar(25),
  value varchar(25)
);

-- create a styles table
DROP TABLE IF EXISTS styles;
CREATE TABLE IF NOT EXISTS styles (
  product_id int REFERENCES products(id),
  style_id int,
  name varchar(50) NOT NULL,
  original_price varchar(50) NOT NULL,
  sale_price varchar(50),
  "default?" int
);

--Style Photos
DROP TABLE IF EXISTS style_photos;
CREATE TABLE IF NOT EXISTS style_photos (
  product_id int REFERENCES products(id),
  style_id int,
  thumbnail_url varchar(5000),
  url varchar(5000)
);

--Style Skus
DROP TABLE IF EXISTS style_skus;
CREATE TABLE IF NOT EXISTS style_skus (
  product_id int REFERENCES products(id),
  style_id int,
  size varchar(25),
  instock int
);


\COPY products(id, name, slogan, description, category, default_price) FROM '/home/ubuntu/data/10MproductsList.csv' DELIMITER'|' CSV HEADER;

\COPY product_features(product_id, feature, value) FROM '/home/ubuntu/data/10Mproductfeatures.csv' DELIMITER'|' CSV HEADER;

\COPY styles(product_id, style_id, name, original_price, sale_price, "default?") FROM '/home/ubuntu/data/10Mstyles.csv' DELIMITER'|' CSV HEADER;

\COPY style_photos(product_id, style_id, thumbnail_url, url) FROM '/home/ubuntu/data/10Mphotos.csv' DELIMITER'|' CSV HEADER;

\COPY style_skus(product_id, style_id, size, inStock) FROM '/home/ubuntu/data/10Mskus.csv' DELIMITER'|' CSV HEADER;


CREATE INDEX products_product_id_idx ON products(id);

CREATE INDEX product_features_product_id_idx ON product_features(product_id);

CREATE INDEX styles_product_id_idx ON styles(product_id);

CREATE INDEX styles_photos_product_id_idx ON style_photos(product_id);

CREATE INDEX styles_skus_product_id_idx ON style_skus(product_id);