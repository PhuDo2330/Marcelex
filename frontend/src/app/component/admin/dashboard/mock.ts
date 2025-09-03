export type Role = "owner" | "lead" | "regular";

/** TEMP: replace with your real role (store/cookie/JWT) */
export function getCurrentRole(): Role {
    return "owner"; // change to "lead" or "regular" to preview
}

export const mock = {
    owner: {
        kpis: [
            { title: "Open Projects", value: 12, delta: 5 },
            { title: "Active Sprints", value: 3, delta: 0 },
            { title: "Incidents", value: 1, delta: -50 },
            { title: "MRs Waiting", value: 7, delta: 17 },
        ],
        notes: [
            "INC-903 resolved · DB timeouts",
            "“Q4 Launch” campaign ready for review",
            "Payroll export completed",
        ],
        cross: [
            { title: "Website Redesign", meta: "PROJ-12 · development, marketing" },
            { title: "Salesforce Integration", meta: "PROJ-19 · sales, development, operations" },
            { title: "Onboarding Revamp", meta: "PROJ-22 · hr, development" },
        ],
        myTasks: [
            { id: "PROJ-12", title: "Website redesign handoff", dept: "projects", due: "Sep 20" },
            { id: "DEV-214", title: "Fix OAuth callback edge case", dept: "development", due: "Sep 18" },
            { id: "OPS-77", title: "Create DB failover runbook", dept: "operations", due: "Sep 25" },
        ],
    },
    lead: {
        kpis: [
            { title: "Dev Backlog", value: 48, delta: -3 },
            { title: "IT Tickets", value: 9, delta: 12 },
            { title: "Overdue", value: 2, delta: -33 },
            { title: "Deploys Today", value: 3, delta: 0 },
        ],
        tasks: [
            { title: "Code review: DEV-302", meta: "PR #114 • today" },
            { title: "Retro notes for Sprint 28", meta: "Dev · due Sep 19" },
            { title: "Patch OpenSSL on build agents", meta: "IT · due Sep 17", overdue: true },
        ],
    },
    regular: {
        tasks: [
            { title: "Update profile avatar", meta: "Due Sep 16" },
            { title: "Submit timesheet", meta: "Due Sep 15", overdue: true },
            { title: "Finish DEV-304 subtasks", meta: "Backlog • this week" },
        ],
    },
};
