
COPY products(id, name, slogan, description, category, default_price) FROM '/var/sdc/productsList.csv' DELIMITER'|' CSV;

COPY product_features(product_id, feature, value) FROM '/var/sdc/productfeatures.csv' DELIMITER'|' CSV;

COPY styles(product_id, style_id, name, original_price, sale_price, "default?") FROM '/var/sdc/styles.csv' DELIMITER'|' CSV;

COPY style_photos(product_id, style_id, thumbnail_url, url) FROM '/var/sdc/photos.csv' DELIMITER'|' CSV;

COPY style_skus(product_id, style_id, size, inStock) FROM '/var/sdc/skus.csv' DELIMITER'|' CSV;