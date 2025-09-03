import { UserRecord } from "./types";

export const USERS_MOCK: UserRecord[] = [
    { id: "u-001", name: "You", email: "you@example.com", role: "MASTER_ADMIN", department: "DEV", teams: ["t-core"], active: true },
    { id: "u-002", name: "Nora", email: "nora@example.com", role: "IT_OPS", department: "IT", teams: ["t-ops"], active: true },
    { id: "u-003", name: "Sam", email: "sam@example.com", role: "DEV", department: "DEV", teams: ["t-core"], active: true },
    { id: "u-004", name: "Kris", email: "kris@example.com", role: "IT_ADMIN", department: "IT", teams: ["t-ops"], active: true },
    { id: "u-005", name: "Ava", email: "ava@example.com", role: "HR_ADMIN", department: "HR", teams: ["t-people"], active: true },
];
