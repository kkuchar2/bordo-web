import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';

export const showResponseError = (code: number, url: string, message: string) => {
    if (code === 404) {
        showErrorToast(`Not found: ${url}`);
    }
    else if (code === 400) {
        showErrorToast(`${message}`);
    }
    else if (code === 500) {
        showErrorToast('Server error');
    }
    else if (code === 503) {
        showErrorToast('Service unavailable');
    }
    else if (code !== 401) {
        showErrorToast('Something went wrong');
    }
};

export const showErrorToast = (message: string) => {
    // dismiss all toastsCreat
    toast.dismiss();

    toast(
        <div className={'flex w-full items-start justify-start font-semibold'}>
            {message}
        </div>,
        {
            icon: <ExclamationTriangleIcon height={40} width={30}/>,
            duration: 3000,
            position: 'top-left',
            style: {
                width: '100%',
                maxWidth: '100%',
                background: '#A60016',
                color: '#e3cdd0',
                boxShadow: 'none',
                borderRadius: '0',
            },
        });
};

export const showSuccessToast = (message: string) => {
    // dismiss all toasts
    toast.dismiss();

    toast(message, {
        duration: 3000,
        position: 'bottom-center',
        // Styling
        style: {
            background: '#000000',
            color: 'white',
            boxShadow: 'none',
            fontSize: '1.1rem',
            borderRadius: '0',
        },
        className: '',
        // Custom Icon
        // icon: '',
        // Change colors of success/error/loading icon
        iconTheme: {
            primary: '#000',
            secondary: '#fff',
        },
        // Aria
        ariaProps: {
            role: 'status',
            'aria-live': 'polite',
        },
    });
};
