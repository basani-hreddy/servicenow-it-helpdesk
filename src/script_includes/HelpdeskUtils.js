// Table: sys_script_include
// Name: HelpdeskUtils
// API Name: x_custom.HelpdeskUtils
// Active: true
// Description: Utility methods for IT Helpdesk workflows.

var HelpdeskUtils = Class.create();
HelpdeskUtils.prototype = {
    initialize: function() {},

    /**
     * Reopen an incident that was closed/resolved.
     * @param {GlideRecord} current - incident record
     * @param {string} reason
     */
    reopenIncident: function(current, reason) {
        current.state            = '2'; // In Progress
        current.resolved_at      = '';
        current.resolved_by      = '';
        current.close_code       = '';
        current.close_notes      = '';
        current.work_notes       = 'Incident reopened. Reason: ' + reason;
        current.reopen_count     = (parseInt(current.reopen_count.toString(), 10) || 0) + 1;
        current.update();
    },

    /**
     * Get all open incidents for a CI.
     * @param {string} ciSysId
     * @returns {Array}
     */
    getOpenIncidentsForCI: function(ciSysId) {
        var results = [];
        var gr = new GlideRecord('incident');
        gr.addQuery('cmdb_ci', ciSysId);
        gr.addQuery('state', 'IN', '1,2,3'); // New, In Progress, On Hold
        gr.query();
        while (gr.next()) {
            results.push({
                number:   gr.number.toString(),
                sys_id:   gr.getUniqueValue(),
                priority: gr.priority.getDisplayValue(),
                summary:  gr.short_description.toString()
            });
        }
        return results;
    },

    /**
     * SLA breach check — returns true if incident has breached SLA.
     * @param {GlideRecord} gr - incident record
     */
    hasBreachedSLA: function(gr) {
        var sla = new GlideRecord('task_sla');
        sla.addQuery('task', gr.getUniqueValue());
        sla.addQuery('has_breached', true);
        sla.setLimit(1);
        sla.query();
        return sla.next();
    },

    type: 'HelpdeskUtils'
};
