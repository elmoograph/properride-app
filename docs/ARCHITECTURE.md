# ProperRide Architecture

## Current Rules

### Data Ownership

Component tidak boleh import data dummy secara langsung.

❌ Salah

ProfileHero -> profile.data.ts

✅ Benar

ProfileScreen -> profileData -> ProfileHero

---

### Design System

colors.ts
spacing.ts
radius.ts
icons.ts
layout.ts

---

### API Layer

feed/api/feed.api.ts
garage/api/garage.api.ts
profile/api/profile.api.ts

---

### Removed

XP System
Badge System

Date: 2026-06
