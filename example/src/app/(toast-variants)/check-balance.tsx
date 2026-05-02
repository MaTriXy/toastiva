import MaskedView from "@react-native-masked-view/masked-view";
import { useFonts } from "expo-font";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { SymbolView } from "expo-symbols";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { toastiva } from "toastiva";
import { MatchedGeometry } from "../../../reacticx-components/matched-geometry";
import SegmentedControl from "../../../reacticx-components/segmented-controls";
import { SquircleView } from "../../../reacticx-components/squircle-view";

const STOCK_OUTPERFORMANCE = 4.2;

const PFP: string = `https://i.pinimg.com/1200x/2a/35/f4/2a35f40dbb2b21fa538064fb6788cf1e.jpg`;

type Asset = {
  name: string;
  symbol: Parameters<typeof SymbolView>[0]["name"];
  amount: string;
  delta: string;
  positive: boolean;
};

const ASSETS: Asset[] = [
  {
    name: "Stocks",
    symbol: "chart.line.uptrend.xyaxis",
    amount: "$195,000",
    delta: "+5.2%",
    positive: true,
  },
  {
    name: "Real Estate",
    symbol: "house.fill",
    amount: "$146,250",
    delta: "-2.8%",
    positive: false,
  },
  {
    name: "Crypto",
    symbol: "bitcoinsign.circle.fill",
    amount: "$84,120",
    delta: "+12.4%",
    positive: true,
  },
  {
    name: "Cash",
    symbol: "dollarsign.circle.fill",
    amount: "$62,170",
    delta: "+0.3%",
    positive: true,
  },
];

const CheckBalance = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const [fontsLoaded] = useFonts({
    SfProRoundedMedium: require("@/assets/fonts/SF-Pro-Rounded-Medium.otf"),
    SfProRoundedRegular: require("@/assets/fonts/SF-Pro-Rounded-Regular.otf"),
  });

  const progress = useSharedValue<number>(0);

  useEffect(() => {
    progress.value = withTiming(tabIndex, { duration: 250 });
  }, [tabIndex]);

  const animatedTextStyles0 = useAnimatedStyle(() => ({
    color: withSpring(
      interpolateColor(progress.value, [0, 1], ["#1C1C1E", "#8E8E93"]),
    ),
  }));

  const animatedTextStyles1 = useAnimatedStyle(() => ({
    color: withSpring(
      interpolateColor(progress.value, [0, 1], ["#8E8E93", "#1C1C1E"]),
    ),
  }));
  const insets = useSafeAreaInsets();
  return (
    <>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: insets.top + 20,
          },
        ]}
        contentInsetAdjustmentBehavior="never"
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        <View
          style={[
            styles.topRow,
            {
              paddingBottom: insets.top / 2,
            },
          ]}
        >
          <MatchedGeometry
            id={`pfp-gradient-${Math.floor(Math.random() * 10000)}`}
            {...{
              onPress() {},
            }}
          >
            <Image source={{ uri: PFP }} style={styles.pfp} />
          </MatchedGeometry>
          <View style={styles.topRight}>
            <View style={styles.iconCircle}>
              <SymbolView
                name="magnifyingglass"
                size={18}
                tintColor="#1C1C1E"
                resizeMode="scaleAspectFit"
              />
            </View>
            <View style={styles.iconCircle}>
              <SymbolView
                name="bell"
                size={18}
                tintColor="#1C1C1E"
                resizeMode="scaleAspectFit"
              />
            </View>
          </View>
        </View>

        <SquircleView
          style={styles.netWorthCard}
          cornerRadius={28}
          cornerSmoothing={0.98}
          backgroundColor="#FFFFFF"
        >
          <View style={styles.netWorthInner}>
            <View style={styles.netWorthHeader}>
              <Text
                style={[
                  styles.netWorthLabel,
                  {
                    fontFamily: fontsLoaded ? "SfProRoundedMedium" : undefined,
                  },
                ]}
              >
                Net Worth
              </Text>
              <View style={styles.deltaPill}>
                <Text
                  style={[
                    styles.deltaPillText,
                    {
                      fontFamily:
                        fontsLoaded ? "SfProRoundedMedium" : undefined,
                    },
                  ]}
                >
                  +5%
                </Text>
              </View>
            </View>

            <View style={styles.netWorthAmountRow}>
              <Text
                style={[
                  styles.netWorthAmount,
                  {
                    fontFamily: fontsLoaded ? "SfProRoundedMedium" : undefined,
                  },
                ]}
              >
                $487,540
              </Text>
              <Text
                style={[
                  styles.netWorthCents,
                  {
                    fontFamily: fontsLoaded ? "SfProRoundedMedium" : undefined,
                  },
                ]}
              >
                .10
              </Text>
            </View>

            <View style={styles.actionsRow}>
              <ActionPill
                icon="paperplane.fill"
                label="Send"
                font={fontsLoaded ? "SfProRoundedMedium" : undefined}
              />
              <ActionPill
                icon="circle.lefthalf.filled"
                label="Buy"
                font={fontsLoaded ? "SfProRoundedMedium" : undefined}
              />
              <ActionPill
                icon="sparkle"
                label="Insights"
                font={fontsLoaded ? "SfProRoundedMedium" : undefined}
              />
            </View>
          </View>
        </SquircleView>

        <SquircleView
          style={styles.insightCard}
          cornerRadius={18}
          cornerSmoothing={0.98}
          backgroundColor="#FFFFFF"
        >
          <View style={styles.insightInner}>
            <View style={styles.insightIconTile}>
              <MaskedView
                style={styles.sparkleMask}
                maskElement={
                  <View style={styles.sparkleMaskInner}>
                    <SymbolView
                      name="sparkle"
                      size={38}
                      tintColor="#000"
                      resizeMode="scaleAspectFit"
                    />
                  </View>
                }
              >
                <LinearGradient
                  colors={["#1184f7", "#74d7fb", "#358dff"]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.sparkleMask}
                />
              </MaskedView>
            </View>

            <View style={styles.insightBody}>
              <View style={styles.insightTitleRow}>
                <Text
                  style={[
                    styles.insightTitle,
                    {
                      fontFamily:
                        fontsLoaded ? "SfProRoundedMedium" : undefined,
                    },
                  ]}
                >
                  AI Insight
                </Text>
                <View style={styles.newPill}>
                  <Text
                    style={[
                      styles.newPillText,
                      {
                        fontFamily:
                          fontsLoaded ? "SfProRoundedMedium" : undefined,
                      },
                    ]}
                  >
                    New
                  </Text>
                </View>
              </View>
              <Text
                style={[
                  styles.insightDescription,
                  {
                    fontFamily: fontsLoaded ? "SfProRoundedRegular" : undefined,
                  },
                ]}
              >
                Your stocks are outperforming the market by 4.2%
              </Text>
              <Pressable
                style={styles.learnMore}
                onPress={() =>
                  toastiva("Outperforming the market", {
                    description: `Your stocks are up ${STOCK_OUTPERFORMANCE}% vs. the S&P 500 this month.`,
                    animationPreset: "gentle",
                    icon: (
                      <SymbolView
                        name="sparkles"
                        size={16}
                        tintColor="#1C1C1E"
                      />
                    ),
                    bodyRadius: 20,
                    fill: "#FFFFFF",
                    stroke: "#E5E5EA",
                    showProgress: false,
                    showIconBadge: false,
                    showTimestamp: false,
                    bodyLayout: "center",
                    dismissible: true,
                    duration: 4500,
                    styles: {
                      title: {
                        color: "#1C1C1E",
                        fontWeight: "700",
                        paddingRight: 20,
                        fontFamily:
                          fontsLoaded ? "SfProRoundedMedium" : undefined,
                      },
                      description: {
                        color: "#3C3C43",
                        paddingTop: 2,
                        fontFamily:
                          fontsLoaded ? "SfProRoundedRegular" : undefined,
                      },
                    },
                  })
                }
              >
                <Text style={styles.learnMoreText}>Learn more</Text>
              </Pressable>
            </View>
          </View>
        </SquircleView>

        <View style={styles.segmentWrap}>
          <SegmentedControl
            currentIndex={tabIndex}
            onChange={setTabIndex}
            preset="light"
            borderRadius={24}
            paddingVertical={15}
          >
            <Animated.Text
              style={[
                styles.segmentText,
                animatedTextStyles0,
                {
                  fontFamily: fontsLoaded ? "SfProRoundedMedium" : undefined,
                },
              ]}
            >
              Performance
            </Animated.Text>
            <Animated.Text
              style={[
                styles.segmentText,
                animatedTextStyles1,
                {
                  fontFamily: fontsLoaded ? "SfProRoundedMedium" : undefined,
                },
              ]}
            >
              Allocation
            </Animated.Text>
          </SegmentedControl>
        </View>

        <SquircleView
          style={styles.assetsCard}
          cornerRadius={28}
          cornerSmoothing={0.98}
          backgroundColor="#FFFFFF"
        >
          <View style={styles.assetsInner}>
            <View style={styles.assetsHeader}>
              <Text
                style={[
                  styles.assetsTitle,
                  {
                    fontFamily: fontsLoaded ? "SfProRoundedMedium" : undefined,
                  },
                ]}
              >
                Your Assets
              </Text>
              <Pressable style={styles.seeAllBtn}>
                <Text
                  style={[
                    styles.seeAllText,
                    {
                      fontFamily:
                        fontsLoaded ? "SfProRoundedMedium" : undefined,
                    },
                  ]}
                >
                  See All
                </Text>
              </Pressable>
            </View>

            {ASSETS.map((asset, idx) => (
              <View key={asset.name}>
                <View style={styles.assetRow}>
                  <View style={styles.assetIconWrap}>
                    <SymbolView
                      name={asset.symbol}
                      size={20}
                      tintColor="#1C1C1E"
                      resizeMode="scaleAspectFit"
                    />
                  </View>
                  <Text
                    style={[
                      styles.assetName,
                      {
                        fontFamily:
                          fontsLoaded ? "SfProRoundedMedium" : undefined,
                      },
                    ]}
                  >
                    {asset.name}
                  </Text>
                  <Text
                    style={[
                      styles.assetAmount,
                      {
                        fontFamily:
                          fontsLoaded ? "SfProRoundedMedium" : undefined,
                      },
                    ]}
                  >
                    {asset.amount}
                  </Text>
                  <View
                    style={[
                      styles.assetDelta,
                      {
                        backgroundColor: asset.positive ? "#D6F5E5" : "#FBD7D7",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.assetDeltaText,
                        {
                          color: asset.positive ? "#0F9D58" : "#D0342C",
                          fontFamily:
                            fontsLoaded ? "SfProRoundedMedium" : undefined,
                        },
                      ]}
                    >
                      {asset.delta}
                    </Text>
                  </View>
                </View>
                {idx < ASSETS.length - 1 && <View style={styles.divider} />}
              </View>
            ))}
          </View>
        </SquircleView>
      </ScrollView>
    </>
  );
};

const ActionPill = ({
  icon,
  label,
  font,
}: {
  icon: Parameters<typeof SymbolView>[0]["name"];
  label: string;
  font?: string | undefined;
}) => (
  <View style={styles.actionPill}>
    <SymbolView
      name={icon}
      size={14}
      tintColor="#1C1C1E"
      resizeMode="scaleAspectFit"
    />
    <Text style={[styles.actionPillText, { fontFamily: font }]}>{label}</Text>
  </View>
);

export default CheckBalance;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#EDEDED",
  },
  scrollContent: {
    paddingHorizontal: 16,

    paddingBottom: 40,
    gap: 16,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  pfp: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  topRight: {
    flexDirection: "row",
    gap: 10,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  netWorthCard: {
    overflow: "hidden",
  },
  netWorthInner: {
    padding: 20,
  },
  netWorthHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  netWorthLabel: {
    fontSize: 14,
    color: "#8E8E93",
    fontWeight: "500",
  },
  deltaPill: {
    backgroundColor: "#D6F5E5",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  deltaPillText: {
    color: "#0F9D58",
    fontSize: 13,
    fontWeight: "600",
  },
  netWorthAmountRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 6,
  },
  netWorthAmount: {
    fontSize: 40,
    fontWeight: "700",
    color: "#1C1C1E",
    letterSpacing: -0.5,
  },
  netWorthCents: {
    fontSize: 28,
    color: "#C7C7CC",
    marginBottom: 4,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 18,
  },
  actionPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#F2F2F7",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 22,
  },
  actionPillText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1C1C1E",
  },
  insightCard: {
    overflow: "hidden",
  },
  insightInner: {
    flexDirection: "row",
    padding: 18,
    gap: 14,
  },
  insightIconTile: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#F2F2F7",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  insightIconCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  sparkleCenter: {
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },
  sparkleMask: {
    width: 28,
    height: 28,
  },
  sparkleMaskInner: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  insightBody: {
    flex: 1,
  },
  insightTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  insightTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1C1C1E",
  },
  newPill: {
    backgroundColor: "#E0F0FF",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  newPillText: {
    color: "#0A84FF",
    fontSize: 12,
  },
  insightDescription: {
    fontSize: 14,
    color: "#3C3C43",
    marginTop: 4,
    maxWidth: "90%",
  },
  learnMore: {
    alignSelf: "flex-start",
    marginTop: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E5E5EA",
  },
  learnMoreText: {
    fontSize: 14,
    color: "#1C1C1E",
    fontWeight: "500",
  },
  segmentWrap: {
    alignItems: "center",
  },
  segmentText: {
    textAlign: "center",
    fontSize: 15,

    color: "#8E8E93",
  },
  segmentTextActive: {
    color: "#1C1C1E",
  },
  assetsCard: {
    overflow: "hidden",
  },
  assetsInner: {
    padding: 20,
  },
  assetsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  assetsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1C1C1E",
  },
  seeAllBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E5EA",
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#1C1C1E",
  },
  assetRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    gap: 12,
  },
  assetIconWrap: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  assetName: {
    flex: 1,
    fontSize: 16,
    color: "#1C1C1E",
    fontWeight: "500",
  },
  assetAmount: {
    fontSize: 15,
    color: "#3C3C43",
    fontWeight: "500",
    marginRight: 10,
  },
  assetDelta: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  assetDeltaText: {
    fontSize: 12,
    fontWeight: "600",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#E5E5EA",
    marginLeft: 40,
  },
});
