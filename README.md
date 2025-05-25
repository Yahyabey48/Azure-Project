# ☁️ Azure Enterprise Cloud Project – App Conteneurisée avec CI/CD, Sécurité et Monitoring

## 🎯 Objectifs du projet

Ce projet a pour but de concevoir et déployer une architecture complète sur **Microsoft Azure**, destinée à héberger une application cloud native (ex. Node.js + AzureTable + Front Nuxt), en intégrant les bonnes pratiques de production :

- 🧱 Déploiement via **Infrastructure as Code** (Terraform ou Bicep)
- 🚀 Mise en place d’une **pipeline CI/CD** (GitHub Actions)
- 🔐 Sécurisation des secrets avec **Azure Key Vault**
- 📊 Supervision via **Azure Monitor** & **Application Insights**
- ⚖️ Mise à l’échelle automatique (Autoscale)
- 💸 Suivi et **optimisation des coûts**
- 🔁 Stratégie de haute disponibilité et reprise sur incident

---

## ⚙️ Prérequis

### Outils nécessaires en local :

- [Azure CLI](https://learn.microsoft.com/fr-fr/cli/azure/install-azure-cli)
- [Terraform](https://developer.hashicorp.com/terraform/downloads) (ou Bicep si tu préfères)
- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/)
- Visual Studio Code (ou tout autre éditeur)

### Accès cloud :

- Compte **Microsoft Azure** avec rôle **Contributor**
- Un **Azure Container Registry (ACR)** ou un compte Docker Hub
- Un compte **GitHub** (pour CI/CD via GitHub Actions)
