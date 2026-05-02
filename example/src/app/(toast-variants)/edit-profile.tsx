import { useFonts } from "expo-font";
import { Image } from "expo-image";
import { Stack, useRouter } from "expo-router";
import { SymbolView, type SymbolViewProps } from "expo-symbols";
import React, { useCallback, useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { toastiva, ToastivaProvider } from "toastiva";
import { SquircleView } from "../../../reacticx-components/squircle-view";

type ActivityStatus = "active" | "idle";

const STATUS_META: Record<
  ActivityStatus,
  { label: string; dot: string; symbol: SymbolViewProps["name"]; tint: string }
> = {
  active: {
    label: "Active",
    dot: "#34C759",
    symbol: "bolt.fill",
    tint: "#3A3A3C",
  },
  idle: {
    label: "Idle",
    dot: "#FF9F0A",
    symbol: "moon.fill",
    tint: "#3A3A3C",
  },
};

const PFP: string = `https://i.pinimg.com/1200x/d4/24/f6/d424f6eef044d7753a82f18d1843b9f5.jpg`;

const ROW_HEIGHT = 56;

type ProfileRow = {
  title: string;
  symbol: SymbolViewProps["name"];
  iconColor: string;
  iconBackground?: string;
  trailing?: React.ReactNode;
  onPress?: () => void;
};

type ProfileSection = {
  header?: string;
  rows: ProfileRow[];
};

const ActivityTrailing = ({
  status,
  fontFamily,
}: {
  status: ActivityStatus;
  fontFamily?: string;
}) => {
  const meta = STATUS_META[status];
  return (
    <View style={styles.activityTrailing}>
      <View style={[styles.activityDot, { backgroundColor: meta.dot }]} />
      <Text style={[styles.activityValue, fontFamily ? { fontFamily } : null]}>
        {meta.label}
      </Text>
    </View>
  );
};

const StatusToast = ({
  status,
  fontFamily,
  fontFamilyMedium,
}: {
  status: ActivityStatus;
  fontFamily?: string;
  fontFamilyMedium?: string;
}) => {
  const meta = STATUS_META[status];
  const description =
    status === "active" ?
      "You're visible to friends and ready to train."
    : "Notifications are quieted while you wind down.";

  return (
    <View style={styles.toastRoot}>
      <View style={[styles.toastIcon, { backgroundColor: meta.dot + "26" }]}>
        <SymbolView
          name={meta.symbol}
          size={20}
          tintColor={meta.dot}
          resizeMode="scaleAspectFit"
        />
      </View>
      <View style={styles.toastBody}>
        <Text
          style={[
            styles.toastTitle,
            fontFamilyMedium ? { fontFamily: fontFamilyMedium } : null,
          ]}
        >
          Status set to {meta.label}
        </Text>
        <Text
          style={[styles.toastDescription, fontFamily ? { fontFamily } : null]}
        >
          {description}
        </Text>
      </View>
    </View>
  );
};

const EditProfile = () => {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    SfProRoundedRegular: require("@/assets/fonts/SF-Pro-Rounded-Regular.otf"),
    SfProRoundedMedium: require("@/assets/fonts/SF-Pro-Rounded-Medium.otf"),
  });

  const fonts = useMemo(
    () => ({
      regular: fontsLoaded ? "SfProRoundedRegular" : undefined,
      medium: fontsLoaded ? "SfProRoundedMedium" : undefined,
    }),
    [fontsLoaded],
  );
  const insets = useSafeAreaInsets();

  const [status, setStatus] = useState<ActivityStatus>("active");

  const toggleStatus = useCallback(() => {
    setStatus((prev) => {
      const next: ActivityStatus = prev === "active" ? "idle" : "active";
      toastiva.custom(
        <StatusToast
          status={next}
          fontFamily={fonts.regular}
          fontFamilyMedium={fonts.medium}
        />,
        {
          showHeader: false,
          fill: "#161616",
          stroke: "rgba(255,255,255,0.10)",
          showProgress: false,
          showIcon: false,
        },
      );
      return next;
    });
  }, [fonts.medium, fonts.regular]);

  const sections = useMemo<ProfileSection[]>(() => {
    const meta = STATUS_META[status];
    return [
      {
        rows: [
          {
            title: "Activity Status",
            symbol: meta.symbol,
            iconColor: "#FFFFFF",
            iconBackground: meta.tint,
            trailing: (
              <ActivityTrailing status={status} fontFamily={fonts.regular} />
            ),
            onPress: toggleStatus,
          },
        ],
      },
      {
        header: "PERSONALIZE",
        rows: [
          {
            title: "Personal Details",
            symbol: "person.crop.circle",
            iconColor: "#E5E5EA",
          },
          {
            title: "Heart Rate Zones",
            symbol: "book.fill",
            iconColor: "#E5E5EA",
          },
        ],
      },
      {
        rows: [
          {
            title: "Settings",
            symbol: "gearshape.fill",
            iconColor: "#E5E5EA",
          },
        ],
      },
      {
        header: "NEED HELP?",
        rows: [
          {
            title: "Tips and Tricks",
            symbol: "sparkles",
            iconColor: "#E5E5EA",
          },
          {
            title: "Frequently Asked Questions",
            symbol: "questionmark.circle.fill",
            iconColor: "#E5E5EA",
          },
          {
            title: "Contact Us",
            symbol: "envelope.fill",
            iconColor: "#E5E5EA",
          },
        ],
      },
      {
        header: "MEMBERSHIP",
        rows: [
          {
            title: "Manage Subscription",
            symbol: "star.fill",
            iconColor: "#E5E5EA",
          },
        ],
      },
    ];
  }, [status, fonts.regular, toggleStatus]);

  return (
    <>
      <ToastivaProvider>
        <Stack.Screen
          options={{
            headerTitle: "",
            headerTransparent: true,
            headerShown: true,
          }}
        />

        <Stack.Toolbar placement="right">
          <Stack.Toolbar.Button
            onPress={() => router.canGoBack() && router.back()}
          >
            <Stack.Toolbar.Label>Close</Stack.Toolbar.Label>
          </Stack.Toolbar.Button>
        </Stack.Toolbar>

        <StatusBar barStyle="light-content" />

        <ScrollView
          style={[styles.scroll, styles.screen]}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingTop: insets.top + 8,
            },
          ]}
          contentInsetAdjustmentBehavior="never"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.profileBlock}>
            <Image
              source={{ uri: PFP }}
              style={styles.avatar}
              contentFit="cover"
              transition={200}
            />
            <Text style={[styles.name, { fontFamily: fonts.medium }]}>
              rit3zh
            </Text>
          </View>

          {sections.map((section, sectionIdx) => (
            <View
              key={`${section.header ?? "group"}-${sectionIdx}`}
              style={styles.section}
            >
              {section.header ?
                <Text
                  style={[styles.sectionHeader, { fontFamily: fonts.medium }]}
                >
                  {section.header}
                </Text>
              : null}

              <SquircleView
                style={styles.card}
                height={section.rows.length * ROW_HEIGHT}
                cornerRadius={32}
                cornerSmoothing={0.49}
                backgroundColor="#1C1C1E"
              >
                {section.rows.map((row, index) => {
                  const isLast = index === section.rows.length - 1;
                  return (
                    <Pressable
                      key={row.title}
                      onPress={row.onPress}
                      style={({ pressed }) => [
                        styles.row,
                        pressed && styles.rowPressed,
                      ]}
                    >
                      <View
                        style={[
                          styles.iconWrap,
                          row.iconBackground ?
                            {
                              backgroundColor: row.iconBackground,
                              borderRadius: 13,
                            }
                          : null,
                        ]}
                      >
                        <SymbolView
                          name={row.symbol}
                          size={row.iconBackground ? 14 : 20}
                          tintColor={row.iconColor}
                          resizeMode="scaleAspectFit"
                        />
                      </View>

                      <Text
                        style={[styles.rowTitle, { fontFamily: fonts.regular }]}
                        numberOfLines={1}
                      >
                        {row.title}
                      </Text>

                      {row.trailing ?
                        <View style={styles.trailingSlot}>{row.trailing}</View>
                      : null}

                      <SymbolView
                        name="chevron.right"
                        size={13}
                        tintColor="#5e5e62"
                        resizeMode="scaleAspectFit"
                        style={styles.chevron}
                      />

                      {!isLast && <View style={styles.separator} />}
                    </Pressable>
                  );
                })}
              </SquircleView>
            </View>
          ))}

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </ToastivaProvider>
    </>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#151517",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,

    paddingBottom: 40,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    height: 32,
    marginBottom: 8,
  },
  closeText: {
    color: "#FFFFFF",
    fontSize: 17,
  },
  profileBlock: {
    alignItems: "center",
    marginTop: 4,
    marginBottom: 28,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#1C1C1E",
  },
  name: {
    color: "#FFFFFF",
    fontSize: 26,
    marginTop: 14,
    letterSpacing: 0.2,
  },
  section: {
    marginBottom: 22,
  },
  sectionHeader: {
    fontSize: 12,
    color: "#8E8E93",
    letterSpacing: 0.8,
    marginBottom: 8,
    marginLeft: 16,
  },
  card: {
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    height: ROW_HEIGHT,
  },
  rowPressed: {
    backgroundColor: "#2C2C2E",
  },
  iconWrap: {
    width: 26,
    height: 26,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  rowTitle: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
  },
  trailingSlot: {
    marginRight: 8,
  },
  activityTrailing: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#34C759",
  },
  activityValue: {
    color: "#FFFFFF",
    fontSize: 15,
  },
  chevron: {
    width: 13,
    height: 13,
    marginLeft: 4,
  },
  separator: {
    position: "absolute",
    left: 54,
    right: 0,
    bottom: 0,
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#2C2C2E",
  },
  bottomSpacer: {
    height: 24,
  },
  toastRoot: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    minWidth: 240,
    maxWidth: 300,
    paddingVertical: 0,
    top: 3,
  },
  toastIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  toastBody: {
    flex: 1,
    justifyContent: "center",
  },
  toastTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 2,
  },
  toastDescription: {
    color: "rgba(255,255,255,0.62)",
    fontSize: 12,
    lineHeight: 16,
  },
});
