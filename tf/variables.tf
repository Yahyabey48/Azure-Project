variable "resource_group_name" {
  type        = string
  description = "Nom du groupe de ressources"
  default     = "RG-WebApp-Project"
}

variable "location" {
  description = "La région Azure"
  type        = string
  default     = "westeurope"
}

variable "postgres_password" {
  description = "Password for PostgreSQL server"
  type        = string
  sensitive   = true
  default     = "MySecurePassword123!"
}

variable "postgres_region" {
  description = "Région pour PostgreSQL"
  type        = string
  default     = "eastus" # Essayez une région comme eastus, northeurope ou centralus
}