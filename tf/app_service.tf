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
  }

  # Un seul bloc app_settings avec toutes les variables
  app_settings = {
    "WEBSITES_ENABLE_APP_SERVICE_STORAGE" = "false"
    "DOCKER_REGISTRY_SERVER_URL"          = "https://${azurerm_container_registry.acr.login_server}"
    "DOCKER_REGISTRY_SERVER_USERNAME"     = azurerm_container_registry.acr.admin_username
    "DOCKER_REGISTRY_SERVER_PASSWORD"     = azurerm_container_registry.acr.admin_password
  # Configuration pour Table Storage - assurez-vous que ces variables sont activées
    "STORAGE_ACCOUNT_NAME"                = azurerm_storage_account.storage.name
    "STORAGE_ACCOUNT_KEY"                 = azurerm_storage_account.storage.primary_access_key
    "STORAGE_TABLE_NAME"                  = azurerm_storage_table.tasks.name
  # NODE_ENV pour utiliser le bon modèle (Table Storage)
    "NODE_ENV"                            = "production"
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
  }

  app_settings = {
    "WEBSITES_ENABLE_APP_SERVICE_STORAGE" = "false"
    "API_BASE_URL"                        = "https://${azurerm_app_service.backend.default_site_hostname}/api"
    "DOCKER_REGISTRY_SERVER_URL"          = "https://${azurerm_container_registry.acr.login_server}"
    "DOCKER_REGISTRY_SERVER_USERNAME"     = azurerm_container_registry.acr.admin_username
    "DOCKER_REGISTRY_SERVER_PASSWORD"     = azurerm_container_registry.acr.admin_password
  }

  identity {
    type = "SystemAssigned"
  }
}