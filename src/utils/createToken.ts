import { v4 as uuidv4  } from 'uuid';


export const createToken = (name: string): string => {
    const uuid = uuidv4().split('-').slice(0, 2).join('');
    return `${name.split(" ")[0]}-${uuid}`;;
}