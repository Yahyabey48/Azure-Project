output "resource_group_name" {
  value = azurerm_resource_group.rg.name
}

output "acr_name" {
  value = azurerm_container_registry.acr.name
}

output "acr_login_server" {
  value = azurerm_container_registry.acr.login_server
}

output "storage_account_name" {
  value = azurerm_storage_account.storage.name
}

output "storage_account_key" {
  value     = azurerm_storage_account.storage.primary_access_key
  sensitive = true
}

output "storage_table_name" {
  value = azurerm_storage_table.tasks.name
}

output "frontend_url" {
  value = "https://${azurerm_app_service.frontend.default_site_hostname}"
}

output "backend_url" {
  value = "https://${azurerm_app_service.backend.default_site_hostname}"
}

# Supprimez ou commentez cette ligne si vous n'avez pas encore créé de Key Vault
# output "key_vault_name" {
#   value = azurerm_key_vault.vault.name
# }