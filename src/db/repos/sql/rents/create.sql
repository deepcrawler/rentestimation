CREATE TABLE ${schema~}.rents
(
    apartment_id uuid PRIMARY KEY, 
      zip_code VARCHAR(5) not null, 
      apartment_type VARCHAR(10) not null,
      apartment_size integer not null,
      rent integer not null,
      deleted boolean not null
)