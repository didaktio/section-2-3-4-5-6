import { format } from 'date-fns';


export const camelToTitle = (str: string) => str.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());


export const toReadableDate = (d: Date) => format(d, 'EEEE, do MMM yyyy');