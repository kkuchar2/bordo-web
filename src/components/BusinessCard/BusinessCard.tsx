import { Business } from '@/queries/business';

type BusinessCardProps = {
    business: Business;
}

export const BusinessCard = (props: BusinessCardProps) => {
    const { business } = props;

    return <div className={'relative flex max-w-[600px] flex-col'}>
        <div>
            {business.name}
        </div>
        <div>
            {business.description}
        </div>
    </div>;
};