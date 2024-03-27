import React, {
  FunctionComponent,
  ReactPropTypes,
  useEffect,
  useState,
} from "react";
import {
  Image,
  View,
  Keyboard,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  useWindowDimensions,
  ImageBackground,
  FlatList,
} from "react-native";
import { Text } from "@src/components/text";
import { useStyle } from "../../styles";
import { TextInput } from "../../components/input";
import { PageWithScrollView, PageWithView } from "../../components/page";
import { useNavigation } from "@react-navigation/core";
import { TouchableOpacity } from "react-native-gesture-handler";
import { _keyExtract, checkValidDomain } from "../../utils/helper";
import { useStore } from "../../stores";
import { SwtichTab } from "./components/switch-tabs";
import { BrowserFooterSection } from "./components/footer-section";
import { WebViewStateContext } from "./components/context";
import { observer } from "mobx-react-lite";
import {
  RightArrowIcon,
  SearchIcon,
  SearchLightIcon,
  XIcon,
} from "../../components/icon";
import { useTheme } from "@src/themes/theme-provider";
import OWFlatList from "@src/components/page/ow-flat-list";
import { InjectedProviderUrl } from "./config";
import { SCREENS } from "@src/common/constants";
import OWText from "@src/components/text/ow-text";
import { OWButton } from "@src/components/button";
import OWIcon from "@src/components/ow-icon/ow-icon";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { OWBox } from "@src/components/card";
import images from "@src/assets/images";

const explorerData = [
  {
    images: images.img_scan,
    logo: images.dapps_scan_logo,
    title: "OraiScan",
    subTitle: "The Oraichain blockchain explorer",
  },
];
const aiData = [
  {
    images: images.img_defi_lens,
    logo: images.dapps_defi_logo,
    title: "DeFi Lens",
    subTitle: "Simplify your Token Research with AI",
  },
  {
    images: images.img_chatbot,
    logo: images.dapps_defi_logo,
    title: "LLM Chatbot",
    subTitle: "Natural language layer for Web3 Business",
  },
  {
    images: images.img_airight,
    logo: images.dapps_airight_logo,
    title: "aiRight",
    subTitle: "Marketplace of Generative AI",
  },
];
const defiData = [
  {
    images: images.img_oraidex,
    logo: images.dapps_dex_logo,
    title: "OraiDEX",
    subTitle: "Universal swap, Bridge and earn tokens",
  },

  {
    images: images.img_orderbook,
    logo: images.dapps_orderbook_logo,
    title: "Orderbook",
    subTitle: "Decentralized spot trading",
  },
  {
    images: images.img_fu,
    logo: images.dapps_future_logo,
    title: "Futures",
    subTitle: "Derivatives Trading",
  },
  {
    images: images.img_orchai,
    logo: images.dapps_orchai_logo,
    title: "Orchai",
    subTitle: "Low-code DeFi Management",
  },
];
const dataAll = [...defiData, ...aiData, ...explorerData];
const AllRoute = () => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 4,
        paddingVertical: 16,
        backgroundColor: colors["neutral-surface-card"],
      }}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        data={dataAll}
        numColumns={2}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                flex: 1,
                padding: 4,
              }}
            >
              <ImageBackground
                style={{
                  width: "100%",
                  height: 160,
                }}
                imageStyle={{ borderRadius: 12 }}
                resizeMode={"cover"}
                source={item.images}
              >
                <View
                  style={{
                    paddingHorizontal: 16,
                    justifyContent: "center",
                    flex: 1,
                  }}
                >
                  <OWIcon type={"images"} source={item.logo} size={32} />
                  <OWText
                    size={16}
                    weight={"600"}
                    style={{
                      color: "#EBEDF2",
                      paddingTop: 8,
                    }}
                  >
                    {item.title}
                  </OWText>
                  <OWText
                    size={13}
                    weight={"400"}
                    style={{
                      color: "#909298",
                    }}
                  >
                    {item.subTitle}
                  </OWText>
                </View>
              </ImageBackground>
            </View>
          );
        }}
      />
    </View>
  );
};

const DefiRoute = () => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 4,
        paddingVertical: 16,
        backgroundColor: colors["neutral-surface-card"],
      }}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        data={defiData}
        numColumns={2}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                flex: 1,
                padding: 4,
              }}
            >
              <ImageBackground
                style={{
                  width: "100%",
                  height: 160,
                }}
                imageStyle={{ borderRadius: 12 }}
                resizeMode={"cover"}
                source={item.images}
              >
                <View
                  style={{
                    paddingHorizontal: 16,
                    justifyContent: "center",
                    flex: 1,
                  }}
                >
                  <OWIcon type={"images"} source={item.logo} size={32} />
                  <OWText
                    size={16}
                    weight={"600"}
                    style={{
                      color: "#EBEDF2",
                      paddingTop: 8,
                    }}
                  >
                    {item.title}
                  </OWText>
                  <OWText
                    size={13}
                    weight={"400"}
                    style={{
                      color: "#909298",
                    }}
                  >
                    {item.subTitle}
                  </OWText>
                </View>
              </ImageBackground>
            </View>
          );
        }}
      />
    </View>
  );
};
const AiRoute = () => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 4,
        paddingVertical: 16,
        backgroundColor: colors["neutral-surface-card"],
      }}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        data={aiData}
        numColumns={2}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                flex: 1,
                padding: 4,
              }}
            >
              <ImageBackground
                style={{
                  width: "100%",
                  height: 160,
                }}
                imageStyle={{ borderRadius: 12 }}
                resizeMode={"cover"}
                source={item.images}
              >
                <View
                  style={{
                    paddingHorizontal: 16,
                    justifyContent: "center",
                    flex: 1,
                  }}
                >
                  <OWIcon type={"images"} source={item.logo} size={32} />
                  <OWText
                    size={16}
                    weight={"600"}
                    style={{
                      color: "#EBEDF2",
                      paddingTop: 8,
                    }}
                  >
                    {item.title}
                  </OWText>
                  <OWText
                    size={13}
                    weight={"400"}
                    style={{
                      color: "#909298",
                    }}
                  >
                    {item.subTitle}
                  </OWText>
                </View>
              </ImageBackground>
            </View>
          );
        }}
      />
    </View>
  );
};
const ExplorerRoute = () => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 4,
        paddingVertical: 16,
        backgroundColor: colors["neutral-surface-card"],
      }}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        data={explorerData}
        numColumns={2}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                flex: 1,
                padding: 4,
              }}
            >
              <ImageBackground
                style={{
                  width: "100%",
                  height: 160,
                }}
                imageStyle={{ borderRadius: 12 }}
                resizeMode={"cover"}
                source={item.images}
              >
                <View
                  style={{
                    paddingHorizontal: 16,
                    justifyContent: "center",
                    flex: 1,
                  }}
                >
                  <OWIcon type={"images"} source={item.logo} size={32} />
                  <OWText
                    size={16}
                    weight={"600"}
                    style={{
                      color: "#EBEDF2",
                      paddingTop: 8,
                    }}
                  >
                    {item.title}
                  </OWText>
                  <OWText
                    size={13}
                    weight={"400"}
                    style={{
                      color: "#909298",
                    }}
                  >
                    {item.subTitle}
                  </OWText>
                </View>
              </ImageBackground>
            </View>
          );
        }}
      />
    </View>
  );
};
const renderScene = SceneMap({
  all: AllRoute,
  defi: DefiRoute,
  ai: AiRoute,
  explorer: ExplorerRoute,
});

interface BrowserProps extends ReactPropTypes {
  route: {
    params: { url?: string };
  };
}

export const useInjectedSourceCode = () => {
  const [code, setCode] = useState<string | undefined>();

  useEffect(() => {
    fetch(InjectedProviderUrl)
      .then((res) => {
        return res.text();
      })
      .then((res) => {
        setCode(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return code;
};

export const BrowserBookmark: FunctionComponent<{}> = ({}) => {
  const style = useStyle();
  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <View
      style={{ borderBottomColor: colors["border"], borderBottomWidth: 0.2 }}
    >
      <View
        style={style.flatten([
          "width-full",
          "height-66",
          "flex-row",
          "justify-between",
          "items-center",
          "padding-20",
        ])}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            color: colors["label"],
          }}
        >
          Bookmarks
          <Text
            style={{
              fontSize: 18,
              fontWeight: "400",
              color: colors["label"],
            }}
          >
            (recent history)
          </Text>
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("BookMarks")}>
          <Text
            weight="400"
            size={14}
            color={colors["primary-surface-default"]}
          >
            View all
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const Browser: FunctionComponent<BrowserProps> = observer((props) => {
  const style = useStyle();
  const [isSwitchTab, setIsSwitchTab] = useState(false);
  const navigation = useNavigation();
  const { deepLinkUriStore, browserStore } = useStore();
  const { colors } = useTheme();

  useEffect(() => {
    navigation
      .getParent()
      ?.setOptions({ tabBarStyle: { display: "none" }, tabBarVisible: false });
    return () =>
      navigation
        .getParent()
        ?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
  }, [navigation]);

  const [url, setUrl] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const sourceCode = useInjectedSourceCode();

  const handleNavigateDapp = ({ name, uri }) => {
    if (sourceCode) {
      navigation.navigate(SCREENS.WebDApp, {
        name: name,
        uri: uri,
        sourceCode,
      });
    } else {
      setTimeout(() => {
        navigation.navigate(SCREENS.WebDApp, {
          name: name,
          uri: uri,
          sourceCode,
        });
      }, 1000);
    }
  };

  useEffect(() => {
    setTimeout(function () {
      if (checkValidDomain(props?.route?.params?.url?.toLowerCase())) {
        const tabUri =
          props.route.params.url?.toLowerCase().indexOf("http") >= 0
            ? props.route.params.url?.toLowerCase()
            : "https://" + props.route.params?.url?.toLowerCase();

        handleNavigateDapp({ name: tabUri, uri: tabUri });
      }
    }, 1000);
  }, [props?.route?.params?.url]);

  useEffect(() => {
    setTimeout(function () {
      deepLinkUriStore.updateDeepLink("");
      if (checkValidDomain(deepLinkUriStore.link.toLowerCase())) {
        const tabUri =
          deepLinkUriStore.link?.toLowerCase().indexOf("http") >= 0
            ? deepLinkUriStore.link?.toLowerCase()
            : "https://" + deepLinkUriStore.link?.toLowerCase();
        handleNavigateDapp({ name: tabUri, uri: tabUri });
      }
    }, 1000);
  }, []);

  const onHandleUrl = (uri) => {
    let currentUri = uri ?? url;
    if (currentUri !== "") {
      if (checkValidDomain(currentUri?.toLowerCase())) {
        const tab = {
          id: Date.now(),
          name: currentUri,
          uri:
            currentUri?.toLowerCase().indexOf("http") >= 0
              ? currentUri?.toLowerCase()
              : "https://" + currentUri?.toLowerCase(),
        };

        let tabOpened = browserStore.checkTabOpen(tab);

        browserStore.updateSelectedTab(tabOpened ?? tab);
        if (!!!tabOpened) {
          browserStore.addTab(tab);
        }
        setUrl(currentUri);
        handleNavigateDapp(tab);
      } else {
        let uri = `https://www.google.com/search?q=${currentUri ?? ""}`;
        handleNavigateDapp({ name: "Google", uri: uri });
      }
    }
  };

  const handlePressItem = ({ name, uri }) => {
    handleNavigateDapp({ name: name, uri: uri });
    setIsSwitchTab(false);
    setUrl(uri);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const renderBrowser = () => {
    return (
      <View style={styles.container} onLayout={() => {}}>
        <TextInput
          containerStyle={{
            width: "100%",
            paddingHorizontal: 20,
          }}
          inputStyle={[
            StyleSheet.flatten([
              style.flatten([
                "flex-row",
                "items-center",
                "padding-16",
                "border-radius-8",
              ]),
            ]),
            {
              backgroundColor: colors["background"],
              borderColor: colors["border"],
            },
          ]}
          returnKeyType={"next"}
          placeholder={"Search website"}
          placeholderTextColor={"#AEAEB2"}
          onSubmitEditing={(e) => onHandleUrl(e.nativeEvent.text)}
          value={url}
          onChangeText={(txt) => setUrl(txt.toLowerCase())}
          inputLeft={
            <TouchableOpacity style={{ paddingRight: 16 }}>
              <SearchLightIcon />
            </TouchableOpacity>
          }
          inputRight={
            url ? (
              <TouchableOpacity
                style={{ width: 30 }}
                onPress={() => setUrl("")}
              >
                <XIcon />
              </TouchableOpacity>
            ) : null
          }
        />

        <BrowserBookmark />

        {sourceCode ? (
          <OWFlatList
            style={{
              paddingHorizontal: 20,
              // paddingTop: 20
            }}
            data={browserStore.getBookmarks}
            keyExtractor={_keyExtract}
            ListHeaderComponent={() => (
              <>
                <View style={{}}>
                  <TouchableOpacity
                    key={`https://orderbook.oraidex.io/`}
                    style={style.flatten([
                      "height-44",
                      "margin-bottom-15",
                      "flex-row",
                    ])}
                    onPress={() => onHandleUrl(`https://orderbook.oraidex.io/`)}
                  >
                    <View style={style.flatten(["padding-top-5"])}>
                      <Image
                        style={{
                          width: 20,
                          height: 22,
                        }}
                        source={require("../../assets/image/webpage/orai_logo.png")}
                        fadeDuration={0}
                      />
                    </View>
                    <View style={style.flatten(["padding-x-15"])}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "700",
                          color: colors["label"],
                        }}
                      >
                        {`Orderbook`}
                      </Text>
                      <Text
                        style={{ color: colors["sub-text"], fontSize: 14 }}
                      >{`https://orderbook.oraidex.io/`}</Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={{}}>
                  <TouchableOpacity
                    key={`https://futures.oraidex.io/`}
                    style={style.flatten([
                      "height-44",
                      "margin-bottom-15",
                      "flex-row",
                    ])}
                    onPress={() => onHandleUrl(`https://futures.oraidex.io/`)}
                  >
                    <View style={style.flatten(["padding-top-5"])}>
                      <Image
                        style={{
                          width: 20,
                          height: 22,
                        }}
                        source={require("../../assets/image/webpage/orai_logo.png")}
                        fadeDuration={0}
                      />
                    </View>
                    <View style={style.flatten(["padding-x-15"])}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "700",
                          color: colors["label"],
                        }}
                      >
                        {`Futures`}
                      </Text>
                      <Text
                        style={{ color: colors["sub-text"], fontSize: 14 }}
                      >{`https://futures.oraidex.io/`}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </>
            )}
            renderItem={({ item }) => {
              const e = item;
              return (
                <TouchableOpacity
                  key={e.id ?? e.uri}
                  style={style.flatten([
                    "height-44",
                    "margin-bottom-15",
                    "flex-row",
                  ])}
                  onPress={() => onHandleUrl(e.uri)}
                >
                  <View style={style.flatten(["padding-top-5"])}>
                    <Image
                      style={{
                        width: 20,
                        height: 22,
                      }}
                      source={e.logo}
                      fadeDuration={0}
                    />
                  </View>
                  <View style={style.flatten(["padding-x-15"])}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "700",
                        color: colors["label"],
                      }}
                    >
                      {e.name}
                    </Text>
                    <Text style={{ color: colors["sub-text"], fontSize: 14 }}>
                      {e.uri}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        ) : (
          <View style={style.flatten(["padding-top-5"])}>
            <ActivityIndicator size={"small"} />
          </View>
        )}
      </View>
    );
  };
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "all", title: "All" },
    { key: "defi", title: "DeFi" },
    { key: "ai", title: "AI" },
    { key: "explorer", title: "Explorer" },
  ]);
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: colors["primary-surface-default"] }}
      style={{ backgroundColor: colors["neutral-surface-card"], height: 50 }}
      labelStyle={{
        fontSize: 16,
        fontWeight: "600",
      }}
      renderLabel={({ route, focused, color }) => (
        <OWText style={{ color, fontSize: 16 }}>{route.title}</OWText>
      )}
      // scrollEnabled={true}
      activeColor={colors["primary-surface-default"]}
      inactiveColor={colors["neutral-text-body"]}
    />
  );
  return (
    // <PageWithView disableSafeArea backgroundColor={colors["background"]}>
    //   {isSwitchTab ? (
    //     <SwtichTab onPressItem={handlePressItem} />
    //   ) : (
    //     renderBrowser()
    //   )}
    //   <WebViewStateContext.Provider
    //     value={{
    //       webView: null,
    //       name: "Browser",
    //       url: url,
    //       canGoBack: false,
    //       canGoForward: false,
    //     }}
    //   >
    //     <BrowserFooterSection
    //       isSwitchTab={isSwitchTab}
    //       setIsSwitchTab={setIsSwitchTab}
    //       onHandleUrl={onHandleUrl}
    //       typeOf={"browser"}
    //     />
    //   </WebViewStateContext.Provider>
    // </PageWithView>
    <PageWithView
      style={{
        backgroundColor: colors["neutral-surface-action"],
        flexGrow: 1,
      }}
    >
      <TextInput
        inputLeft={
          <View
            style={{
              paddingRight: 8,
            }}
          >
            <SearchIcon
              size={14}
              color={colors["neutral-text-action-on-light-bg"]}
            />
          </View>
        }
        placeholder={"Search URL"}
        placeholderTextColor={colors["neutral-text-body"]}
        inputStyle={{
          backgroundColor: colors["neutral-surface-action"],
          borderWidth: 0,
          borderRadius: 999,
        }}
        containerStyle={{
          paddingHorizontal: 16,
          paddingTop: 16,
          backgroundColor: colors["neutral-surface-card"],
        }}
      />
      <View
        style={{
          padding: 16,
        }}
      >
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <OWText size={16} weight={"600"}>
              Bookmarks
            </OWText>
            <OWButton
              label={"View all"}
              type={"link"}
              fullWidth={false}
              size={"medium"}
              textStyle={{
                fontWeight: "600",
                fontSize: 14,
              }}
              iconRight={
                <View
                  style={{
                    paddingLeft: 10,
                  }}
                >
                  <RightArrowIcon
                    color={colors["primary-surface-default"]}
                    height={14}
                  />
                </View>
              }
            />
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View
              style={{
                alignItems: "center",
                marginHorizontal: 16,
              }}
            >
              <OWIcon
                size={30}
                type={"images"}
                source={{
                  uri: "https://assets.coingecko.com/coins/images/16724/standard/osmo.png",
                }}
              />
              <OWText
                style={{
                  paddingTop: 3,
                }}
                color={colors["neutral-text-title"]}
                size={14}
                weight={"400"}
              >
                Osmosis
              </OWText>
            </View>
            <View
              style={{
                alignItems: "center",
                marginHorizontal: 16,
              }}
            >
              <OWIcon
                size={30}
                type={"images"}
                source={{
                  uri: "https://assets.coingecko.com/coins/images/28104/standard/oraix.png",
                }}
              />
              <OWText
                style={{
                  paddingTop: 3,
                }}
                color={colors["neutral-text-title"]}
                size={14}
                weight={"400"}
              >
                Oraidex
              </OWText>
            </View>
            <View
              style={{
                alignItems: "center",
                marginHorizontal: 16,
              }}
            >
              <OWIcon
                size={30}
                type={"images"}
                source={{
                  uri: "https://assets.coingecko.com/coins/images/12271/standard/512x512_Logo_no_chop.png",
                }}
              />
              <OWText
                style={{
                  paddingTop: 3,
                }}
                color={colors["neutral-text-title"]}
                size={14}
                weight={"400"}
              >
                Sushiswap
              </OWText>
            </View>
            <View
              style={{
                alignItems: "center",
                marginHorizontal: 16,
              }}
            >
              <OWIcon
                size={30}
                type={"images"}
                source={{
                  uri: "https://assets.coingecko.com/coins/images/16724/small/osmo.png",
                }}
              />
              <OWText
                style={{
                  paddingTop: 3,
                }}
                color={colors["neutral-text-title"]}
                size={14}
                weight={"400"}
              >
                Osmosis
              </OWText>
            </View>
          </ScrollView>
        </View>
      </View>
      <View
        style={{
          backgroundColor: colors["neutral-surface-card"],
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          padding: 16,
        }}
      >
        <OWText size={22} weight={"700"}>
          Discover Apps
        </OWText>
      </View>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
        initialLayout={{ width: layout.width }}
        style={{
          flex: 1,
        }}
      />
    </PageWithView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 80,
    marginTop: 24,
  },
});
