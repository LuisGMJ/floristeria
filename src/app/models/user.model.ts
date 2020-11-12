export interface Roles {
    editor?: boolean;
    admin?: boolean;
}

export interface User {
    uid?: string;
    email?: string;
    password?: string;
    displayName?: string;
    photoURL?: string;
    emailVerified?: boolean;
    roles?: Roles;
}
