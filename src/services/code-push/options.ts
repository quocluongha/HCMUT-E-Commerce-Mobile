import CodePush, { SyncOptions } from 'react-native-code-push'

import { translate } from 'i18n'

export const codePushOptions: SyncOptions = {
  installMode: CodePush.InstallMode.IMMEDIATE,
  updateDialog: {
    appendReleaseDescription: true,
    title: translate('codePush:title'),
    descriptionPrefix: `\n${translate('codePush:description')}`,
    mandatoryContinueButtonLabel: translate('codePush:update'),
    mandatoryUpdateMessage: translate('codePush:mandatoryUpdateMessage'),
    optionalInstallButtonLabel: translate('codePush:update'),
    optionalIgnoreButtonLabel: translate('codePush:cancel'),
    optionalUpdateMessage: translate('codePush:optionalUpdateMessage'),
  },
}
