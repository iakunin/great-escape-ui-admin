.PHONY: .deploy .idea .jhipster src webpack

init:
	npm install

run:
	npm start

docker-build:
	docker build .
