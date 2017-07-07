#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE TABLE IF NOT EXISTS account (
        account_id serial PRIMARY KEY,
        name VARCHAR (50) NOT NULL
    );
EOSQL