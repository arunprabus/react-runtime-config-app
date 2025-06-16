-- Health App Database Schema
-- This file initializes the database with required tables

CREATE DATABASE IF NOT EXISTS health_app;
USE health_app;

-- Users table (for future authentication)
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_active (is_active)
);

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36),
    name VARCHAR(255) NOT NULL,
    blood_group ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-') NOT NULL,
    insurance VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    id_proof VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_email (email),
    INDEX idx_blood_group (blood_group)
);

-- File uploads table
CREATE TABLE IF NOT EXISTS file_uploads (
    id VARCHAR(36) PRIMARY KEY,
    profile_id VARCHAR(36),
    original_filename VARCHAR(255) NOT NULL,
    stored_filename VARCHAR(255) NOT NULL,
    file_size INT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    s3_url TEXT,
    upload_status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE,
    INDEX idx_profile_id (profile_id),
    INDEX idx_status (upload_status)
);

-- Audit log table (for tracking changes)
CREATE TABLE IF NOT EXISTS audit_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    table_name VARCHAR(50) NOT NULL,
    record_id VARCHAR(36) NOT NULL,
    action ENUM('CREATE', 'UPDATE', 'DELETE') NOT NULL,
    old_values JSON,
    new_values JSON,
    user_id VARCHAR(36),
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_table_record (table_name, record_id),
    INDEX idx_user_id (user_id),
    INDEX idx_created_at (created_at)
);

-- Insert sample data for testing
INSERT INTO users (id, email, password_hash, first_name, last_name) VALUES
('sample-user-1', 'john.doe@example.com', '$2a$10$example.hash.here', 'John', 'Doe'),
('sample-user-2', 'jane.smith@example.com', '$2a$10$example.hash.here', 'Jane', 'Smith');

INSERT INTO profiles (id, user_id, name, blood_group, insurance, email, id_proof) VALUES
('sample-profile-1', 'sample-user-1', 'John Doe', 'O+', 'Blue Cross Blue Shield', 'john.doe@example.com', 'DL123456789'),
('sample-profile-2', 'sample-user-2', 'Jane Smith', 'A+', 'Aetna Health', 'jane.smith@example.com', 'DL987654321');

-- Create indexes for better performance
CREATE INDEX idx_profiles_created_at ON profiles(created_at);
CREATE INDEX idx_file_uploads_created_at ON file_uploads(created_at);