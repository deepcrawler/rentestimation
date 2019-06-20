INSERT INTO ${schema~}.rents(apartment_id, 
                    zip_code, 
                    apartment_type,
                    apartment_size,
                    rent,
                    deleted)
VALUES($1,$2,$3,$4,$5,$6)
ON CONFLICT(apartment_id) 
DO UPDATE set deleted=EXCLUDED.deleted
