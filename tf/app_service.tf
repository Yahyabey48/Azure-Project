# Plan App Service (partagé par frontend et backend)
resource "azurerm_service_plan" "app_plan" {
  name                = "plan-webapp-${random_string.acr_suffix.result}"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  os_type             = "Linux"
  sku_name            = "B1"
}

# App Service pour le backend
resource "azurerm_app_service" "backend" {
  name                = "backend-webapp-${random_string.acr_suffix.result}"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  app_service_plan_id = azurerm_service_plan.app_plan.id

  site_config {
    linux_fx_version = "DOCKER|${azurerm_container_registry.acr.login_server}/backend:latest"
    always_on        = true
    # Désactiver l'identité managée pour l'ACR
    acr_use_managed_identity_credentials = false
  }

  app_settings = {
    # Credentials explicites pour ACR - cela fonctionne toujours
    "DOCKER_REGISTRY_SERVER_URL"      = "https://${azurerm_container_registry.acr.login_server}"
    "DOCKER_REGISTRY_SERVER_USERNAME" = azurerm_container_registry.acr.admin_username
    "DOCKER_REGISTRY_SERVER_PASSWORD" = azurerm_container_registry.acr.admin_password

    # Variables d'environnement cruciales
    "STORAGE_ACCOUNT_NAME"            = azurerm_storage_account.storage.name
    "STORAGE_ACCOUNT_KEY"             = azurerm_storage_account.storage.primary_access_key
    "STORAGE_TABLE_NAME"              = azurerm_storage_table.tasks.name
    "NODE_ENV"                        = "production"
  }

  identity {
    type = "SystemAssigned"
  }
}

# App Service pour le frontend
resource "azurerm_app_service" "frontend" {
  name                = "frontend-webapp-${random_string.acr_suffix.result}"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  app_service_plan_id = azurerm_service_plan.app_plan.id
  
  site_config {
    linux_fx_version = "DOCKER|${azurerm_container_registry.acr.login_server}/frontend:latest"
    always_on        = true
    acr_use_managed_identity_credentials = true  # Utiliser l'identité managée pour l'ACR
  }
  
  app_settings = {
    "DOCKER_REGISTRY_SERVER_URL" = "https://${azurerm_container_registry.acr.login_server}"
    # Suppression des credentials explicites qui peuvent entrer en conflit avec l'identité managée
    # "DOCKER_REGISTRY_SERVER_USERNAME" = azurerm_container_registry.acr.admin_username
    # "DOCKER_REGISTRY_SERVER_PASSWORD" = azurerm_container_registry.acr.admin_password
    
    # Autres variables pour le frontend
    "API_BASE_URL" = "https://${azurerm_app_service.backend.default_site_hostname}/api"
  }
  
  identity {
    type = "SystemAssigned"
  }
}