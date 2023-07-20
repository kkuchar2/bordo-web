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

    toast(message, {
        duration: 3000,
        position: 'bottom-center',
        // Styling
        style: {
            background: '#ac0000',
            color: 'white',
            boxShadow: 'none'
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

export const showSuccessToast = (message: string) => {
    // dismiss all toasts
    toast.dismiss();

    toast(message, {
        duration: 3000,
        position: 'bottom-center',
        // Styling
        style: {
            background: '#00ac00',
            color: 'white',
            boxShadow: 'none'
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
