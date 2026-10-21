\# Ma Garderie — DevOps CI/CD Project



A web application for a childcare center, deployed through an automated CI/CD workflow using Jenkins, Docker, Vagrant, and Ansible.



\## Table of Contents



\- \[Project Overview](#project-overview)

\- \[Technologies](#technologies)

\- \[Architecture](#architecture)

\- \[Repository Structure](#repository-structure)

\- \[CI/CD Pipeline](#cicd-pipeline)

\- \[Docker Images](#docker-images)

\- \[Virtual Machine and Infrastructure Provisioning](#virtual-machine-and-infrastructure-provisioning)

\- \[Deployment](#deployment)

\- \[Accessing the Application](#accessing-the-application)

\- \[Verification and Troubleshooting](#verification-and-troubleshooting)

\- \[Screenshots and Evidence](#screenshots-and-evidence)

\- \[Git Workflow](#git-workflow)



\## Project Overview



Ma Garderie is a web application composed of a Next.js frontend and an Express.js backend.



The project demonstrates a DevOps workflow that automates application testing, container image creation, image publication, infrastructure provisioning, and application deployment.



\### Objectives



\- Develop a web application with a separate frontend and backend.

\- Automate frontend testing with Jenkins.

\- Build Docker images for both application components.

\- Publish versioned images to Docker Hub.

\- Provision an Ubuntu virtual machine with Vagrant.

\- Configure the deployment environment with Ansible.

\- Deploy and run the application using Docker Compose.

\- Verify the deployed services through HTTP requests and health checks.



\## Technologies



| Technology | Purpose |

|---|---|

| Next.js | Frontend application |

| React | Frontend user interface |

| Node.js | JavaScript runtime |

| Express.js | Backend API |

| Jest and React Testing Library | Automated frontend testing |

| Git and GitHub | Source control and collaboration |

| Jenkins | CI/CD automation |

| Docker | Application containerization |

| Docker Hub | Container image registry |

| Vagrant | Virtual machine lifecycle management |

| VirtualBox | Virtualization provider |

| Ansible | Infrastructure configuration and provisioning |

| Docker Compose | Multi-container application deployment |

| Ubuntu Server 24.04 LTS | Deployment environment |



\## Architecture



The project uses a frontend/backend architecture.



```text

Developer

&#x20;  |

&#x20;  v

GitHub Repository

&#x20;  |

&#x20;  v

Jenkins CI/CD Pipeline

&#x20;  |

&#x20;  +--> Checkout source code

&#x20;  |

&#x20;  +--> Install dependencies and run tests

&#x20;  |

&#x20;  +--> Build frontend and backend images

&#x20;  |

&#x20;  +--> Push images to Docker Hub

&#x20;               |

&#x20;               v

&#x20;       Docker Hub Registry

&#x20;               |

&#x20;               v

&#x20;     Vagrant Ubuntu VM

&#x20;               |

&#x20;               v

&#x20;        Docker Compose

&#x20;               |

&#x20;         +-----+-----+

&#x20;         |           |

&#x20;         v           v

&#x20;     Frontend      Backend

&#x20;     Next.js       Express.js

&#x20;     Port 3000     Port 3001

&#x20;         |           ^

&#x20;         +-----------+

&#x20;      Internal Docker network

```



\### Application components



\*\*Frontend\*\*



\- Framework: Next.js.

\- Container port: `3000`.

\- Communicates with the backend using the `BACKEND\_URL` environment variable.



\*\*Backend\*\*



\- Framework: Express.js.

\- Container port: `3001`.

\- Provides application API routes and a health endpoint at `/health`.



\*\*Container communication\*\*



The deployment Compose file configures the frontend to reach the backend at:



`http://backend:3001`



The hostname `backend` is resolved through Docker Compose's internal network.



\## Repository Structure



```text

garderie-devops/

├── frontend/

│   ├── app/

│   ├── Dockerfile

│   ├── package.json

│   └── ...

├── backend/

│   ├── src/

│   │   └── server.js

│   ├── Dockerfile

│   └── package.json

├── ansible/

│   └── playbook.yml

├── screenshots/

├── docker-compose.yml

├── docker-compose.deploy.yml

├── Jenkinsfile

├── Vagrantfile

├── .gitignore

└── README.md

```



The local development Compose file builds the application images from the source code. The deployment Compose file pulls the published images from Docker Hub.



\## CI/CD Pipeline



The pipeline is defined in the root-level `Jenkinsfile`.



\### Pipeline stages



1\. \*\*Checkout:\*\* retrieves the application source code from GitHub.

2\. \*\*Test:\*\* installs frontend dependencies and executes the automated frontend test.

3\. \*\*Build:\*\* builds the frontend and backend Docker images.

4\. \*\*Push:\*\* authenticates to Docker Hub using Jenkins credentials and publishes the images.



\### Jenkins configuration



\- Pipeline job: `ma-garderie-pipeline`

\- Source repository: \[FatmaDhouib/garderie-devops](https://github.com/FatmaDhouib/garderie-devops)

\- Branch configured for the pipeline: `main`

\- Pipeline script: `Jenkinsfile`

\- Docker Hub credential ID: `dockerhub-credentials`



The Docker Hub access token is stored in Jenkins credentials rather than hard-coded into the pipeline.



\### Automated testing



The frontend test checks for the expected Ma Garderie navigation link or name.



The pipeline runs the test before building and publishing the Docker images. A failed test should prevent the pipeline from successfully completing the subsequent stages.



\### Image tags



Images are tagged with the Jenkins build number and the `latest` tag:



\- `fatmadhouib/garderie-frontend:<build-number>`

\- `fatmadhouib/garderie-frontend:latest`

\- `fatmadhouib/garderie-backend:<build-number>`

\- `fatmadhouib/garderie-backend:latest`



\## Docker Images



The application images are hosted on Docker Hub.



\- \[Ma Garderie Frontend — Docker Hub](https://hub.docker.com/r/fatmadhouib/garderie-frontend)

\- \[Ma Garderie Backend — Docker Hub](https://hub.docker.com/r/fatmadhouib/garderie-backend)



To pull the latest published images:



```bash

docker pull fatmadhouib/garderie-frontend:latest

docker pull fatmadhouib/garderie-backend:latest

```



These commands require the corresponding image repositories and tags to exist and be accessible.



\## Virtual Machine and Infrastructure Provisioning



\### Virtual machine configuration



The deployment virtual machine is managed by Vagrant and runs on VirtualBox.



| Setting | Value |

|---|---|

| Base box | `bento/ubuntu-24.04` |

| Hostname | `garderie-deploy` |

| Memory | 2 GB |

| CPU | 2 virtual CPUs |

| Private IP | `192.168.56.10` |

| Operating system | Ubuntu Server 24.04 LTS |



\### Start and access the VM



Run these commands from the directory containing the `Vagrantfile`:



```powershell

vagrant validate

vagrant up

vagrant status

vagrant ssh

```



\### Ansible provisioning



The Ansible playbook is located at `ansible/playbook.yml`.



Vagrant installs Ansible inside the guest VM and executes the playbook using the `ansible\_local` provisioner.



The playbook performs the following tasks:



\- Installs prerequisite packages.

\- Installs Python dependencies required by Ansible modules.

\- Configures Docker's official Ubuntu package repository.

\- Installs Docker Engine, Docker CLI, containerd, Buildx, and the Docker Compose plugin.

\- Enables and starts the Docker service.

\- Adds the `vagrant` user to the Docker group.



To rerun provisioning after changing the playbook:



```powershell

vagrant provision

```



To verify Docker inside the VM:



```bash

docker --version

docker compose version

sudo systemctl is-active docker

sudo docker run --rm hello-world

```



\## Deployment



The production deployment configuration is defined in `docker-compose.deploy.yml`.



\### Services



| Service | Docker image | Published port |

|---|---|---|

| Frontend | `fatmadhouib/garderie-frontend:latest` | `3000` |

| Backend | `fatmadhouib/garderie-backend:latest` | `3001` |



The Compose configuration includes restart policies and a backend health check. The frontend waits for the backend health check before starting.



\### Deploy the application



First, ensure that the Docker Hub images have been published successfully and Docker is running inside the VM.



Connect to the VM:



```powershell

vagrant ssh

```



Pull the images:



```bash

sudo docker pull fatmadhouib/garderie-backend:latest

sudo docker pull fatmadhouib/garderie-frontend:latest

```



Start the services using the shared project directory:



```bash

sudo docker compose -f /vagrant/docker-compose.deploy.yml up -d

```



Check the containers:



```bash

sudo docker compose -f /vagrant/docker-compose.deploy.yml ps

```



View logs:



```bash

sudo docker logs garderie-backend --tail 50

sudo docker logs garderie-frontend --tail 50

```



Stop the application:



```bash

sudo docker compose -f /vagrant/docker-compose.deploy.yml down

```



Stopping the application does not delete the Docker images.



\## Accessing the Application



When the VM is running and its private network is reachable from the host:



| Component | URL |

|---|---|

| Frontend | \[http://192.168.56.10:3000](http://192.168.56.10:3000) |

| Backend health check | \[http://192.168.56.10:3001/health](http://192.168.56.10:3001/health) |



The frontend is available on port `3000`. The backend health endpoint should return a successful HTTP response with a JSON status.



Example backend health response:



```json

{

&#x20; "status": "ok"

}

```



\## Verification and Troubleshooting



\### Verify the backend



Inside the VM:



```bash

curl -i http://localhost:3001/health

```



Expected result: HTTP `200 OK` with the health status in JSON format.



\### Verify the frontend



Inside the VM:



```bash

curl -I http://localhost:3000

```



Expected result: HTTP `200 OK` from the Next.js server.



\### Verify Docker containers



```bash

sudo docker ps

sudo docker compose -f /vagrant/docker-compose.deploy.yml ps

```



\### Common issues



\*\*Docker image not found\*\*



Verify that the image was successfully pushed to Docker Hub and that the requested tag exists.



\*\*Docker Hub authentication failure\*\*



Check the Jenkins credential `dockerhub-credentials`. The associated Docker Hub access token must have permission to push images.



\*\*Backend health check fails\*\*



Inspect the backend logs and verify that the `/health` endpoint responds successfully inside the container.



\*\*Frontend cannot reach the backend\*\*



Verify that `BACKEND\_URL` is set to `http://backend:3001` in the deployment Compose file and that both services belong to the same Compose network.



\*\*Application is reachable inside the VM but not from Windows\*\*



Check the VM's private IP address, VirtualBox host-only network configuration, container port bindings, and Windows network connectivity.



\## Screenshots and Evidence



Save genuine screenshots in the `screenshots/` directory to document the practical work.



Recommended evidence:



| Screenshot | Evidence |

![alt text](<test front.png>)
![alt text](<docker compose up.png>)
![alt text](<accessibility check.jpeg>)
![alt text](<jenkins pipeline success.png>)
![alt text](<images pushed to docker hub.png>)
![alt text](<vm creation with vagant success.png>)
![alt text](<provision success.png>)
![alt text](<verification of the installation after provisioning.png>)
![alt text](<deployment success.png>)
![alt text](<app access from provisioned vm.png>)

\## Git Workflow



The project uses feature branches to organize the work.



Examples of branches used for the project:



\- `main`: integrated project.

\- `feature/vagrant`: virtual machine configuration.

\- `feature/deployment`: deployment Compose configuration.

\- `docs/readme`: documentation changes, if used.



Typical Git commands:



```bash

git status

git branch --show-current

git add README.md

git commit -m "docs: document Ma Garderie DevOps deployment"

git push

```



Feature branches should be integrated into `main` after their changes have been reviewed and tested.



\## Project Outcome



This project brings together application development, automated testing, containerization, CI/CD, infrastructure provisioning, and deployment automation.



The final result is a containerized web application whose frontend and backend can be deployed on a Vagrant-managed Ubuntu virtual machine using Docker Compose, with Jenkins automating the testing, image-building, and image-publication stages.

