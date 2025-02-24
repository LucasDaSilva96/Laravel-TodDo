export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export interface Task {
    id: number;
    title: string;
    description: string;
    long_description?: string;
    completed: boolean;
    created_at: string;
    updated_at: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};
