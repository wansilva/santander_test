import { LocationSchema } from "./common.schema"

export interface UserPreviewSchema {
    id: string
    title: "mr" | "ms" | "mrs" | "miss" | "dir" | ""
    firstName: string
    lastName: string
    picture: string
}

export interface UserSchema {
    id?: string
    title: "mr" | "ms" | "mrs" | "miss" | "dir" | ""
    firstName: string
    lastName: string
    gender: "male" | "female" | "other" | ""
    email: string
    dateOfBirth: string
    registerDate?: string
    updatedDate?: string
    phone: string
    picture: string
    location: LocationSchema
}