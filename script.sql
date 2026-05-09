



CREATE TABLE services (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    description TEXT,
    prix DECIMAL(10,2) NOT NULL,
    categorie VARCHAR(100),
    icone VARCHAR(50),
    image_url VARCHAR(500),
    disponible BOOLEAN DEFAULT TRUE,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE clients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telephone VARCHAR(20),
    adresse TEXT,
    date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE commandes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    client_id INT,
    date_commande TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    statut ENUM('en_attente', 'confirmee', 'en_cours', 'terminee', 'annulee') DEFAULT 'en_attente',
    total DECIMAL(10,2) NOT NULL,
    notes TEXT,
    email_envoye BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (client_id) REFERENCES clients(id)
);


CREATE TABLE commande_details (
    id INT PRIMARY KEY AUTO_INCREMENT,
    commande_id INT,
    service_id INT,
    quantite INT DEFAULT 1,
    prix_unitaire DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (commande_id) REFERENCES commandes(id),
    FOREIGN KEY (service_id) REFERENCES services(id)
);


CREATE TABLE administrateurs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(100) DEFAULT 'admin',
    actif BOOLEAN DEFAULT TRUE
);


INSERT INTO services (nom, description, prix, categorie, icone, image_url) VALUES
('Nettoyage Maison Standard', 'Nettoyage complet de votre intérieur : sols, surfaces, poussière, salle de bain et cuisine.', 5000.00, 'Maison', '🏠', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb'),
('Nettoyage Voiture Complet', 'Lavage extérieur, nettoyage intérieur complet, aspiration, vitres et finitions professionnelles.', 3000.00, 'Voiture', '🚗', 'https://images.unsplash.com/photo-1606220945770-b5b6c2c9f188?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb'),
('Nettoyage Bureau', 'Nettoyage professionnel pour espaces de travail : bureaux, sols, sanitaires et espaces communs.', 8000.00, 'Bureau', '🏢', 'https://images.unsplash.com/photo-1584622781564-1d987fa5c2c4?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb');


INSERT INTO administrateurs (nom, email, role) VALUES
('Propriétaire', 'proprietaire@cleanhome.com', 'proprietaire'),
('Responsable Opérations', 'operations@cleanhome.com', 'operations');


CREATE INDEX idx_commandes_date ON commandes(date_commande);
CREATE INDEX idx_commandes_statut ON commandes(statut);
CREATE INDEX idx_clients_email ON clients(email);
