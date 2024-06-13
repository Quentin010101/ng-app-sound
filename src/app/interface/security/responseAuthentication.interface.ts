import { Role } from "./role.interface"

export class ResponseAuthentication{
    jwtToken!: string
    username!: string
    roles!: Role[]
}