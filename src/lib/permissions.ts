export const permissions = ["none", "users", "meetings"] as const;

export type UserPermission = (typeof permissions)[number];
export type UserPermissions = UserPermission[];
