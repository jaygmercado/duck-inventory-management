import { Dispatch, SetStateAction } from 'react';
import { User} from '@/types/users';

export interface BootcamperContext {
  bootcampers: User[];
  setBootcampers: Dispatch<SetStateAction<User[]>>;
}
