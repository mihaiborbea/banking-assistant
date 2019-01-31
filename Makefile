start:
		bash ./tasks/start.sh

build:
		bash ./tasks/build.sh

deploy:
		bash ./tasks/deploy.sh

build-deploy:
		bash ./tasks/env.sh
		make -s build
		make -s deploy