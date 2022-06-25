import React from "react";

import {StyledAvatar} from "components/EditableProperties/EditableProfilePictureProperty/style";
import toast from "react-hot-toast";

export const showSuccessToast = (message: string) => {
    toast.custom((t) => {
        return <div
            className={`bg-toast-900 text-white px-6 py-4 ${
                t.visible ? 'animate-enter' : 'animate-leave'
            }`}
        >
            {message} 👋
        </div>;
    }, {
        position: 'bottom-center',
        duration: 2000
    });
};

export const showSuccessAvatar = (message: string, avatar: string) => {
    toast.custom((t) => {

        console.log('avatar: ', avatar);
        return <div
            className={`flex items-center justify-center bg-toast-900 text-white px-6 py-4 ${t.visible ? 'animate-enter' : 'animate-leave'}`}>
            <div>Successfully changed avatar</div>
            <StyledAvatar
                className={'ml-2'}
                src={avatar}
                email={'krzysiekkucharski7@gmail.com'}
                style={{ objectFit: "cover" }}
                size={"50"}
                round={true}/>
        </div>;
    }, {
        position: 'top-right',
        duration: 3000
    });
};

export const showResponseError = (code: number, url: string, message: string) => {
    if (code === 404) {
        showErrorToast(`Not found: ${url}`);
    }
    else if (code === 400) {
        showErrorToast(`${message}`);
    }
    else if (code === 500) {
        showErrorToast("Server error");
    }
    else if (code === 503) {
        showErrorToast(`Service unavailable`);
    }
    else if (code !== 401) {
        showErrorToast(`Something went wrong`);
    }
};

export const showErrorToast = (message: string) => {
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