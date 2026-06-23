// Table: incident  (Business Rule)
// Name: Incident Priority Auto-Set
// Trigger table: incident
// When: before
// Actions: insert=true update=true delete=false query=false
// Description: Auto-calculate priority from impact and urgency matrix.

(function executeRule(current, previous) {
    var impact  = parseInt(current.impact.toString(),  10);
    var urgency = parseInt(current.urgency.toString(), 10);

    // Standard ServiceNow priority matrix
    var matrix = {
        '1-1': '1', '1-2': '2', '1-3': '3',
        '2-1': '2', '2-2': '3', '2-3': '4',
        '3-1': '3', '3-2': '4', '3-3': '5'
    };

    var key = impact + '-' + urgency;
    if (matrix[key]) {
        current.priority = matrix[key];
    }

    // Auto-assign VIP incidents to dedicated group
    if (current.priority == '1') {
        var group = gs.getProperty('helpdesk.p1_assignment_group', '');
        if (group) {
            current.assignment_group = group;
        }
        if (current.short_description.changes()) {
            current.notify = '1'; // Notify stakeholders
        }
    }
})(current, previous);
