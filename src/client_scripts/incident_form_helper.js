// Table: sys_ui_script  (Client Script)
// Name: Incident Impact Urgency Helper
// Applies to: incident
// Type: onChange
// Active: true
// Description: Show impact/urgency guidance when values change.

function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue === '') return;

    var impact  = g_form.getValue('impact');
    var urgency = g_form.getValue('urgency');
    var msg = '';

    if (impact === '1' && urgency === '1') {
        msg = 'P1 Critical — Immediate action required. Notify on-call team.';
        g_form.showFieldMsg('priority', msg, 'info');
    } else if (impact === '1' || urgency === '1') {
        msg = 'High severity — Escalate within 1 hour.';
        g_form.showFieldMsg('priority', msg, 'info');
    } else {
        g_form.clearFieldMessages('priority');
    }
}
