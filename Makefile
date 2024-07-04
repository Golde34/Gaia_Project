gaia:
	cd GAIA && python __main__.py --process

gaia-debug:
	cd GAIA && python __debug__.py

gaia-train-model:
	cd GAIA && python __main__.py --train-model

gaia-kafka:
	cd GAIA && python __main__.py --kafka