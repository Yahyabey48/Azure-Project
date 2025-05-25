const { TableClient, AzureNamedKeyCredential } = require('@azure/data-tables');

console.log("Initialisation de Table Storage");

const accountName = process.env.STORAGE_ACCOUNT_NAME;
const accountKey = process.env.STORAGE_ACCOUNT_KEY;
const tableName = process.env.STORAGE_TABLE_NAME || 'tasks';

console.log("Variables d'environnement:");
console.log(`- STORAGE_ACCOUNT_NAME: ${accountName || 'NON DÉFINI'}`);
console.log(`- STORAGE_TABLE_NAME: ${tableName || 'NON DÉFINI'}`);
console.log(`- STORAGE_ACCOUNT_KEY: ${accountKey ? 'PRÉSENT' : 'NON DÉFINI'}`);

// Créer un client de table avec les informations d'authentification
const credential = new AzureNamedKeyCredential(accountName, accountKey);
const tableClient = new TableClient(
  `https://${accountName}.table.core.windows.net`,
  tableName,
  credential
);

console.log("Client Table Storage initialisé avec succès");

module.exports = tableClient;
