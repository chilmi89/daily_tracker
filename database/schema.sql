-- =============================================================
--  Daily Tracker Pradiza — Database Schema
--  Generated from Laravel Migrations
--  Date: 2026-02-24
-- =============================================================

SET FOREIGN_KEY_CHECKS = 0;

-- -------------------------------------------------------------
-- 1. USERS
--    Self-referencing hierarchy (manager_id → users.id)
-- -------------------------------------------------------------
CREATE TABLE `users` (
    `id`                 BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name`               VARCHAR(255)    NOT NULL,
    `email`              VARCHAR(255)    NULL UNIQUE,
    `email_verified_at`  TIMESTAMP       NULL,
    `password`           VARCHAR(255)    NOT NULL,
    `remember_token`     VARCHAR(100)    NULL,

    -- Employee Profile
    `employee_code`      VARCHAR(50)     NULL UNIQUE,
    `position`           VARCHAR(100)    NULL,
    `department_id`      BIGINT UNSIGNED NULL,  -- FK → departments.id

    -- Hierarchy (self-reference)
    `manager_id`         BIGINT UNSIGNED NULL,

    -- HR Info
    `join_date`          DATE            NULL,
    `status`             ENUM('active','inactive') NOT NULL DEFAULT 'active',

    `created_at`         TIMESTAMP       NULL,
    `updated_at`         TIMESTAMP       NULL,

    PRIMARY KEY (`id`),
    CONSTRAINT `fk_users_department`
        FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`)
        ON DELETE SET NULL,
    CONSTRAINT `fk_users_manager`
        FOREIGN KEY (`manager_id`) REFERENCES `users` (`id`)
        ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -------------------------------------------------------------
-- 2. PASSWORD RESET TOKENS
-- -------------------------------------------------------------
CREATE TABLE `password_reset_tokens` (
    `email`       VARCHAR(255) NOT NULL,
    `token`       VARCHAR(255) NOT NULL,
    `created_at`  TIMESTAMP    NULL,

    PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -------------------------------------------------------------
-- 3. SESSIONS
-- -------------------------------------------------------------
CREATE TABLE `sessions` (
    `id`            VARCHAR(255)    NOT NULL,
    `user_id`       BIGINT UNSIGNED NULL,
    `ip_address`    VARCHAR(45)     NULL,
    `user_agent`    TEXT            NULL,
    `payload`       LONGTEXT        NOT NULL,
    `last_activity` INT             NOT NULL,

    PRIMARY KEY (`id`),
    INDEX `sessions_user_id_index` (`user_id`),
    INDEX `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -------------------------------------------------------------
-- 4. CACHE  (Laravel default)
-- -------------------------------------------------------------
CREATE TABLE `cache` (
    `key`        VARCHAR(255) NOT NULL,
    `value`      MEDIUMTEXT   NOT NULL,
    `expiration` INT          NOT NULL,

    PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `cache_locks` (
    `key`        VARCHAR(255) NOT NULL,
    `owner`      VARCHAR(255) NOT NULL,
    `expiration` INT          NOT NULL,

    PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -------------------------------------------------------------
-- 5. JOBS  (Laravel queue)
-- -------------------------------------------------------------
CREATE TABLE `jobs` (
    `id`            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `queue`         VARCHAR(255)    NOT NULL,
    `payload`       LONGTEXT        NOT NULL,
    `attempts`      TINYINT UNSIGNED NOT NULL,
    `reserved_at`   INT UNSIGNED    NULL,
    `available_at`  INT UNSIGNED    NOT NULL,
    `created_at`    INT UNSIGNED    NOT NULL,

    PRIMARY KEY (`id`),
    INDEX `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `job_batches` (
    `id`             VARCHAR(255) NOT NULL,
    `name`           VARCHAR(255) NOT NULL,
    `total_jobs`     INT          NOT NULL,
    `pending_jobs`   INT          NOT NULL,
    `failed_jobs`    INT          NOT NULL,
    `failed_job_ids` LONGTEXT     NOT NULL,
    `options`        MEDIUMTEXT   NULL,
    `cancelled_at`   INT          NULL,
    `created_at`     INT          NOT NULL,
    `finished_at`    INT          NULL,

    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `failed_jobs` (
    `id`         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `uuid`       VARCHAR(255)    NOT NULL UNIQUE,
    `connection` TEXT            NOT NULL,
    `queue`      TEXT            NOT NULL,
    `payload`    LONGTEXT        NOT NULL,
    `exception`  LONGTEXT        NOT NULL,
    `failed_at`  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -------------------------------------------------------------
-- 6. SPATIE PERMISSIONS
-- -------------------------------------------------------------
CREATE TABLE `permissions` (
    `id`         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name`       VARCHAR(255)    NOT NULL,
    `guard_name` VARCHAR(255)    NOT NULL,
    `created_at` TIMESTAMP       NULL,
    `updated_at` TIMESTAMP       NULL,

    PRIMARY KEY (`id`),
    UNIQUE KEY `permissions_name_guard_name_unique` (`name`, `guard_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `roles` (
    `id`         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name`       VARCHAR(255)    NOT NULL,
    `guard_name` VARCHAR(255)    NOT NULL,
    `created_at` TIMESTAMP       NULL,
    `updated_at` TIMESTAMP       NULL,

    PRIMARY KEY (`id`),
    UNIQUE KEY `roles_name_guard_name_unique` (`name`, `guard_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Polymorphic pivot: model ↔ permissions
CREATE TABLE `model_has_permissions` (
    `permission_id` BIGINT UNSIGNED NOT NULL,
    `model_type`    VARCHAR(255)    NOT NULL,
    `model_id`      BIGINT UNSIGNED NOT NULL,

    PRIMARY KEY (`permission_id`, `model_id`, `model_type`),
    INDEX `model_has_permissions_model_id_model_type_index` (`model_id`, `model_type`),
    CONSTRAINT `fk_mhp_permission`
        FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Polymorphic pivot: model ↔ roles
CREATE TABLE `model_has_roles` (
    `role_id`    BIGINT UNSIGNED NOT NULL,
    `model_type` VARCHAR(255)    NOT NULL,
    `model_id`   BIGINT UNSIGNED NOT NULL,

    PRIMARY KEY (`role_id`, `model_id`, `model_type`),
    INDEX `model_has_roles_model_id_model_type_index` (`model_id`, `model_type`),
    CONSTRAINT `fk_mhr_role`
        FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Pivot: roles ↔ permissions
CREATE TABLE `role_has_permissions` (
    `permission_id` BIGINT UNSIGNED NOT NULL,
    `role_id`       BIGINT UNSIGNED NOT NULL,

    PRIMARY KEY (`permission_id`, `role_id`),
    CONSTRAINT `fk_rhp_permission`
        FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`)
        ON DELETE CASCADE,
    CONSTRAINT `fk_rhp_role`
        FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -------------------------------------------------------------
-- 7. DEPARTMENTS
-- -------------------------------------------------------------
CREATE TABLE `departments` (
    `id`          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name`        VARCHAR(255)    NOT NULL UNIQUE,
    `code`        VARCHAR(20)     NULL UNIQUE,
    `description` TEXT            NULL,
    `is_active`   TINYINT(1)      NOT NULL DEFAULT 1,
    `created_at`  TIMESTAMP       NULL,
    `updated_at`  TIMESTAMP       NULL,

    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -------------------------------------------------------------
-- 8. ACTIVITY CATEGORIES
-- -------------------------------------------------------------
CREATE TABLE `activity_categories` (
    `id`          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name`        VARCHAR(100)    NOT NULL,
    `description` TEXT            NULL,
    `created_at`  TIMESTAMP       NULL,
    `updated_at`  TIMESTAMP       NULL,

    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -------------------------------------------------------------
-- 9. TASKS
--    assigned_by → users.id  (CASCADE)
--    assigned_to → users.id  (CASCADE)
-- -------------------------------------------------------------
CREATE TABLE `tasks` (
    `id`          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `title`       VARCHAR(255)    NOT NULL,
    `description` TEXT            NULL,
    `assigned_by` BIGINT UNSIGNED NOT NULL,
    `assigned_to` BIGINT UNSIGNED NOT NULL,
    `priority`    ENUM('low','medium','high')               NOT NULL DEFAULT 'medium',
    `status`      ENUM('pending','in_progress','completed') NOT NULL DEFAULT 'pending',
    `due_date`    DATE            NULL,
    `created_at`  TIMESTAMP       NULL,
    `updated_at`  TIMESTAMP       NULL,

    PRIMARY KEY (`id`),
    CONSTRAINT `fk_tasks_assigned_by`
        FOREIGN KEY (`assigned_by`) REFERENCES `users` (`id`)
        ON DELETE CASCADE,
    CONSTRAINT `fk_tasks_assigned_to`
        FOREIGN KEY (`assigned_to`) REFERENCES `users` (`id`)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -------------------------------------------------------------
-- 10. DAILY REPORTS
--     user_id → users.id  (CASCADE)
--     UNIQUE (user_id, report_date) — one report per user per day
-- -------------------------------------------------------------
CREATE TABLE `daily_reports` (
    `id`          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id`     BIGINT UNSIGNED NOT NULL,
    `report_date` DATE            NOT NULL,
    `status`      ENUM('draft','submitted','approved','rejected') NOT NULL DEFAULT 'draft',
    `notes`       TEXT            NULL,
    `created_at`  TIMESTAMP       NULL,
    `updated_at`  TIMESTAMP       NULL,

    PRIMARY KEY (`id`),
    UNIQUE KEY `daily_reports_user_id_report_date_unique` (`user_id`, `report_date`),
    CONSTRAINT `fk_daily_reports_user`
        FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -------------------------------------------------------------
-- 11. ACTIVITIES
--     daily_report_id → daily_reports.id  (CASCADE)
--     category_id     → activity_categories.id  (RESTRICT)
--     task_id         → tasks.id  (SET NULL, nullable)
-- -------------------------------------------------------------
CREATE TABLE `activities` (
    `id`              BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `daily_report_id` BIGINT UNSIGNED NOT NULL,
    `category_id`     BIGINT UNSIGNED NOT NULL,
    `task_id`         BIGINT UNSIGNED NULL,
    `title`           VARCHAR(255)    NOT NULL,
    `description`     TEXT            NULL,
    `start_time`      TIME            NULL,
    `end_time`        TIME            NULL,
    `progress`        INT             NOT NULL DEFAULT 0, -- 0–100 %
    `created_at`      TIMESTAMP       NULL,
    `updated_at`      TIMESTAMP       NULL,

    PRIMARY KEY (`id`),
    CONSTRAINT `fk_activities_daily_report`
        FOREIGN KEY (`daily_report_id`) REFERENCES `daily_reports` (`id`)
        ON DELETE CASCADE,
    CONSTRAINT `fk_activities_category`
        FOREIGN KEY (`category_id`) REFERENCES `activity_categories` (`id`)
        ON DELETE RESTRICT,
    CONSTRAINT `fk_activities_task`
        FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`)
        ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -------------------------------------------------------------
-- 12. HOLIDAYS  (standalone master data)
-- -------------------------------------------------------------
CREATE TABLE `holidays` (
    `id`           BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `holiday_date` DATE            NOT NULL UNIQUE,
    `name`         VARCHAR(255)    NOT NULL,
    `created_at`   TIMESTAMP       NULL,
    `updated_at`   TIMESTAMP       NULL,

    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
