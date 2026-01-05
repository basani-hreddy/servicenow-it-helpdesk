# IT Help Desk App Design Documentation

## Table Schemas
### Core Tables Used
- **incident**: For Incident Management.
- **problem**: For Problem Management.
- **change_request**: For Change Management.
- **sc_request**: For Service Requests.
- **sc_req_item**: For Request Items.

### Custom Fields
- **Incident Table (incident)**:
  - Business Impact: Choice field with values [Low, Medium, High, Critical]. Helps assess business severity.
  - Vendor Ticket #: String field for external vendor ticket IDs (e.g., from Microsoft or ISP).
  
- **Problem Table (problem)**:
  - RCA Method: Choice field with values [5 Whys, Fishbone, Pareto]. Tracks analysis technique.

- **Change Request Table (change_request)**:
  - Rollback Plan: Long text field describing reversion steps if change fails.
  - Testing Sign-off: Reference field to user or group for testing approval.

## Workflow Diagrams (Conceptual)
### Incident Lifecycle
1. User submits incident → Auto-assignment to group based on category/location.
2. SLA starts based on priority (P1-P4 from Impact × Urgency).
3. Agent investigates/resolves → Notification on resolution.
4. If overdue: Escalate priority, notify manager.

### Problem Lifecycle
1. Link multiple incidents to problem.
2. Perform RCA using selected method.
3. Document root cause, workaround → Create Known Error.
4. Apply workaround to future incidents.

### Change Lifecycle
1. Submit change (Standard/Normal/Emergency).
2. For Normal/Emergency: CAB/multi-level approvals, risk/impact assessment.
3. Schedule via change calendar.
4. Implement → PIR: Review success, lessons, check for caused incidents.
5. If fails: Execute rollback plan.

### Request Workflows
1. User selects catalog item (e.g., laptop, software, access).
2. Fill variables → Submit.
3. Approval (e.g., Manager → IT).
4. Fulfillment tasks assigned to IT teams.
