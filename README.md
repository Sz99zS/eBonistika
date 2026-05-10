# eBonistika
A private numismatic and notaphily digital archive.
1. Vision

eBonistika is a specialized web application built for private collectors to catalog and manage their numismatic assets. The project aims to replace fragmented tracking methods (like Excel or physical ledgers) with a structured, hierarchical digital system that provides clear visibility into a private collection's depth and status.

2. MVP Goals
Organization: Establish a strict hierarchy: Continent → Country → Series → Item.
Inventory Tracking: Provide an "Owned" status toggle for quick identification of missing pieces.
Visual Documentation: Support high-resolution photo uploads for each item (obverse/reverse).
Privacy & Security: Secure, private access for the owner via cookie-based authentication.

3. Tech Stack
Backend: ASP.NET Core (C#), Entity Framework Core, PostgreSQL.
Frontend: Next.js (React), TypeScript, Tailwind CSS.
Storage: Cloud Storage (S3/Supabase/R2) for media assets.
Auth: Secure session-based Cookie authentication.

4. Functional Modules
A. Access Management
User registration and secure login.
Session management and identity verification.
B. Catalog Hierarchy
Geography: Pre-seeded global directory of continents and countries.
Collections: High-level grouping (e.g., "European Coins," "Soviet Banknotes").
Series: Logical grouping by theme, denomination, or year within a specific country.
C. Item Management
Detailed item cards with title and ownership status
Cloud-based photo uploads (up to 2 photos per item).
Full CRUD operations for all user-generated content.

5. Data Model (Key Entities)
User: Owner account.
Collection: Top-level container.
Series: Links a collection to a specific country and theme.
Item: The individual coin or banknote.
Photo: Image metadata and cloud URLs.

6. MVP Roadmap
Phase 1: Core Infrastructure & Cookie Authentication.
Phase 2: Geography Seed Data & Collection/Series Management.
Phase 3: Item Inventory Engine & Cloud Storage Integration.
Phase 4: UI Polishing & Private Beta Deployment.

7. Out of Scope (Post-MVP)
Global search and advanced filtering.
Publicly shareable links or galleries.
AI-powered coin recognition.
Marketplace integrations or price tracking.

GitHub Projects / Jira Epics (Tasks)
Epic: Auth & Identity (Registration, Login, Security Middleware)
Epic: Geography & Catalog (DB Seeding, API for Countries/Continents)
Epic: Collection Engine (CRUD for Collections and Series)
Epic: Inventory Management (Item CRUD and Ownership status)
Epic: Media & Storage (S3 Integration, Image Upload/Validation)
Epic: Web Frontend (Next.js Views, API Integration, UI/UX)
