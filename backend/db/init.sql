-- Création de la table des tâches
CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertion de quelques exemples de tâches
INSERT INTO tasks (title, description) VALUES
('Configuration du pipeline CI/CD', 'Mettre en place GitHub Actions pour déployer automatiquement sur Azure'),
('Sécuriser les secrets', 'Utiliser Azure Key Vault pour stocker les informations sensibles'),
('Test de charge', 'Effectuer des tests de performance sur l''application');