# Deploy to IBM Cloud Kubernetes Service

Follow these instructions to deploy this application to a Kubernetes cluster and connect it with a Cloudant database.

## Download

```bash
git clone https://github.com/RaGaVeRa/ragavera-web-app
cd ragavera-web-app
```

## Build Docker Image

1. Find your container registry **namespace** by running `ibmcloud cr namespaces`. If you don't have any, create one using `ibmcloud cr namespace-add <name>`

2. Identify your **Container Registry** by running `ibmcloud cr info` (Ex: registry.ng.bluemix.net)

3. Build and tag (`-t`)the docker image by running the command below replacing REGISTRY and NAMESPACE with he appropriate values.

   ```sh
   docker build . -t <REGISTRY>/<NAMESPACE>/ragavera-web-app:v1.0.0
   ```
   Example: `docker build . -t au.icr.io/ragavera/ragavera-web-app:v1.0.0`

4. Push the docker image to your Container Registry on IBM Cloud

   ```sh
   docker push <REGISTRY>/<NAMESPACE>/ragavera-web-app:v1.0.0
   ```

## Deploy

#### Create a Kubernetes cluster

1. [Creating a Kubernetes cluster in IBM Cloud](https://console.bluemix.net/docs/containers/container_index.html#clusters).
2. Follow the instructions in the Access tab to set up your `kubectl` cli.

#### Create a Cloudant Database 

1. Go to the [Catalog](https://console.bluemix.net/catalog/) and create a new [Cloudant](https://console.bluemix.net/catalog/services/cloudant-nosql-db) database instance.

2. Choose `Legacy and IAM` for **Authentication**

3. Create new credentials under **Service Credentials** and copy value of the **url** field.

4. Create a Kubernetes secret with your Cloudant credentials.

```bash
kubectl create secret generic cloudant --from-literal=url=<URL>
```
Example:
```bash
kubectl create secret generic cloudant --from-literal=url=https://username:passw0rdf@username-bluemix.cloudantnosqldb.appdomain.cloud
```

#### Create the deployment

1. Replace `<REGISTRY>` and `<NAMESPACE>` with the appropriate values in `kubernetes/deployment.yaml`
2. Create a deployment:
  ```shell
  kubectl create -f deployment.yaml
  ```
- **Paid Cluster**: Expose the service using an External IP and Loadbalancer
  ```
  kubectl expose deployment ragavera-web-app --type LoadBalancer --port 8080 --target-port 8080
  ```

- **Free Cluster**: Use the Worker IP and NodePort
  ```bash
  kubectl expose deployment ragavera-web-app --type NodePort --port 8080 --target-port 8080
  ```

### Access the application

Verify **STATUS** of pod is `RUNNING`

```shell
kubectl get pods -l app=ragavera-web-app
```

**Standard (Paid) Cluster:**

1. Identify your LoadBalancer Ingress IP using `kubectl get service ragavera-web-app`
2. Access your application at t `http://<EXTERNAL-IP>:8080/`

**Free Cluster:**

1. Identify your Worker Public IP using `ibmcloud cs workers YOUR_CLUSTER_NAME`
2. Identify the Node Port using `kubectl describe service ragavera-web-app`
3. Access your application at `http://<WORKER-PUBLIC-IP>:<NODE-PORT>/`


## Clean Up
```bash
kubectl delete deployment,service -l app=ragavera-web-app
kubectl delete secret cloudant
```
