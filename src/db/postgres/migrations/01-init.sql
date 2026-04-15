CREATE TABLE IF NOT EXISTS users(
    ID UUID PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE ,
    password VARCHAR(100) NOT NULL
);

CREATE TYPE transaction_type AS  ENUM ('expense','earning','investment');

CREATE TABLE IF NOT EXISTS transactions(
ID UUID PRIMARY KEY,
user_id UUID references users(ID) ON DELETE CASCADE NOT NULL,
amount DECIMAL(10, 2) NOT NULL,
name VARCHAR(100) NOT NULL,
date  DATE NOT NULL,
type transaction_type NOT NULL
);


