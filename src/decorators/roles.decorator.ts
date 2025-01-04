import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'Roles';

export enum ROLES {
    VIEWER = "VIEWER",
    ADMIN = "ADMIN",
    CHEF = "CHEF",
}

export const Roles = (...roles: ROLES[]) => SetMetadata(ROLES_KEY, roles);
