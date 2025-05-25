# Supprimer les ressources SQL et garder uniquement le stockage et table storage
resource "azurerm_storage_account" "storage" {
  name                     = "stwebapp${random_string.acr_suffix.result}"
  resource_group_name      = azurerm_resource_group.rg.name
  location                 = azurerm_resource_group.rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  
  tags = {
    environment = "dev"
    project     = "webapp-project"
  }
}

# Table Storage pour stocker les tâches
resource "azurerm_storage_table" "tasks" {
  name                 = "tasks"
  storage_account_name = azurerm_storage_account.storage.name
}