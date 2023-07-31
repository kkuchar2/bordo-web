'use client';

import { useTranslation } from 'react-i18next';

import { NavLink } from '@/components/NavLink/NavLink';

const UserAgreementsPage = () => {
    const { t } = useTranslation();

    return <div className={'grid h-full w-full place-items-center'}>
        <div className={'flex flex-col items-center gap-[20px] p-[20px]'}>
            <h1 className={'text-4xl'}>
                {'User Agreement'}
            </h1>

            <div className={'max-w-[600px] text-justify'}>
                {'Welcome to Website Name!\n' +
                    '\n' +
                    'These terms and conditions outline the rules and regulations for the use of Company Name\'s Website, located at Website.com.\n' +
                    '\n' +
                    'By accessing this website we assume you accept these terms and conditions. Do not continue to use Website Name if you do not agree to take all of the terms and conditions stated on this page.\n' +
                    '\n' +
                    'The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: “Client”, “You” and “Your” refers to you, the person log on this website and compliant to the Company\'s terms and conditions. “The Company”, “Ourselves”, “We”, “Our” and “Us”, refers to our Company. “Party”, “Parties”, or “Us”, refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client\'s needs in respect of provision of the Company\'s stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.'}
            </div>
            <NavLink className={'rounded-3xl bg-gray-700 px-5 py-3 text-sm font-semibold hover:bg-gray-600'} href={'/'}>
                {t('SIGN_IN')}
            </NavLink>
        </div>
    </div>;
};

export default UserAgreementsPage;