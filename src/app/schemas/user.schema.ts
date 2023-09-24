import { LocationSchema } from "./common.schema"

export interface UserPreviewSchema {
    id: string
    title: "mr" | "ms" | "mrs" | "miss" | "dir" | ""
    firstName: string
    lastName: string
    picture: string
}

export interface UserSchema {
    id: string
    title: "mr" | "ms" | "mrs" | "miss" | "dir" | ""
    firstName: string // 2-50
    lastName: string // 2-50
    gender: "male" | "female" | "other" | ""
    email: string
    dateOfBirth: string
    registerDate: string
    phone: string
    picture: string
    location: LocationSchema
}