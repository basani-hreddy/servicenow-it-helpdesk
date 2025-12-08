# ServiceNow IT Help Desk App

End-to-end ITSM implementation for an IT Help Desk using ServiceNow Incident, Problem, Change, and Request Management.

## Overview

This app simulates a real IT Help Desk used by internal IT support teams. It covers: incident lifecycle, problem root cause analysis, controlled changes, and service catalog requests, with SLAs and notifications.

## Modules & Tables

- Incident Management (table: `incident`) – log and resolve user issues.
- Problem Management (table: `problem`) – analyze root causes and create Known Errors.
- Change Management (table: `change_request`) – handle Standard, Normal, Emergency changes with CAB approvals.
- Service Catalog (tables: `sc_request`, `sc_req_item`) – standardized IT requests (laptop, software, access).

## Key Features

- Priority matrix (Impact × Urgency) and P1–P4 SLAs.
- Auto-assignment rules based on category and location.
- CAB approval workflows for Normal/Emergency changes.
- Email notifications on assignment, resolution, and SLA breach.
- Dashboards for incident trends, SLA compliance, change success rate.

## How to Recreate in a PDI

1. Activate ITSM plugins if needed.
2. Configure incident categories, priorities, and SLAs.  
3. Create assignment groups (L1, L2, CAB).  
4. Import sample incidents from `/data/sample_incidents.csv` (you will add this file).  
5. Configure reports and dashboards from `/docs/design.md` description.

## Files in this repo

- `/docs/design.md` – table fields, workflows, and state diagrams.  
- `/data/sample_incidents.csv` – sample data for testing.  

Use this project in interviews to talk through how you would design a real IT Help Desk on ServiceNow.
