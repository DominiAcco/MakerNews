export interface CreatedBy {
    userId: string;
    name: string;
    role: string;
}

export interface Publication {
    _id: string;
    title: string;
    description: string;
    category: string;
    status: "published" | "archived";
    createdBy: CreatedBy;
    createdAt: string;
    updatedAt: string;
}