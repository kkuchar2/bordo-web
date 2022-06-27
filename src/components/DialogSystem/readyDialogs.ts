import { PlusIcon } from '@heroicons/react/outline';
import { MailIcon } from '@heroicons/react/solid';
import { getSelector } from 'appRedux/reducers/api/auth/accountSlice';
import { openDialog } from 'appRedux/reducers/application';
import { askSetupPassword, changeEmailAddress, changePassword, changeUsername } from 'appRedux/services/authService';
import { appDispatch } from 'appRedux/store';
import { CreateNewModelItemDialogData } from 'components/DialogSystem/dialogs';

import { ReadyDialogArgs, SentEmailDialogArgs } from './readyDialogs.types';

export const showRegistrationCompleteDialog = () => {
  return showSentEmailDialog({
    component: 'RegistrationCompleteDialog',
    title: 'REGISTRATION_COMPLETE_TITLE',
    description: 'REGISTRATION_COMPLETE_DESCRIPTION',
    closeable: true
  });
};

export const showSentEmailDialog = (args: SentEmailDialogArgs) => {
  const { component, title, description, closeable } = args;

  appDispatch(
    openDialog({
      component: component,
      props: {
        dialog: {
          title: title,
          icon: {
            component: MailIcon,
            color: 'text-[#24a0ed]',
            backgroundColor: 'bg-[#1c3545]'
          },
          description: description,
          closeable: closeable
        },
        data: {}
      }
    })
  );
};

export const showDialogAfterPasswordResetRequest = () => {
  return showSentEmailDialog({
    component: 'SentPasswordResetMailDialog',
    title: 'PASSWORD_RESET_MAIL_SENT_TITLE',
    description: 'PASSWORD_RESET_MAIL_SENT_DESCRIPTION',
    closeable: true
  });
};

export const showDialogAfterFirstPasswordSetupRequest = () => {
  return showSentEmailDialog({
    component: 'SentPasswordResetMailDialog',
    title: 'PASSWORD_CREATE_MAIL_SENT_TITLE',
    description: 'PASSWORD_CREATE_MAIL_SENT_DESCRIPTION',
    closeable: true
  });
};

export const showChangeAvatarDialog = () => {
  appDispatch(
    openDialog({
      component: 'ChangeAvatarDialog',
      props: {
        dialog: {
          title: 'CHANGE_AVATAR',
          description: ''
        },
        data: {}
      }
    })
  );
};

export const showConfirmEmailDialog = (args: ReadyDialogArgs) => {
  const { data } = args;

  appDispatch(
    openDialog({
      component: 'SendConfirmationMailDialog',
      props: {
        dialog: {
          title: 'Please verify your email address'
        },
        data: data
      }
    })
  );
};

export const showChangeUsernameDialog = (args: ReadyDialogArgs) => (isOnlySocial: boolean) => {
  const { data } = args;

  if (isOnlySocial) {
    console.log('showChangeUsernameDialog: isOnlySocial');
    showPasswordCreationRequiredDialog('CHANGE_USERNAME', 'CHANGE_USERNAME_PASSWORD_SETUP');
  } else {
    console.log('showChangeUsernameDialog: !isOnlySocial');
    appDispatch(
      openDialog({
        component: 'ChangePropertyDialog',
        props: {
          dialog: {
            title: 'CHANGE_USERNAME',
            description: 'CHANGE_USERNAME_DESCRIPTION',
            width: 400
          },
          data: {
            formConfigKey: 'changeUsername',
            requestStateSelector: getSelector('changeUsername'),
            dispatchFunc: changeUsername,
            initialArgs: data
          }
        }
      })
    );
  }
};

export const showChangeEmailDialog = (args: ReadyDialogArgs) => (isOnlySocial: boolean) => {
  if (isOnlySocial) {
    showPasswordCreationRequiredDialog('CHANGE_EMAIL', 'CHANGE_EMAIL_PASSWORD_SETUP');
  } else {
    appDispatch(
      openDialog({
        component: 'ChangePropertyDialog',
        props: {
          dialog: {
            title: 'CHANGE_EMAIL',
            description: 'CHANGE_EMAIL_DESCRIPTION',
            icon: {
              component: MailIcon,
              color: 'text-[#24a0ed]',
              backgroundColor: 'bg-[#1c3545]'
            },
            width: 400
          },
          data: {
            formConfigKey: 'changeEmail',
            requestStateSelector: getSelector('changeEmailAddress'),
            dispatchFunc: changeEmailAddress
          }
        }
      })
    );
  }
};

export const showChangePasswordDialog = () => {
  appDispatch(
    openDialog({
      component: 'ChangePropertyDialog',
      props: {
        dialog: {
          title: 'CHANGE_PASSWORD',
          description: 'CHANGE_PASSWORD_DESCRIPTION',
          width: 400
        },
        data: {
          formConfigKey: 'resetPassword',
          requestStateSelector: getSelector('resetPassword'),
          requestStateName: 'resetPasswordState',
          dispatchFunc: changePassword
        }
      }
    })
  );
};

export const showPasswordCreationRequiredDialog = (title_key: string, description_key: string) => {
  appDispatch(
    openDialog({
      component: 'PasswordCreationRequiredDialog',
      props: {
        dialog: {
          title: title_key,
          description: description_key,
          icon: {
            component: MailIcon,
            color: 'text-[#24a0ed]',
            backgroundColor: 'bg-[#1c3545]'
          },
          width: 400
        },
        data: {
          formConfigKey: 'emptyForm',
          requestStateSelector: getSelector('askSetupPassword'),
          requestStateName: 'askSetupPassword',
          dispatchFunc: askSetupPassword
        }
      }
    })
  );
};

export const showDeleteAccount = (isOnlySocial: boolean) => {
  if (isOnlySocial) {
    showPasswordCreationRequiredDialog('DELETE_ACCOUNT', 'DELETE_ACCOUNT_PASSWORD_SETUP');
  } else {
    showDeleteAccountDialog();
  }
};

export const showCreateModelItemDialog = (
  args: ReadyDialogArgs,
  fields: any,
  modelPackage: string,
  modelName: string
) => {
  appDispatch(
    openDialog<CreateNewModelItemDialogData>({
      component: 'CreateNewModelItemDialog',
      props: {
        dialog: {
          title: 'ADD_NEW_ROW'
        },
        data: {
          fields: fields,
          modelPackage: modelPackage,
          modelName: modelName
        }
      }
    })
  );
};

export const showDeleteAccountDialog = () => {
  appDispatch(
    openDialog({
      component: 'DeleteAccountDialog',
      props: {
        dialog: {
          title: 'DELETE_ACCOUNT',
          description: ''
        },
        data: {}
      }
    })
  );
};

export const showAddTableItemDialog = (args: ReadyDialogArgs, fields: any, modelPackage: string, modelName: string) => {
  appDispatch(
    openDialog<CreateNewModelItemDialogData>({
      component: 'CreateNewModelItemDialog',
      props: {
        dialog: {
          title: 'ADD_NEW_ROW',
          icon: {
            component: PlusIcon,
            color: 'text-[#24a0ed]',
            backgroundColor: 'bg-[#1c3545]'
          },
          width: 400
        },
        data: {
          fields: fields,
          modelPackage: modelPackage,
          modelName: modelName
        }
      }
    })
  );
};
