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