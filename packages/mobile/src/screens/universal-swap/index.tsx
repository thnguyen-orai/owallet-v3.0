import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState
} from 'react';
import { PageWithScrollViewInBottomTabView } from '../../components/page';
import { Text } from '@src/components/text';
import { TypeTheme, useTheme } from '@src/themes/theme-provider';
import { observer } from 'mobx-react-lite';
import { Image, Platform, StyleSheet, View } from 'react-native';
import { useStore } from '../../stores';
import { metrics, spacing, typography } from '../../themes';
import { SwapBox } from './components/SwapBox';
import { OWButton } from '@src/components/button';
import OWButtonIcon from '@src/components/button/ow-button-icon';
import { BalanceText } from './components/BalanceText';
import { SelectNetworkModal, SelectTokenModal, SlippageModal } from './modals/';
import {
  ETH_ID,
  KAWAII_ID,
  ORAICHAIN_ID,
  TRON_ID,
  isAndroid
} from '@src/utils/helper';
import { TokenInfo } from './types';
import imagesGlobal from '@src/assets/images';
import images from '@src/assets/images';
import { useCoinGeckoPrices } from '@src/hooks/use-coingecko';
import { DEFAULT_SLIPPAGE } from './config/constants';
import { Address } from '@owallet/crypto';
import useLoadTokens from '@src/hooks/use-load-tokens';
import { oraichainNetwork } from './config/chainInfos';
import { TokenItemType, evmTokens, tokenMap } from './config/bridgeTokens';
import {
  SwapDirection,
  filterTokens,
  getTokenOnOraichain,
  getTokenOnSpecificChainId,
  isSupportedNoPoolSwapEvm
} from './helper';
import { fetchTokenInfos, isEvmSwappable } from './api';
import { CWStargate } from '@src/common/cw-stargate';
import { getTotalUsd, toDisplay, toSubAmount } from './libs/utils';
import { useSimulate } from '@src/hooks/useSimulate';
import { AmountDetails } from './types/token';
import { OraiIcon } from '@src/components/icon/orai';
import FastImage from 'react-native-fast-image';

const tokens: TokenInfo[] = [
  {
    symbol: 'USDT',
    network: 'Ethereum',
    available: '0',
    logo: images.push
  },
  {
    symbol: 'USDT',
    network: 'BSC',
    available: '0',
    logo: images.push_inactive
  },
  {
    symbol: 'ORAI',
    network: 'Oraichain',
    available: '0',
    logo: images.crypto
  },
  {
    symbol: 'AIRI',
    network: 'Oraichain',
    available: '0',
    logo: images.down_center
  },
  {
    symbol: 'ORAIX',
    network: 'Oraichain',
    available: '0',
    logo: images.down_center_dark
  },
  {
    symbol: 'ETH',
    network: 'Ethereum',
    available: '0',
    logo: images.push
  },
  {
    symbol: 'USDT',
    network: 'Ethereum',
    available: '0',
    logo: images.push
  },
  {
    symbol: 'USDT',
    network: 'BSC',
    available: '0',
    logo: images.push_inactive
  },
  {
    symbol: 'ORAI',
    network: 'Oraichain',
    available: '0',
    logo: images.crypto
  },
  {
    symbol: 'AIRI',
    network: 'Oraichain',
    available: '0',
    logo: images.down_center
  },
  {
    symbol: 'ORAIX',
    network: 'Oraichain',
    available: '0',
    logo: images.down_center_dark
  },
  {
    symbol: 'ETH',
    network: 'Ethereum',
    available: '0',
    logo: images.push
  },
  {
    symbol: 'USDT',
    network: 'Ethereum',
    available: '0',
    logo: images.push
  },
  {
    symbol: 'USDT',
    network: 'BSC',
    available: '0',
    logo: images.push_inactive
  },
  {
    symbol: 'ORAI',
    network: 'Oraichain',
    available: '0',
    logo: images.crypto
  },
  {
    symbol: 'AIRI',
    network: 'Oraichain',
    available: '0',
    logo: images.down_center
  },
  {
    symbol: 'ORAIX',
    network: 'Oraichain',
    available: '0',
    logo: images.down_center_dark
  },
  {
    symbol: 'ETH',
    network: 'Ethereum',
    available: '0',
    logo: images.push
  }
];

type BalanceType = {
  id: string;
  value: string;
};
const balances: BalanceType[] = [
  {
    id: '1',
    value: '25'
  },
  {
    id: '2',
    value: '50'
  },
  {
    id: '3',
    value: '75'
  },
  {
    id: '4',
    value: '100'
  }
];
export const UniversalSwapScreen: FunctionComponent = observer(() => {
  const { accountStore, chainStore, universalSwapStore } = useStore();
  const account = accountStore.getAccount(chainStore.current.chainId);
  const accountOrai = accountStore.getAccount(ORAICHAIN_ID);

  const { colors } = useTheme();
  const [isSlippageModal, setIsSlippageModal] = useState(false);
  const [userSlippage, setUserSlippage] = useState(DEFAULT_SLIPPAGE);
  const [tokensAmount, setTokensAmount] = useState({});
  const [swapLoading, setSwapLoading] = useState(false);
  const [loadingRefresh, setLoadingRefresh] = useState(false);
  const [taxRate, setTaxRate] = useState('');
  const [searchTokenName, setSearchTokenName] = useState('');
  const [filteredToTokens, setFilteredToTokens] = useState(
    [] as TokenItemType[]
  );
  const [filteredFromTokens, setFilteredFromTokens] = useState(
    [] as TokenItemType[]
  );

  const [[fromTokenDenom, toTokenDenom], setSwapTokens] = useState<
    [string, string]
  >(['orai', 'usdt']);
  const [[fromTokenInfoData, toTokenInfoData], setTokenInfoData] = useState<
    TokenInfo[]
  >([]);

  console.log('[fromTokenDenom, toTokenDenom]', [fromTokenDenom, toTokenDenom]);

  const { data: prices } = useCoinGeckoPrices();

  console.log('prices ===', prices);
  useEffect(() => {
    handleFetchAmounts();
    setTimeout(() => {
      handleFetchAmounts();
    }, 2000);
  }, []);

  // get token on oraichain to simulate swap amount.
  const originalFromToken = tokenMap[fromTokenDenom];
  const originalToToken = tokenMap[toTokenDenom];
  const isEvmSwap = isEvmSwappable({
    fromChainId: originalFromToken.chainId,
    toChainId: originalToToken.chainId,
    fromContractAddr: originalFromToken.contractAddress,
    toContractAddr: originalToToken.contractAddress
  });

  // if evm swappable then no need to get token on oraichain because we can swap on evm. Otherwise, get token on oraichain. If cannot find => fallback to original token
  const fromToken = isEvmSwap
    ? tokenMap[fromTokenDenom]
    : getTokenOnOraichain(tokenMap[fromTokenDenom].coinGeckoId) ??
      tokenMap[fromTokenDenom];
  const toToken = isEvmSwap
    ? tokenMap[toTokenDenom]
    : getTokenOnOraichain(tokenMap[toTokenDenom].coinGeckoId) ??
      tokenMap[toTokenDenom];

  const getTokenInfos = async () => {
    const client = await CWStargate.init(
      accountOrai,
      ORAICHAIN_ID,
      oraichainNetwork.rpc
    );

    const data = await fetchTokenInfos([fromToken!, toToken!], client);
    setTokenInfoData(data);
    return;
  };

  useEffect(() => {
    getTokenInfos();
  }, []);
  const [isSelectTokenModal, setIsSelectTokenModal] = useState(false);
  const [isNetworkModal, setIsNetworkModal] = useState(false);
  const styles = styling(colors);
  const chainId = chainStore?.current?.chainId;

  const loadTokenAmounts = useLoadTokens(universalSwapStore);
  const handleFetchAmounts = async () => {
    const accounts = await Promise.all([
      accountStore.getAccount(ORAICHAIN_ID),
      accountStore.getAccount(ETH_ID),
      accountStore.getAccount(TRON_ID),
      accountStore.getAccount(KAWAII_ID)
    ]);
    let loadTokenParams = {};
    try {
      accounts.map(async account => {
        if (account.chainId === ORAICHAIN_ID) {
          const cwStargate = {
            account,
            chainId: account.chainId,
            rpc: oraichainNetwork.rpc
          };

          loadTokenParams = {
            ...loadTokenParams,
            oraiAddress: account.bech32Address,
            cwStargate
          };
        }
        if (account.chainId === ETH_ID) {
          loadTokenParams = {
            ...loadTokenParams,
            metamaskAddress: account.evmosHexAddress
          };
        }
        if (account.chainId === TRON_ID) {
          loadTokenParams = {
            ...loadTokenParams,
            tronAddress: Address.getBase58Address(account.evmosHexAddress)
          };
        }
        if (account.chainId === KAWAII_ID) {
          loadTokenParams = {
            ...loadTokenParams,
            kwtAddress: account.bech32Address
          };
        }
      });

      loadTokenAmounts(loadTokenParams);
    } catch (error) {
      console.log('error loadTokenAmounts', error);
    }
  };

  const subAmountFrom = toSubAmount(
    universalSwapStore.getAmount,
    originalFromToken
  );
  const subAmountTo = toSubAmount(
    universalSwapStore.getAmount,
    originalToToken
  );
  const fromTokenBalance = originalFromToken
    ? BigInt(universalSwapStore.getAmount?.[originalFromToken.denom] ?? '0') +
      subAmountFrom
    : BigInt(0);

  console.log('initAmountfromTokenBalance', toDisplay(fromTokenBalance));

  const toTokenBalance = originalToToken
    ? BigInt(universalSwapStore.getAmount?.[originalToToken.denom] ?? '0') +
      subAmountTo
    : BigInt(0);

  console.log('toTokenBalance', toDisplay(toTokenBalance));
  // process filter from & to tokens
  useEffect(() => {
    const filteredToTokens = filterTokens(
      fromToken.chainId,
      fromToken.coinGeckoId,
      fromTokenDenom,
      searchTokenName,
      SwapDirection.To
    );
    setFilteredToTokens(filteredToTokens);

    console.log('filteredToTokens', filteredToTokens);

    const filteredFromTokens = filterTokens(
      toToken.chainId,
      toToken.coinGeckoId,
      toTokenDenom,
      searchTokenName,
      SwapDirection.From
    );
    setFilteredFromTokens(filteredFromTokens);

    console.log('filteredFromTokens', filteredFromTokens);

    // TODO: need to automatically update from / to token to the correct swappable one when clicking the swap button
  }, [fromToken, toToken]);
  const { simulateData, setSwapAmount, fromAmountToken, toAmountToken } =
    useSimulate(
      {
        account: accountOrai,
        chainId: ORAICHAIN_ID,
        rpc: oraichainNetwork.rpc
      },
      fromTokenInfoData,
      toTokenInfoData,
      originalFromToken,
      originalToToken
    );

  console.log('simulateData', simulateData);

  const { toAmountToken: averageRatio } = useSimulate(
    {
      account: accountOrai,
      chainId: ORAICHAIN_ID,
      rpc: oraichainNetwork.rpc
    },
    fromTokenInfoData,
    toTokenInfoData,
    originalFromToken,
    originalToToken,
    1
  );

  useEffect(() => {
    // special case for tokens having no pools on Oraichain. When original from token is not swappable, then we switch to an alternative token on the same chain as to token
    if (
      isSupportedNoPoolSwapEvm(toToken.coinGeckoId) &&
      !isSupportedNoPoolSwapEvm(fromToken.coinGeckoId)
    ) {
      const fromTokenSameToChainId = getTokenOnSpecificChainId(
        fromToken.coinGeckoId,
        toToken.chainId
      );
      if (!fromTokenSameToChainId) {
        const sameChainIdTokens = evmTokens.find(
          t => t.chainId === toToken.chainId
        );
        if (!sameChainIdTokens)
          throw Error(
            'Impossible case!. An evm chain should at least have one token'
          );
        setSwapTokens([sameChainIdTokens.denom, toToken.denom]);
        return;
      }
      setSwapTokens([fromTokenSameToChainId.denom, toToken.denom]);
    }
  }, [fromToken]);

  const [amount, setAmount] = useState({
    from: '1.273',
    to: '0.26'
  });
  const [fee, setFee] = useState({
    from: '0.1',
    to: '0.001'
  });
  const [currencyAmount, setCurrencyAmount] = useState({
    from: '100',
    to: '2000'
  });
  const [balance, setBalance] = useState({
    from: '10',
    to: '200'
  });
  const [activeToken, setActiveToken] = useState<{
    from: TokenInfo;
    to: TokenInfo;
  }>({
    from: {
      symbol: 'ORAI',
      logo: imagesGlobal.push,
      network: 'Oraichain'
    },
    to: {
      symbol: 'ETH',
      logo: imagesGlobal.crypto,
      network: 'Ethereum'
    }
  });
  const [balanceActive, setBalanceActive] = useState<BalanceType>(null);
  const handleAmountFrom = useCallback(
    valueAmount => {
      setAmount(prevAmount => ({
        ...prevAmount,
        from: valueAmount
      }));
    },
    [amount?.from]
  );
  const handleAmountTo = useCallback(
    valueAmount => {
      setAmount(prevAmount => ({
        ...prevAmount,
        to: valueAmount
      }));
    },
    [amount?.to]
  );
  const handleBalanceActive = useCallback(
    (item: BalanceType) => {
      setBalanceActive(item);
    },
    [balanceActive]
  );
  const handleOpenTokensFromModal = useCallback(() => {
    setIsSelectTokenModal(true);
  }, []);
  const handleOpenTokensToModal = useCallback(() => {
    setIsSelectTokenModal(true);
  }, []);
  const handleOnActiveToken = useCallback(token => {
    setActiveToken({
      from: token,
      to: token
    });
  }, []);

  return (
    <PageWithScrollViewInBottomTabView
      backgroundColor={colors['plain-background']}
      style={[styles.container, isAndroid ? styles.pt30 : {}]}
      disableSafeArea={false}
      showsVerticalScrollIndicator={false}
    >
      <SlippageModal
        close={() => {
          setIsSlippageModal(false);
        }}
        isOpen={isSlippageModal}
      />
      <SelectTokenModal
        bottomSheetModalConfig={{
          snapPoints: ['50%', '90%'],
          index: 1
        }}
        data={tokens}
        close={() => {
          setIsSelectTokenModal(false);
        }}
        onNetworkModal={() => {
          setIsNetworkModal(true);
        }}
        onActiveToken={handleOnActiveToken}
        isOpen={isSelectTokenModal}
      />
      <SelectNetworkModal
        close={() => {
          setIsNetworkModal(false);
        }}
        isOpen={isNetworkModal}
      />
      <View>
        <View style={styles.boxTop}>
          <Text color={colors['text-title-login']} variant="h3" weight="700">
            Universal Swap
          </Text>
          <OWButtonIcon
            isBottomSheet
            fullWidth={false}
            style={[styles.btnTitleRight]}
            sizeIcon={24}
            colorIcon={'#7C8397'}
            name="setting-bold"
            onPress={() => {
              setIsSlippageModal(true);
            }}
          />
        </View>
        <View>
          <Text style={{ color: 'red' }}>
            {Object.keys(universalSwapStore?.getAmount ?? {}).length}
          </Text>
          {Object.keys(universalSwapStore?.getAmount ?? {}).map(a => {
            const foundToken = filteredToTokens.find(t => t.denom === a);
            let totalUsd;
            if (foundToken) {
              const subAmounts = Object.fromEntries(
                Object.entries(universalSwapStore?.getAmount).filter(
                  ([denom]) => tokenMap?.[denom]?.chainId === foundToken.chainId
                )
              ) as AmountDetails;

              totalUsd = getTotalUsd(subAmounts, prices, foundToken);
            }

            return (
              <View style={{ flexDirection: 'row' }}>
                {foundToken ? (
                  <View
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: spacing['8'],
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      backgroundColor: colors['gray-10']
                    }}
                  >
                    <FastImage
                      style={{
                        width: 24,
                        height: 24
                      }}
                      resizeMode={FastImage.resizeMode.contain}
                      source={{
                        uri: foundToken.Icon
                      }}
                    />
                  </View>
                ) : (
                  <Text>? - </Text>
                )}
                <Text
                  numberOfLines={1}
                  style={{
                    color: colors['title-modal-login-failed']
                  }}
                >
                  {foundToken?.name ?? '?'} - {foundToken?.org ?? '?'}:{' '}
                </Text>
                <Text style={{ color: colors['text-primary'] }}>
                  {toDisplay(
                    universalSwapStore?.getAmount[a],
                    foundToken?.decimals
                  )}
                  :{' '}
                </Text>
                <Text style={{ color: colors['text-primary'] }}>
                  {totalUsd ? '$' + totalUsd.toFixed(2) : '$0'}
                </Text>
              </View>
            );
          })}
        </View>
        <View>
          <SwapBox
            feeValue={fee?.from}
            amount={amount?.from}
            balanceValue={balance?.from}
            currencyValue={currencyAmount?.from}
            onAmount={handleAmountFrom}
            tokenActive={activeToken?.from}
            onOpenTokenModal={handleOpenTokensFromModal}
          />
          <SwapBox
            feeValue={fee?.to}
            amount={amount?.to}
            balanceValue={balance?.to}
            currencyValue={currencyAmount?.to}
            tokenActive={activeToken?.to}
            onAmount={handleAmountTo}
            onOpenTokenModal={handleOpenTokensToModal}
          />

          <View style={styles.containerBtnCenter}>
            <OWButtonIcon
              fullWidth={false}
              name="arrow_down_2"
              circle
              style={styles.btnSwapBox}
              colorIcon={'#7C8397'}
              sizeIcon={24}
            />
          </View>
        </View>
        <View style={styles.containerBtnBalance}>
          {balances.map((item, index) => {
            return (
              <OWButton
                key={item?.id}
                size="small"
                style={
                  balanceActive?.id === item?.id
                    ? styles.btnBalanceActive
                    : styles.btnBalanceInactive
                }
                textStyle={
                  balanceActive?.id === item?.id
                    ? styles.textBtnBalanceAtive
                    : styles.textBtnBalanceInActive
                }
                label={`${item?.value}%`}
                fullWidth={false}
                onPress={() => handleBalanceActive(item)}
              />
            );
          })}
        </View>
        <OWButton
          label="Swap"
          style={styles.btnSwap}
          loading={false}
          textStyle={styles.textBtnSwap}
          onPress={() => {
            account.handleUniversalSwap(chainId, { key: 'value' });
          }}
        />
        <View style={styles.containerInfoToken}>
          <View style={styles.itemBottom}>
            <BalanceText>Quote</BalanceText>
            <BalanceText>1 0RAI ≈ 357.32 AIRI</BalanceText>
          </View>
          <View style={styles.itemBottom}>
            <BalanceText>Minimum Received</BalanceText>
            <BalanceText>0 USDT</BalanceText>
          </View>
          <View style={styles.itemBottom}>
            <BalanceText>Tax rate</BalanceText>
            <BalanceText>0</BalanceText>
          </View>
        </View>
      </View>
    </PageWithScrollViewInBottomTabView>
  );
});

const styling = (colors: TypeTheme['colors']) =>
  StyleSheet.create({
    textBtnBalanceAtive: {
      color: colors['purple-700']
    },
    textBtnBalanceInActive: {
      color: '#7C8397'
    },
    containerInfoToken: {
      backgroundColor: colors['bg-swap-box'],
      paddingHorizontal: 16,
      borderRadius: 8,
      paddingVertical: 11
    },
    btnBalanceActive: {
      width: metrics.screenWidth / 4 - 16,
      backgroundColor: colors['bg-swap-box'],
      height: 40,
      borderWidth: 1,
      borderColor: colors['purple-700']
    },
    btnBalanceInactive: {
      width: metrics.screenWidth / 4 - 16,
      backgroundColor: colors['bg-swap-box'],
      height: 40
    },
    containerBtnBalance: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 16
    },
    btnSwapBox: {
      backgroundColor: colors['bg-swap-box'],
      borderRadius: 20,
      width: 40,
      height: 40,
      borderWidth: 4,
      borderColor: colors['plain-background']
    },
    pt30: {
      paddingTop: 30
    },
    boxTop: {
      // borderRadius: 8,
      paddingTop: 10,
      paddingBottom: 20,
      // backgroundColor: colors['background-box'],
      marginTop: 4,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    textBtnSwap: {
      fontWeight: '700',
      fontSize: 16
    },
    itemBottom: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 5
    },
    theFirstLabel: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: 10
    },
    ts10: {
      fontSize: 10
    },
    fDr: {
      flexDirection: 'row'
    },
    mr8: {
      marginRight: 8
    },
    btnTitleRight: {
      // backgroundColor: colors['box-nft'],
      height: 30,
      width: 30
      // borderRadius: 5
    },
    containerBtnLabelInputRight: {
      flexDirection: 'row'
    },
    btnLabelInputRight: {
      backgroundColor: colors['bg-tonner'],
      borderRadius: 2,
      height: 22,
      borderWidth: 0
    },
    btnSwap: {
      marginVertical: 16,
      borderRadius: 8
    },
    container: {
      marginHorizontal: 16
    },
    containerBtnCenter: {
      position: 'absolute',
      top: '50%',
      alignSelf: 'center',
      marginTop: -16
    },
    shadowBox: {
      shadowColor: colors['splash-background'],
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 5,
      shadowOpacity: 1.0
    },
    containerScreen: {
      padding: 24,
      paddingTop: 76,
      borderTopLeftRadius: Platform.OS === 'ios' ? 32 : 0,
      borderTopRightRadius: Platform.OS === 'ios' ? 32 : 0
    },
    contentBlock: {
      padding: 12,
      backgroundColor: colors['content-background'],
      borderRadius: 4
    },

    title: {
      ...typography.h1,
      color: colors['icon'],
      textAlign: 'center',
      fontWeight: '700'
    }
  });