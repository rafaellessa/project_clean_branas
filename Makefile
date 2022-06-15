#!/usr/bin/make -f
.SILENT:
.PHONY: help build up uplog down ssh clean freespace

## Colors
COLOR_RESET   = \033[0m
COLOR_INFO    = \033[32m
COLOR_COMMENT = \033[33m

## Exibe as instruções de uso.
help:
	printf "${COLOR_COMMENT}Uso:${COLOR_RESET}\n"
	printf " make [comando]\n\n"
	printf "${COLOR_COMMENT}Comandos disponíveis:${COLOR_RESET}\n"
	awk '/^[a-zA-Z\-\_0-9\.@]+:/ { \
		helpMessage = match(lastLine, /^## (.*)/); \
		if (helpMessage) { \
			helpCommand = substr($$1, 0, index($$1, ":")); \
			helpMessage = substr(lastLine, RSTART + 3, RLENGTH); \
			printf " ${COLOR_INFO}%-16s${COLOR_RESET} %s\n", helpCommand, helpMessage; \
		} \
	} \
	{ lastLine = $$0 }' $(MAKEFILE_LIST)

## Constroi a imagem.
build:
	@echo 🐳👔 Construindo as imagens.
	docker-compose build

## Conecta-se ao container node.
ssh:
	docker exec clean-api bash

## Exibe os logs da aplicação.
logs: 
	docker-compose logs -f

## Executa os testes da aplicação.
test:
	@echo ► Executando testes
	docker exec clean-api yarn jest --watch-all
