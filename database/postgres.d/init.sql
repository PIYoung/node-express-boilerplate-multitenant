SELECT 'CREATE DATABASE my_app_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'my_app_db')\gexec