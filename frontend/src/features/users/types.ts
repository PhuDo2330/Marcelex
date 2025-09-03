export type Department = "IT" | "DEV" | "HR";

export type UserRecord = {
    id: string;
    name: string;
    email: string;
    role:
    | "CEO"
    | "MASTER_ADMIN"
    | "IT_OPS"
    | "IT_ADMIN"
    | "DEV"
    | "ADMIN_DEV"
    | "DEV_ADMIN"
    | "HR"
    | "HR_ADMIN";
    department: Department;
    teams: string[]; // e.g., ["t-core", "t-ops"]
    active: boolean;
};
