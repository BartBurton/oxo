import { Side } from 'types/Side'

export const revers = (side: Side): Side => side === 'x' ? 'o' : 'x'