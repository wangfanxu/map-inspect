```markdown
# MapViews App

This Docker Compose configuration sets up the MapViews application, consisting of a frontend and a backend service.

## Prerequisites
- Docker installed on your machine

## Getting Started
1. Clone the MapViews repository.
2. Navigate to the root directory of the repository in your terminal.

## Usage

### Build and Run
```bash
docker-compose up --build
```

This command will build and start the frontend and backend services. The frontend will be accessible at http://localhost:3000, and the backend will be running at http://localhost:5000.

### Shutdown
```bash
docker-compose down
```

Use this command to stop and remove the containers.

## Services

### Frontend
- Dockerfile: `./mapviews-client/Dockerfile`
- Port: 3000
- Depends on: Backend service

The frontend service is built from the `./mapviews-client` directory using the specified Dockerfile. It is accessible at http://localhost:3000 and depends on the backend service.

### Backend
- Dockerfile: `./server/Dockerfile`
- Port: 5000

The backend service is built from the `./server` directory using the specified Dockerfile. It is accessible at http://localhost:5000.

## Important Notes
- The frontend service depends on the backend service, ensuring proper initialization order.

Feel free to customize the Dockerfiles and configurations to suit your specific needs.

Happy mapping!
```

This README provides a brief overview of the MapViews Docker Compose setup, including instructions for building, running, and shutting down the services. Adjustments can be made based on specific requirements.