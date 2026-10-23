# # Ma Garderie — DevOps CI/CD Project 

A web application for a childcare center, deployed through an automated CI/CD workflow using Jenkins, Docker, Vagrant, and Ansible. 

# ## Table of Contents 

- [Project Overview](#project-overview) 

- [Technologies](#technologies) 

- [Architecture](#architecture) 

- [Repository Structure](#repository-structure) 

- [CI/CD Pipeline](#cicd-pipeline) 

- [Docker Images](#docker-images) 

- [Virtual Machine and Infrastructure Provisioning](#virtual-machine-and-infrastructureprovisioning) 

- [Deployment](#deployment) 

- [Accessing the Application](#accessing-the-application) 

- [Verification and Troubleshooting](#verification-and-troubleshooting) 

- [Screenshots and Evidence](#screenshots-and-evidence) 

- [Git Workflow](#git-workflow) 

- ## Project Overview 

Ma Garderie is a web application composed of a Next.js frontend and an Express.js backend. 

The project demonstrates a DevOps workflow that automates application testing, container image creation, image publication, infrastructure provisioning, and application deployment. 

# ### Objectives 

- Develop a web application with a separate frontend and backend. 

- Automate frontend testing with Jenkins. 

- Build Docker images for both application components. 

- Publish versioned images to Docker Hub. 

- Provision an Ubuntu virtual machine with Vagrant. 

- Configure the deployment environment with Ansible. 

- Deploy and run the application using Docker Compose. 

- Verify the deployed services through HTTP requests and health checks. 

- ## Technologies 

- | Technology | Purpose | 

- |---|---| 

- | Next.js | Frontend application | | React | Frontend user interface | | Node.js | JavaScript runtime | | Express.js | Backend API | | Jest and React Testing Library | Automated frontend testing | 

- | Git and GitHub | Source control and collaboration | 

- | Jenkins | CI/CD automation | | Docker | Application containerization | | Docker Hub | Container image registry | | Vagrant | Virtual machine lifecycle management | 

- | VirtualBox | Virtualization provider | 

- | Ansible | Infrastructure configuration and provisioning | 

- | Docker Compose | Multi-container application deployment | 

- | Ubuntu Server 24.04 LTS | Deployment environment | 

## Architecture 

The project uses a frontend/backend architecture. 

```
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
```

|`&#x20;`|`|`||
|---|---|---|
|`&#x20;`|`v`||
|`&#x20;`|`Docker Hub`|`Registry`|
|`&#x20;`|`|`||
|`&#x20;`|`v`||
|`&#x20;`|`Vagrant Ubunt`|`u VM`|
|`&#x20;`|`|`||
|`&#x20;`|`v`||
|`&#x20;`|`Docker Com`|`pose`|
|`&#x20;`|`|`||
|`&#x20;`|`+-----+--`|`---+`|
|`&#x20;`|`|`|`|`|
|`&#x20;`|`v`|`v`|
|`&#x20;`|`Frontend`|`Backend`|
|`&#x20;`|`Next.js`|`Express.js`|
|`&#x20;`|`Port 3000`|`Port 3001`|
|`&#x20;`|`|`|`^`|
|`&#x20;`|`+--------`|`---+`|
|`&#x20;`|`Internal Doc`|`ker network`|



### Application components 

**Frontend** 

- Framework: Next.js. 

- Container port: `3000` . 

- Communicates with the backend using the `BACKEND\_URL` environment variable. 

- **Backend** 

- Framework: Express.js. 

- Container port: `3001` . 

- Provides application API routes and a health endpoint at `/health` . 

- **Container communication** 

The deployment Compose file configures the frontend to reach the backend at: 

```
http://backend:3001
```

The hostname `backend` is resolved through Docker Compose's internal network. 

## Repository Structure 

```
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

## CI/CD Pipeline 

The pipeline is defined in the root-level `Jenkinsfile` . 

### Pipeline stages 

1. **Checkout:** retrieves the application source code from GitHub. 

2. **Test:** installs frontend dependencies and executes the automated frontend test. 

3. **Build:** builds the frontend and backend Docker images. 

4. **Push:** authenticates to Docker Hub using Jenkins credentials and publishes the images. 

### Jenkins configuration 

- Pipeline job: `ma-garderie-pipeline` 

- Source repository: [FatmaDhouib/garderie-devops](https://github.com/FatmaDhouib/garderie- <u>devops)</u> 

- Branch configured for the pipeline: `main` 

- Pipeline script: `Jenkinsfile` 

- Docker Hub credential ID: `dockerhub-credentials` 

The Docker Hub access token is stored in Jenkins credentials rather than hard-coded into the pipeline. 

### Automated testing 

The frontend test checks for the expected Ma Garderie navigation link or name. 

The pipeline runs the test before building and publishing the Docker images. A failed test should prevent the pipeline from successfully completing the subsequent stages. 

### Image tags 

Images are tagged with the Jenkins build number and the `latest` tag: 

- `fatmadhouib/garderie-frontend:<build-number>` 

- `fatmadhouib/garderie-frontend:latest` 

- `fatmadhouib/garderie-backend:<build-number>` 

- `fatmadhouib/garderie-backend:latest` 

- ## Docker Images 

The application images are hosted on Docker Hub. 

- [Ma Garderie Frontend — Docker Hub](https://hub.docker.com/r/fatmadhouib/garderie-frontend) 

- [Ma Garderie Backend — Docker Hub](https://hub.docker.com/r/fatmadhouib/garderie-backend) 

To pull the latest published images: 

```
docker pull fatmadhouib/garderie-frontend:latest
```

```
docker pull fatmadhouib/garderie-backend:latest
```

These commands require the corresponding image repositories and tags to exist and be accessible. 

## Virtual Machine and Infrastructure Provisioning 

### Virtual machine configuration 

The deployment virtual machine is managed by Vagrant and runs on VirtualBox. 

- | Setting | Value | 

- |---|---| 

- | Base box | `bento/ubuntu-24.04` | 

- | Hostname | `garderie-deploy` | 

- | Memory | 2 GB | 

- | CPU | 2 virtual CPUs | | Private IP | `192.168.56.10` | 

- | Operating system | Ubuntu Server 24.04 LTS | 

### Start and access the VM 

Run these commands from the directory containing the `Vagrantfile` : 

```
vagrant validate
vagrant up
vagrant status
vagrant ssh
```

# ### Ansible provisioning 

The Ansible playbook is located at `ansible/playbook.yml` . 

Vagrant installs Ansible inside the guest VM and executes the playbook using the `ansible\_local` provisioner. 

The playbook performs the following tasks: 

- Installs prerequisite packages. 

- Installs Python dependencies required by Ansible modules. 

- Configures Docker's official Ubuntu package repository. 

- Installs Docker Engine, Docker CLI, containerd, Buildx, and the Docker Compose plugin. 

- Enables and starts the Docker service. 

- Adds the `vagrant` user to the Docker group. 

To rerun provisioning after changing the playbook: 

```
vagrant provision
```

To verify Docker inside the VM: 

```
docker --version
docker compose version
sudo systemctl is-active docker
sudo docker run --rm hello-world
```

# ## Deployment 

The production deployment configuration is defined in `docker-compose.deploy.yml` . 

# ### Services 

| Service | Docker image | Published port | 

|---|---|---| 

| Frontend | `fatmadhouib/garderie-frontend:latest` | `3000` | 

| Backend | `fatmadhouib/garderie-backend:latest` | `3001` | 

The Compose configuration includes restart policies and a backend health check. The frontend waits for the backend health check before starting. 

# ### Deploy the application 

First, ensure that the Docker Hub images have been published successfully and Docker is running inside the VM. 

Connect to the VM: 

```
vagrant ssh
```

Pull the images: 

```
sudo docker pull fatmadhouib/garderie-backend:latest
sudo docker pull fatmadhouib/garderie-frontend:latest
```

Start the services using the shared project directory: 

```
sudo docker compose -f /vagrant/docker-compose.deploy.yml up -d
```

Check the containers: 

```
sudo docker compose -f /vagrant/docker-compose.deploy.yml ps
```

View logs: 

```
sudo docker logs garderie-backend --tail 50
sudo docker logs garderie-frontend --tail 50
```

Stop the application: 

```
sudo docker compose -f /vagrant/docker-compose.deploy.yml down
```

Stopping the application does not delete the Docker images. 

## Accessing the Application 

When the VM is running and its private network is reachable from the host: 

| Component | URL | |---|---| 

| Frontend | [http://192.168.56.10:3000](http://192.168.56.10:3000) | 

| Backend health check | [http://192.168.56.10:3001/health](http://192.168.56.10:3001/health) | 

The frontend is available on port `3000` . The backend health endpoint should return a successful HTTP response with a JSON status. 

Example backend health response: 

```
{
&#x20; "status": "ok"
}
```

## Verification and Troubleshooting ### Verify the backend 

Inside the VM: 

```
curl -i http://localhost:3001/health
```

Expected result: HTTP `200 OK` with the health status in JSON format. ### Verify the frontend 

Inside the VM: 

```
curl -I http://localhost:3000
```

Expected result: HTTP `200 OK` from the Next.js server. 

### Verify Docker containers 

```
sudo docker ps
sudo docker compose -f /vagrant/docker-compose.deploy.yml ps
```

### Common issues 

**Docker image not found** 

Verify that the image was successfully pushed to Docker Hub and that the requested tag exists. 

**Docker Hub authentication failure** 

Check the Jenkins credential `dockerhub-credentials` . The associated Docker Hub access token must have permission to push images. 

**Backend health check fails** 

Inspect the backend logs and verify that the `/health` endpoint responds successfully inside the container. 

**Frontend cannot reach the backend** 

Verify that `BACKEND\_URL` is set to `http://backend:3001` in the deployment Compose file and that both services belong to the same Compose network. 

**Application is reachable inside the VM but not from Windows** 

Check the VM's private IP address, VirtualBox host-only network configuration, container port bindings, and Windows network connectivity. 

## Screenshots and Evidence 

Save genuine screenshots in the `screenshots/` directory to document the practical work. 

Recommended evidence: 

- | Screenshot | Evidence | 



<!-- Start of picture text -->
:~/garderie-devops/garderie-devops/frontend$ npm test<br>> frontend@O.1.0 test<br>> jest --runInBand<br>page.test.js<br>Ma Garderie frontend<br>Test Suites: , 1 total<br>Tests: , 1 total<br>Snapshots: © total<br>Time: 2.141 s<br><!-- End of picture text -->

@ MyDaycare 

Home Our Services Activities Contact 

Welcome to My Daycare Growing, learning and thriving together 



<!-- Start of picture text -->
| “*.<br>* 2<br>|<br>Ves<br><!-- End of picture text -->



<!-- Start of picture text -->
Services designed for your children<br>vl e *<br>‘Awakening and learning Balanced meals Games and creativity<br>Our activities<br><!-- End of picture text -->



<!-- Start of picture text -->
Let's talk about your child's future<br><!-- End of picture text -->

:~/garderie— »ps/garderie— »ps$ docker compose up —d [+] up 3/3 Network garderie-devops_garderie-network Container garderie—devops-—backend-1 Container garderie-devops-frontend-1 :~/garderie-devops/garderie-devops$ docker compose ps NAME IMAGE COMMAND SERVICE CREATED STATUS PORT s garderie—devops-backend-1 garderie-backend: local "docker-entryp oint.s.." backend 15 seconds ago Up 15 seconds (healthy) 3001 /tcp garderie-devops-frontend-1 garderie-frontend: local "docker-entryp oint.s..." frontend 15 seconds ago Up 9 seconds 0.0. ©.0:3000->3000/tcp, [::]:3000->3000/tcp a ma-garderie-pipeline #3 Vv Q 3 © [Pipeline]// withCredentials [Pipeline] } [Pipeline] // stage [Pipeline] stage [Pipeline] { (Declarative: Post Actions) [Pipeline] sh 16:41:41 + docker logout [Pipeline] echo 16:41:41 CI/CD pipeline succeeded: tests passed and images were published. [Pipeline] } [Pipeline]// stage [Pipeline] } [Pipeline]// timeout [Pipeline] } [Pipeline] // timestamps [Pipeline] } [Pipeline] // withEn [Pipeline] } [Pipeline] // withEnv [Pipeline] } [Pipeline] // node [Pipeline] End of Pipeline Finished: SUCCESS 



<!-- Start of picture text -->
Repositorie Starred<br>Q Displaying 1 to 11 of 11 repositories<br>5) fatmadhouib/garderie-backendfatmadhouit<br>e Im v 0<br>5) fatmadhouib/garderie-frontendfatmadhouib<br>fae =<br><!-- End of picture text -->

PS C:\Users\HP\Desktop\garderie-devops> vagrant status Current machine states: 

default running (virtualbox) The VM is running. To stop this VM, you can run ‘vagrant halt* to shut it down forcefully, or you can run ‘vagrant suspend’ to simply suspend the virtual machine. In either case, to restart it again, simply run ‘vagrant up’. PS C:\Users\HP\Desktop\garderie-devops> vagrant ssh Welcome to Ubuntu 24.04.3 LTS (GNU/Linux 6.8.0-86-generic x86_64) 

* Documentation: https://help.ubuntu.com * Management: https: //Landscape.canonical.com * Support: https: //ubuntu.com/pro 

System information as of Wed Oct 21 10:33:07 AM UTC 2026 

System load: 1.36 Processes: 164 Usage of /: 14.2% of 30.34GB Users logged in: (o) Memory usage: 9% IPv4 address for ethO: 10.0.2.15 Swap usage: 0% 

This system is built by the Bento project by Chef Software More information can be found at https://github.com/chef/bento 

Use of this system is acceptance of the OS vendor EULA and License Ag reements. in$ 

|PLAY|[Configure Docker<br>on the Ma Garderie deployment VM]<br>***k*kKKKKKKKKKKKRKKKRK|
|---|---|
|TASK <br>ok:|[Gathering Facts] 26H rrr<br>r<br>SOROS SO SOCIO IOIOS ICI IIIIIIT IIIR IIIII IIH.<br>[default]|
|TASK <br>ok:|[Install prerequisites] eerrrr ESOB OSES<br>O BOCES IGISI<br>IIITOT TOTR IR II IK<br>[default]|
|TASK <br>ok:|[Create directory for Docker's APT key] **#*##KKKKR<br>KKK RIKIKIKIKIRIEIARI<br>[default]|
|TASK <br>ok:|[Download Docker's official GPG key] eH HEHEHE EEE EEE<br>E EHO<br>IE IEIII IK<br>[default]|
|TASK<br>ok:|[Add the official Docker APT repository]<br>**keHHKKRRHHHKRHHHIREREKKERREERRRK<br>[default]|
|TASK <br>ok:|[Install Docker Engine and Compose<br>pLUgin]<br>III IIIIIIIIR IKK IKKIKK IK<br>[default]|
|TASK <br>ok:|[Enable and start Docker]<br>III III I IORIORIIITRTITORICTRTORRTRTORR TORTOK.<br>[default]|
|TASK<br>ok:<br>PLAY|[Add the Vagrant user to the Docker group] *#*#KKKRKRKRKRKRRRHRKIKIR<br>RRRRRIK<br>[default]<br>RECAPseesrrHHHEEEEEIEEIEESEEIIEIEIEIEIEI<br>IIIHI|
|<br>defa<br>pped|<br>  <br>ult<br>:<br>ok=8<br>changed=0<br>unreachable=0<br>failed=0<br>ski<br>=0<br>rescued=0<br>ignored=0<br>||



PS C:\Users\HP\Desktop\garderie-devops> vagrant ssh Welcome to Ubuntu 24.04.3 LTS (GNU/Linux 6.8.0-86-generic x86_64) 

* Documentation: https://help.ubuntu.com * Management: https: //lLandscape.canonical.com * Support: https: //ubuntu.com/pro 

System information as of Wed Oct 21 11:04:23 AM UTC 2026 System load: 0.02 Processes: 151 Usage of /: 18.1% of 30.34GB Users Logged in: fo} Memory usage: 18% IPv4 address for eth®: 10.0.2.15 Swap usage: 0% 

This system is built by the Bento project by Chef Software More information can be found at https://github.com/chef/bento 

Use of this system is acceptance of the OS vendor EULA and License Agreements. Last login: Wed Oct 21 10:52:33 2026 from 10.0.2.2 :~$ docker --version Docker version 29.9.2, build a82e528 :~$ docker compose version Docker Compose version v5.6.1 :~$ sudo systemctl status docker --short systemctl: unrecognized option '--short' :~$ sudo systemctl status docker docker.service - Docker Application Container Engine Loaded: loaded (/usr/lib/systemd/system/docker.service; ; presi Active: since Wed 2026-10-21 11:01:13 UTC; 4min 35s fg TriggeredBy: @ docker.socket Docs: https://docs..docker..com Main PID: 9127 (dockerd) Tasks: 9 Memory: 28.1M (peak: 28.9M) CPU: 807ms CGroup: /system.slice/docker.service 

:~$ curl -i http://Localhost:3001/health HTTP/1.1 200 OK X-Powered-By: Express Access-—Control-Allow-Origin: * Content-Type: application/json; charset=utf-8 Content-Length: 15 ETag: W/"-VaSQ4oDUiZbLZNAEKkN+sX+q3Sg" Date: Wed, 21 Oct 2026 11:26:17 GMT Connection: keep-alive Keep-Alive: timeout=5 {"status":"ok"} in$ curl -I http://localhost HTTP/1.1 200 OK :3000 Vary: rsc, next-router-state-tree, next-router-prefetch, next-ro uter-segment-prefetch, Accept-Encoding Link: </_next/static/chunks/2mj7_200g-2fv.css>; rel=preload; as= "style" X-Powered-By: Next.js Cache-Control: private, no-cache, no-store, max-age=0, must-reva lidate Content-Type: text/html; charset=utf-8 Date: Wed, 21 Oct 2026 11:26:25 GMT Connection: keep-alive Keep-Alive: timeout=5 



<!-- Start of picture text -->
& GS A A Notsecure 192.168.56.10 a tt @ ~~ Hoa<br>@ My Daycare<br>Home Our Services Activities Contact<br>A PLACE TO GROW AND FLOURISH<br>Growing, learning and thriving together<br>Awarm and safe environment where each child discovers the world,<br>develops his creativity and learns at his own pace.<br>| a [|<br><!-- End of picture text -->

## Git Workflow 

The project uses feature branches to organize the work. 

Examples of branches used for the project: 

- `main` : integrated project. 

- `feature/vagrant` : virtual machine configuration. 

- `feature/deployment` : deployment Compose configuration. 

- `docs/readme` : documentation changes, if used. 

Typical Git commands: 

```
git status
git branch --show-current
git add README.md
```

```
git commit -m "docs: document Ma Garderie DevOps deployment"
```

```
git push
```

Feature branches should be integrated into `main` after their changes have been reviewed and tested. 

## Project Outcome 

This project brings together application development, automated testing, containerization, CI/CD, infrastructure provisioning, and deployment automation. 

The final result is a containerized web application whose frontend and backend can be deployed on a Vagrant-managed Ubuntu virtual machine using Docker Compose, with Jenkins automating the testing, image-building, and image-publication stages. 

