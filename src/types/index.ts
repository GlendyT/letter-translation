export type DedicateFrom = {
    id: string;
    name: string;
    city: string
}

export type DraftDedicateFrom = Omit<DedicateFrom, 'id'>