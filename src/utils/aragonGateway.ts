import {JsonRpcProvider, Networkish} from '@ethersproject/providers';
import {
  CHAIN_METADATA,
  NETWORKS_WITH_CUSTOM_REGISTRY,
  SupportedNetworks,
  getSupportedNetworkByChainId,
} from './constants';
import {translateToNetworkishName} from './library';
import {
  SdkSupportedNetworks,
  getLatestNetworkDeployment,
} from './customHelpers';

class AragonGateway {
  private rpcVersion = '1.0';
  private ipfsVersion = '1.0';
  private baseUrl = import.meta.env.VITE_GATEWAY_URL as string;

  getRpcProvider = (
    chainIdOrNetwork: number | SupportedNetworks
  ): JsonRpcProvider => {
    let network = this.parseNetwork(chainIdOrNetwork);

    // Default provider to nationsfirst for unsupported networks
    if (network == null || network === 'unsupported') {
      network = 'nationsfirst';
    }

    const sdkNetwork = translateToNetworkishName(
      network
    ) as SdkSupportedNetworks;

    console.log('TEST123', {network});

    const options: Networkish = {
      chainId: CHAIN_METADATA[network].id,
      name: sdkNetwork,
    };

    if (NETWORKS_WITH_CUSTOM_REGISTRY.includes(network)) {
      options.ensAddress =
        getLatestNetworkDeployment(sdkNetwork)?.ENSRegistry?.address;
    }

    const rpcUrl = this.buildRpcUrl(network)!;
    return new JsonRpcProvider(rpcUrl, options);
  };

  buildRpcUrl = (
    chainIdOrNetwork: number | SupportedNetworks
  ): string | null => {
    const network = this.parseNetwork(chainIdOrNetwork);

    if (network == null || network === 'unsupported') {
      return null;
    }

    const {publicRpc} = CHAIN_METADATA[network];
    // const gatewayKey =
    //   network === 'zksyncSepolia' || network === 'zksyncMainnet'
    //     ? import.meta.env.VITE_GATEWAY_RPC_API_KEY_ALCHEMY
    //     : import.meta.env.VITE_GATEWAY_RPC_API_KEY;
    //
    // const baseUrl =
    //   network === 'zksyncSepolia' || network === 'zksyncMainnet'
    //     ? this.baseUrl.replace('app', 'alchemy')
    //     : this.baseUrl;
    //
    // const rpcUrl = `${baseUrl}/v${this.rpcVersion}/rpc/${gatewayNetwork}/${gatewayKey}`;
    return publicRpc;
  };

  private parseNetwork = (
    chainIdOrNetwork: number | SupportedNetworks
  ): SupportedNetworks | undefined => {
    const network =
      typeof chainIdOrNetwork === 'number'
        ? getSupportedNetworkByChainId(chainIdOrNetwork)
        : chainIdOrNetwork;

    return network;
  };
}

export const aragonGateway = new AragonGateway();
