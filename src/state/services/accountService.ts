import {AxiosConfigs} from 'queries/base';
import {RequestType} from 'tools/client/client.types';
import {request} from 'tools/requests/request';
import {FormData} from 'util/util';

import ApiClient from '../../client';

import {accountActions as actions} from './../reducers/account/accountSlice';

export const disconnectFromGoogle = (formData: FormData) => {
    return request({
        axiosInstance: ApiClient,
        requestType: RequestType.POST,
        url: 'account/google-disconnect',
        action: actions.disconnectFromGoogle,
        config: AxiosConfigs.WITH_CREDENTIALS_AND_CSRF,
        requestData: formData
    });
};