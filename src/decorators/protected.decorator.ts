import { SetMetadata } from '@nestjs/common';

export const IS_PROTECTED_KEY = 'isProtected';

export const Protected = (isProtected: boolean = true) => SetMetadata(IS_PROTECTED_KEY, isProtected);
