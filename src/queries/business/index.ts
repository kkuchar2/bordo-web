import { getQueryFirebase, postQueryFirebase } from '@/queries/authWithFirebaseQueries';

export type Business = {
    name: string;
    description: string;
}

export const addBusiness = () => postQueryFirebase(['create_business'], 'business/')({});

export const getBusinesses = () => getQueryFirebase<Business[]>(['get_businesses'], 'business/')({});