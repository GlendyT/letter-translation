export type DedicateFrom = {
    id: string;
    name: string;
    contentinside: string
    toWho: string
}

export type DraftDedicateFrom = Omit<DedicateFrom, 'id'>