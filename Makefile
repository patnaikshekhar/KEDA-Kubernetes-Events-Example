build:
	docker build -t patnaikshekhar/keda-kubernetes-events-scaler-node:1.2 .

run: build
	-docker rm -vf keda-kubernetes-events-scaler-node
	docker run --name keda-kubernetes-events-scaler-node \
		patnaikshekhar/keda-kubernetes-events-scaler-node:1.2 

publish: build
	docker push patnaikshekhar/keda-kubernetes-events-scaler-node:1.2
	kubectl apply -f manifests/