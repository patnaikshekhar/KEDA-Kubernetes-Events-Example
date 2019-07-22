build:
	docker build -t patnaikshekhar/keda-kubernetes-events-scaler-node:1.1 .

run: build
	-docker rm -vf keda-kubernetes-events-scaler-node
	docker run --name keda-kubernetes-events-scaler-node \
		patnaikshekhar/keda-kubernetes-events-scaler-node:1.1 

publish: build
	docker push patnaikshekhar/keda-kubernetes-events-scaler-node:1.1
	kubectl apply -f manifests/