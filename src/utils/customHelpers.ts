import {
  FrameworkContractsNames,
  NetworkDeployment,
  NetworkDeployments,
  SupportedVersions,
} from '@aragon/osx-commons-configs';

enum SdkSupportedNetworks {
  NATIONSFIRST = 'nationsfirst',
}

const getNetworkNameByAlias = (
  name: string
): SdkSupportedNetworks | 'unsupported' => {
  if (name === 'nationsfirst') {
    return SdkSupportedNetworks.NATIONSFIRST;
  }

  return 'unsupported';
};

const getLatestNetworkDeployment = (
  network: SdkSupportedNetworks
): Partial<NetworkDeployment> => {
  switch (network) {
    case SdkSupportedNetworks.NATIONSFIRST:
      return {
        [FrameworkContractsNames.DAO_FACTORY]: {
          address: '0x1614340638428E6FAe9AE3563c7243c4Cf37A37c',
          deploymentTx:
            '0x6998f01baed22c5a889f10b347c37bbcdcfb2f382197ccbb241324bbc39a67ba',
          blockNumber: 95,
        },
        [FrameworkContractsNames.PLUGIN_REPO_FACTORY]: {
          address: '0x36846C1E6BECC989C07596fA8d38562E1f757Aed',
          deploymentTx:
            '0xd92c7ed250468d265dbbc1f1a4831a59c98073339c05f047131ad3c83e739f65',
          blockNumber: 96,
        },
        [FrameworkContractsNames.PLUGIN_SETUP_PROCESSOR]: {
          address: '0xb930574d1A4BD3C76517AffB3E7430585cceFA15',
          deploymentTx:
            '0x5e9f5b06ab66d7cdb14b900fceac175938d7adb7ee7be7c9d602fc2d3c033a42',
          blockNumber: 94,
        },
      };
    default: {
      return {};
    }
  }
};

const getNetworkDeployments = (
  network: SdkSupportedNetworks
): NetworkDeployments => {
  switch (network) {
    case SdkSupportedNetworks.NATIONSFIRST:
      return {
        [SupportedVersions.V1_0_0]: getLatestNetworkDeployment(network),
        [SupportedVersions.V1_3_0]: getLatestNetworkDeployment(network),
      };
  }
};

export {
  SdkSupportedNetworks,
  getNetworkNameByAlias,
  getLatestNetworkDeployment,
  getNetworkDeployments,
};
