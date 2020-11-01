# eMagnet

## Setup development env
### DB 

1. Start postgress

   ```bash
   docker run --network host -e POSTGRES_PASSWORD=strongpass  postgres
   ```

2. Export postgress connectionn url(on each terminal where you want to develop)

   ```bash
   export DB_URL = postgres://postgres:strongpass@localhost
   ```

3. Create DB structure

   ```bash
   cat db/migrations/*.sql | psql $DB_URL
   ```

4. Add fake DATA

   ```bash
   cat db/fakeData/*.sql | psql $DB_URL
   ```

5. If you want to reset DB:

   ```bash
   cat db/remove.sql | psql $DB_URL
   cat db/migrations/*.sql | psql $DB_URL
   cat db/fakeData/*.sql | psql $DB_URL
   ```

### NextJS
```bash
yarn # To instal
yarn next dev # To run development
yarn next build # To run production build
yarn next start # To start production code
yarn format # To formate code
yarn lint # To run lint
```
