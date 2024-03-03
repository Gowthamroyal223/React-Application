CREATE TABLE customers (
  sno SERIAL PRIMARY KEY,
  customer_name VARCHAR(100) NOT NULL,
  age INT,
  phone VARCHAR(20),
  location VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO customers (customer_name, age, phone, location)
VALUES
  ('John Doe', 30, '1234567890', 'New York'),
  ('Jane Smith', 25, '0987654321', 'Los Angeles')
;
