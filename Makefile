.PHONY: check
check: ## Check local enviroment is setup correctly
	@command -v "node" > /dev/null 2>&1 || echo "Couldn't find node"
	@command -v "npm" > /dev/null 2>&1 || echo "Couldn't find npm"

.PHONY: build
build: check ## Install local dependencies
	npm install

.PHONY: run
run: build ## Run website locally
	npm run dev

.PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
