
\COPY products(id, name, slogan, description, category, default_price) FROM 'productsList.csv' DELIMITER'|' CSV;

\COPY product_features(product_id, feature, value) FROM 'productfeatures.csv' DELIMITER'|' CSV;

\COPY styles(product_id, style_id, name, original_price, sale_price, "default?") FROM 'styles.csv' DELIMITER'|' CSV;

\COPY style_photos(product_id, style_id, thumbnail_url, url) FROM 'photos.csv' DELIMITER'|' CSV;

\COPY style_skus(product_id, style_id, size, inStock) FROM 'skus.csv' DELIMITER'|' CSV;