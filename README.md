# ServiceNow IT Help Desk App

End-to-end ITSM implementation for an IT Help Desk using ServiceNow Incident, Problem, Change, and Request Management.

## Overview
This app simulates a real IT Help Desk used by internal IT support teams. It covers: incident lifecycle, problem root cause analysis, controlled changes, and service catalog requests, with SLAs and notifications.

### Project Goal
Build a simple but realistic IT Help Desk application in ServiceNow that integrates:
- Incident Management
- Problem Management
- Change Management
- Service Catalog / Request Management

Mental model: "One IT Help Desk app = one place where users report issues, IT finds root cause, plans changes, and fulfills standard requests."

### What Was Built
#### Custom Application Menu
- Created a custom application called “IT Help Desk” in the left navigation.
- Under this application, added modules (links) for each ITSM process:
  - Incidents
  - Problems
  - Changes
  - Requests / Service Catalog
  - Reports & Dashboards

This gives a single menu where an IT agent can see all key areas.

#### End-to-End Workflows
Configured high-level flows for:
- **Incident**: Auto-assignment to correct groups, SLA tracking (based on priority), escalation rules for overdue/high-priority incidents.
- **Problem**: Link Problems to related Incidents, document Root Cause Analysis (RCA), maintain a simple Known Error database.
- **Change**: CAB approvals for Normal/Emergency changes, risk and impact assessment fields, use change calendar for scheduling.
- **Service Catalog / Requests**: Hardware/software request items, approval workflows and fulfillment tasks.

## Modules & Tables
- **Incident Management** (table: incident) – log and resolve user issues.
- **Problem Management** (table: problem) – analyze root causes and create Known Errors.
- **Change Management** (table: change_request) – handle Standard, Normal, Emergency changes with CAB approvals.
- **Service Catalog** (tables: sc_request, sc_req_item) – standardized IT requests (laptop, software, access).

### Table Design
#### Using Core (OOB) Tables
Reused standard ITSM tables:
- Incident → table: incident
- Problem → table: problem
- Change Request → table: change_request
- Request → table: sc_request
- Request Item → table: sc_req_item

#### Custom Fields Added
- **Incident (incident table)**:
  - Business Impact (choice): Low, Medium, High, Critical.
  - Vendor Ticket # (string): Stores external ticket ID.
- **Problem (problem table)**:
  - RCA Method (choice): 5 Whys, Fishbone, Pareto.
- **Change Request (change_request table)**:
  - Rollback Plan (long text): Describes reversion steps.
  - Testing Sign-off (reference): References user/group for sign-off.

## Key Features
### Incident Management
- Priority matrix (Impact × Urgency).
- Auto-routing to support groups.
- SLA breach notifications.

### Problem Management
- Linked incidents to show impact.
- Known Error workflow with root cause and workaround.

### Change Management
- Three change types: Standard, Normal, Emergency.
- CAB approval for Normal/Emergency.
- PIR (Post-Implementation Review) for success confirmation and lessons learned.

### Service Catalog
- Items for: Laptop requests, software licenses, access (e.g., VPN).
- Each with variables, approval workflows, and fulfillment tasks.

### Reports & Dashboards
- Incident trends by category/group/priority.
- SLA compliance percentage.
- Change success rate (without incidents/rollbacks).

## Workflows & Automation
- **Business Rule**: Auto-set Priority on Incidents (Impact × Urgency).
- **Client Script**: Validate fields (e.g., require Business Impact, Rollback Plan).
- **Flow/Notification**: Notify user on Incident resolution.
- **Scheduled Job**: Daily check for overdue incidents, escalate with notifications.

## Real-World Value
This app is a mini version of enterprise IT Help Desks:
- Handles thousands of employee incidents.
- Tracks recurring issues.
- Controls infrastructure changes.
- Delivers standard services.
- Provides metrics on open/resolved tickets, team load, service incidents, and change reliability.

## How to Recreate in a PDI (Personal Developer Instance)
1. Activate ITSM plugins if needed.
2. Configure incident categories, priorities, and SLAs.
3. Create assignment groups (L1, L2, CAB).
4. Import sample incidents from `/data/sample_incidents.csv`.
5. Configure reports and dashboards from `/docs/design.md` description.

## Files in This Repo
- `/docs/design.md` – Table fields, workflows, and state diagrams.
- `/data/sample_incidents.csv` – Sample data for testing.
