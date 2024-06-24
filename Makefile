# Start and Build db & django App
docker-build:
	docker compose up -d db api --build

# Seed DB
docker-seed:
	docker-compose exec api python manage.py loaddata api/fixtures/products.json
	docker-compose exec api python manage.py loaddata api/fixtures/subcategories.json
	docker-compose exec api python manage.py loaddata api/fixtures/subproducts.json

# Start the Express app containerized
docker-start:
	docker-compose up -d client --build

# Stop the Django, React & DB
docker-stop:
	docker-compose down 


# Unit test the app
test-client-docker:
	chmod +x run-jest-tests.sh && ./run-jest-tests.sh

# Unit test the app django
test-api-docker:
	docker-compose run client python manage.py test

# Unit test the client locally
test-client-local:
	yarn run test

# Unit test the backend locally
test-api-local:
	python manage.py test


