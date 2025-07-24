terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 2.20.0"  # ✅ Always specify a version to avoid issues
    }
  }

  # ✅ Optional backend
  # backend "s3" {
  #   bucket = "my-terraform-state"
  #   key    = "docker-app/terraform.tfstate"
  #   region = "us-east-1"
  # }
}

provider "docker" {
  host = "npipe:////./pipe/docker_engine"  # ✅ Windows Docker Desktop named pipe
}

##########################
# 🔹 Build Docker Image
##########################

resource "docker_image" "node_app_image" {
  name = "node-app"

  build {
    path       = "${path.module}/.."
    dockerfile = "dockerfile"
  }
}

##########################
# 🔹 Run Node.js Container
##########################

resource "docker_container" "node_app_container" {
  name  = "node-app-container"
  image = docker_image.node_app_image.latest

  ports {
    internal = 5173
    external = var.app_port  # ✅ Use the variable here
  }

  restart = "always"

  env = [
    "NODE_ENV=production",
    "PORT=${var.app_port}"  # ✅ Use variable instead of hardcoded 5173
  ]
}

##########################
# 🔹 Variable Declaration
##########################

variable "app_port" {
  description = "Port to expose from container"
  type        = number
  default     = 5173
}

##########################
# 🔹 Outputs
##########################

output "container_id" {
  description = "The ID of the Docker container"
  value       = docker_container.node_app_container.id
}

output "container_ip" {
  description = "IP address of Node.js container"
  value       = docker_container.node_app_container.ip_address
}

##########################
# 🔹 Local Variables (Optional)
##########################

locals {
  container_name = "node-app-container"
}

##########################
# 🔹 Optional Nginx Container
##########################

data "docker_registry_image" "nginx" {
  name = "nginx:latest"
}

resource "docker_container" "nginx" {
  name  = "nginx-server"
  image = data.docker_registry_image.nginx.name

  ports {
    internal = 5173
    external = 5173  # ⚠️ Make sure 8080 is free on your machine
  }
}
