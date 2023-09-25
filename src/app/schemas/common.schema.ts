import { UserPreviewSchema } from "./user.schema";

export interface TableValuesSchema {
    key: string
    values: string | number [] | null
}

export interface ListUsersSchema {
    data: UserPreviewSchema[]
    total: number
    page: number
    limit: number
}

export interface LocationSchema {
    street: string // 5-100
    city: string // 2-30
    state: string // 2-30
    country: string // 2-30
    timezone: string // +7:00 / -1:00
}