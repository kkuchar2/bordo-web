'use client';

import { BusinessCard } from '@/components/BusinessCard/BusinessCard';
import WithAuth from '@/hoc/WithAuth';
import { addBusiness, getBusinesses } from '@/queries/business';

const BusinessesPage = () => {

    const addBusinessQuery = addBusiness();
    const getBusinessesQuery = getBusinesses();

    const onAddBusinessClick = async () => {
        addBusinessQuery.mutate({
            name: 'Apple',
        });
    };

    const businesses = getBusinessesQuery.data;

    return <div className={'relative flex h-full w-full flex-col bg-neutral-800'}>
        <div>
            {businesses && <div className={'flex flex-col'}>
                {businesses.map((business) => {
                    return <BusinessCard key={business.name} business={business} />;
                })}
            </div>}
            <button className={'h-[50px] w-[300px] bg-orange-300'} onClick={onAddBusinessClick}>
                {'Add Business'}
            </button>
        </div>
    </div>;
};

export default WithAuth(BusinessesPage, {
    name: 'BusinessesPage',
    isPublic: false,
    redirectToHomeOnAutologin: false,
    redirectToLoginPageOnUnauthenticated: true,
});
