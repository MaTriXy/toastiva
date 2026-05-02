import { useFonts } from "expo-font";
import { Image } from "expo-image";
import { Stack } from "expo-router";
import { SymbolView, type SymbolViewProps } from "expo-symbols";
import React, { useCallback, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { toastiva, ToastivaProvider } from "toastiva";
import { SquircleView } from "../../../reacticx-components";

type Member = {
  id: string;
  name: string;
  role: string;
  avatar: string;
};

const MEMBERS: Member[] = [
  {
    id: "you",
    name: "You",
    role: "Designer",
    avatar:
      "https://i.pinimg.com/originals/7b/05/ab/7b05ab36dade41c382ff01df40bf1d0f.png",
  },
  {
    id: "diana",
    name: "Diana",
    role: "Designer",
    avatar:
      "https://i.pinimg.com/736x/03/d6/12/03d612a4bf78164f672be311fefe643f.jpg",
  },
  {
    id: "harry",
    name: "Harry",
    role: "Manager",
    avatar:
      "https://i.pinimg.com/736x/aa/41/5b/aa415bf380ae3326106dc0f5baed2775.jpg",
  },
];

type SettingTile =
  | {
      id: string;
      kind: "action";
      symbol: SymbolViewProps["name"];
      title: string;
    }
  | {
      id: string;
      kind: "switch";
      title: string;
      subtitle: string;
      defaultValue: boolean;
    };

const SETTINGS: SettingTile[] = [
  {
    id: "schedule",
    kind: "action",
    symbol: "calendar",
    title: "Schedule\nMeeting",
  },
  {
    id: "privacy",
    kind: "switch",
    title: "Privacy",
    subtitle: "Make this Room\nprivate",
    defaultValue: true,
  },
  {
    id: "guests",
    kind: "switch",
    title: "Guests",
    subtitle: "Enable guest\ncontrols",
    defaultValue: false,
  },
  {
    id: "notifications",
    kind: "switch",
    title: "Notify",
    subtitle: "Push updates\nto members",
    defaultValue: true,
  },
];

const BLUE = "#0A5BFF";
const FIELD_HEIGHT = 60;
const TILE_WIDTH = 168;
const TILE_HEIGHT = 168;

const TOAST_FILL = "#0E0F12";
const TOAST_STROKE = "rgba(255,255,255,0.08)";
const TOAST_TITLE = "#F5F5F7";
const TOAST_META = "rgba(235,235,245,0.55)";
const TOAST_BODY = "rgba(235,235,245,0.74)";
const ACCENT = "#34D399";

type CreatingToastProps = {
  fontRegular?: string;
  fontMedium?: string;
};

const CreatingToastHeader = ({
  fontRegular,
  fontMedium,
}: CreatingToastProps) => (
  <View style={toastStyles.header}>
    <View style={toastStyles.iconWrap}>
      <SymbolView
        name="circle.dotted"
        size={18}
        tintColor="#F5F5F7"
        resizeMode="scaleAspectFit"
        animationSpec={{
          effect: { type: "pulse" },
          repeating: true,
        }}
      />
    </View>
    <View style={toastStyles.headerText}>
      <Text style={[toastStyles.title, { fontFamily: fontMedium }]}>
        Creating Room
      </Text>
      <Text style={[toastStyles.meta, { fontFamily: fontRegular }]}>
        Just a moment
      </Text>
    </View>
  </View>
);

const CreatingToastBody = ({ fontRegular }: CreatingToastProps) => (
  <View style={toastStyles.bodyWrap}>
    <Text style={[toastStyles.bodyText, { fontFamily: fontRegular }]}>
      Spinning up the space and inviting members.
    </Text>
  </View>
);

type ReadyHeaderProps = CreatingToastProps & {
  roomName: string;
};

const ReadyToastHeader = ({
  fontRegular,
  fontMedium,
  roomName,
}: ReadyHeaderProps) => (
  <View style={toastStyles.header}>
    <View style={[toastStyles.iconWrap, toastStyles.iconWrapAccent]}>
      <SymbolView
        name="checkmark"
        size={14}
        tintColor="#0E0F12"
        resizeMode="scaleAspectFit"
        weight="bold"
      />
    </View>
    <View style={toastStyles.headerText}>
      <Text
        style={[toastStyles.title, { fontFamily: fontMedium }]}
        numberOfLines={1}
      >
        {roomName} is ready
      </Text>
      <Text style={[toastStyles.meta, { fontFamily: fontRegular }]}>
        3 members invited
      </Text>
    </View>
  </View>
);

const ReadyToastBody = ({ fontRegular }: CreatingToastProps) => (
  <View style={toastStyles.bodyWrap}>
    <Text style={[toastStyles.bodyText, { fontFamily: fontRegular }]}>
      Your room is live. Jump in whenever you&apos;re ready.
    </Text>
  </View>
);

const CreateRoom = () => {
  const [fontsLoaded] = useFonts({
    SfProRounded: require("@/assets/fonts/SF-Pro-Rounded-Regular.otf"),
    SfProMedium: require("@/assets/fonts/SF-Pro-Rounded-Medium.otf"),
  });
  const fontRegular = fontsLoaded ? "SfProRounded" : undefined;
  const fontMedium = fontsLoaded ? "SfProMedium" : undefined;
  const fontStyle = { fontFamily: fontRegular };

  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");
  const [switches, setSwitches] = useState<Record<string, boolean>>(() =>
    SETTINGS.reduce<Record<string, boolean>>((acc, tile) => {
      if (tile.kind === "switch") acc[tile.id] = tile.defaultValue;
      return acc;
    }, {}),
  );
  const insets = useSafeAreaInsets();

  const handleStart = useCallback(() => {
    const trimmedName = roomName.trim() || "New Room";

    const sharedToastOptions = {
      fill: TOAST_FILL,
      stroke: TOAST_STROKE,
      iosBlurTint: "dark" as const,
      bodyLayout: "left" as const,
      showProgress: false,
      showIcon: false,
      animationPreset: "smooth" as const,
      styles: {
        action: {
          backgroundColor: "rgba(255,255,255,0.10)",
          borderRadius: 999,
        },
        actionText: {
          color: "#F5F5F7",
          fontFamily: fontMedium,
          fontSize: 13,
        },
      },
    };

    toastiva.custom(<CreatingToastBody fontRegular={fontRegular} />, {
      ...sharedToastOptions,
      title: "Creating Room",
      headerContent: (
        <CreatingToastHeader
          fontRegular={fontRegular}
          fontMedium={fontMedium}
        />
      ),
      duration: 1400,
    });

    setTimeout(() => {
      toastiva.custom(<ReadyToastBody fontRegular={fontRegular} />, {
        ...sharedToastOptions,
        title: `${trimmedName} is ready`,
        headerContent: (
          <ReadyToastHeader
            fontRegular={fontRegular}
            fontMedium={fontMedium}
            roomName={trimmedName}
          />
        ),
        action: {
          label: "Open",
          onPress: () => toastiva.dismissAll(),
        },
        duration: 4000,
      });
    }, 1100);
  }, [roomName, fontRegular, fontMedium]);

  return (
    <ToastivaProvider mode="morph">
      <React.Fragment>
        <Stack.Screen
          options={{
            headerTransparent: true,
            headerTitle: "Create Room",
            headerBackButtonDisplayMode: "generic",
            unstable_sheetFooter: () => (
              <View style={styles.footer}>
                <Pressable
                  onPress={handleStart}
                  style={({ pressed }) => [
                    styles.startButton,
                    pressed && styles.startButtonPressed,
                  ]}
                >
                  <Text
                    style={[styles.startButtonText, { fontFamily: fontMedium }]}
                  >
                    Let&apos;s start!
                  </Text>
                </Pressable>
              </View>
            ),
          }}
        />

        <Stack.Toolbar placement="left">
          <Stack.Toolbar.Button icon="pencil" />
        </Stack.Toolbar>

        <Stack.Toolbar placement="right">
          <Stack.Toolbar.Button icon="trash" />
        </Stack.Toolbar>

        <ScrollView
          style={styles.container}
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
        >
          <View
            style={[
              styles.fieldCardWrap,
              {
                paddingTop: insets.top - 20,
              },
            ]}
          >
            <SquircleView
              style={styles.cardOverflow}
              height={FIELD_HEIGHT * 2}
              cornerRadius={28}
              cornerSmoothing={0.98}
              backgroundColor="#FFFFFF"
            >
              <View style={styles.fieldRow}>
                <View style={styles.fieldIconWrap}>
                  <SymbolView
                    name="photo.fill"
                    size={18}
                    tintColor="#1C1C1E"
                    resizeMode="scaleAspectFit"
                  />
                </View>
                <TextInput
                  style={[styles.fieldInput, fontStyle]}
                  placeholder="Room name"
                  placeholderTextColor="#A1A1A6"
                  value={roomName}
                  onChangeText={setRoomName}
                />
                <Pressable hitSlop={12} style={styles.fieldTrailing}>
                  <SymbolView
                    name="plus"
                    size={18}
                    tintColor="#1C1C1E"
                    resizeMode="scaleAspectFit"
                  />
                </Pressable>
              </View>

              <View style={styles.fieldDivider} />

              <View style={styles.fieldRow}>
                <View style={styles.fieldIconWrap}>
                  <SymbolView
                    name="text.alignleft"
                    size={18}
                    tintColor="#1C1C1E"
                    resizeMode="scaleAspectFit"
                  />
                </View>
                <TextInput
                  style={[styles.fieldInput, fontStyle]}
                  placeholder="Add description"
                  placeholderTextColor="#A1A1A6"
                  value={description}
                  onChangeText={setDescription}
                />
                <Pressable hitSlop={12} style={styles.fieldTrailing}>
                  <SymbolView
                    name="plus"
                    size={18}
                    tintColor="#1C1C1E"
                    resizeMode="scaleAspectFit"
                  />
                </Pressable>
              </View>
            </SquircleView>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.membersRow}
          >
            <Pressable style={styles.memberItem}>
              <View style={styles.addMemberAvatar}>
                <SymbolView
                  name="plus"
                  size={22}
                  tintColor="#1C1C1E"
                  resizeMode="scaleAspectFit"
                />
              </View>
              <Text style={[styles.memberName, fontStyle]}>Add</Text>
              <Text style={[styles.memberRole, fontStyle]}>Member</Text>
            </Pressable>

            {MEMBERS.map((member) => (
              <Pressable key={member.id} style={styles.memberItem}>
                <Image source={{ uri: member.avatar }} style={styles.avatar} />
                <Text style={[styles.memberName, fontStyle]}>
                  {member.name}
                </Text>
                <Text style={[styles.memberRole, fontStyle]}>
                  {member.role}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          <Text style={[styles.sectionLabel, fontStyle]}>Settings</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.settingsRow}
          >
            {SETTINGS.map((tile) => (
              <SquircleView
                key={tile.id}
                style={styles.cardOverflow}
                width={TILE_WIDTH}
                height={TILE_HEIGHT}
                cornerRadius={28}
                cornerSmoothing={0.98}
                backgroundColor="#FFFFFF"
              >
                {tile.kind === "action" ? (
                  <View style={styles.settingTileInner}>
                    <SymbolView
                      name={tile.symbol}
                      size={26}
                      tintColor="#1C1C1E"
                      resizeMode="scaleAspectFit"
                    />
                    <Text style={[styles.settingActionTitle, fontStyle]}>
                      {tile.title}
                    </Text>
                  </View>
                ) : (
                  <View style={styles.settingTileInner}>
                    <View>
                      <Text style={[styles.settingTitle, fontStyle]}>
                        {tile.title}
                      </Text>
                      <Text style={[styles.settingSubtitle, fontStyle]}>
                        {tile.subtitle}
                      </Text>
                    </View>
                    <Switch
                      value={switches[tile.id]}
                      onValueChange={(next) =>
                        setSwitches((prev) => ({ ...prev, [tile.id]: next }))
                      }
                      trackColor={{ false: "#E5E5EA", true: BLUE }}
                      thumbColor="#FFFFFF"
                      ios_backgroundColor="#E5E5EA"
                    />
                  </View>
                )}
              </SquircleView>
            ))}
          </ScrollView>
        </ScrollView>
      </React.Fragment>
    </ToastivaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  cardOverflow: {
    overflow: "hidden",
  },
  fieldCardWrap: {
    marginHorizontal: 16,
  },
  fieldRow: {
    flexDirection: "row",
    alignItems: "center",
    height: FIELD_HEIGHT,
    paddingHorizontal: 14,
  },
  fieldIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F2F2F7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  fieldInput: {
    flex: 1,
    fontSize: 17,
    color: "#1C1C1E",
    paddingVertical: 0,
  },
  fieldTrailing: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  fieldDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#E5E5EA",
    marginLeft: 62,
  },
  membersRow: {
    paddingHorizontal: 16,
    paddingTop: 24,
    gap: 16,
  },
  memberItem: {
    alignItems: "center",
    width: 72,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#E5E5EA",
  },
  addMemberAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: "#C7C7CC",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  memberName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1C1C1E",
    marginTop: 8,
  },
  memberRole: {
    fontSize: 12,
    color: "#8E8E93",
    marginTop: 2,
  },
  sectionLabel: {
    fontSize: 15,
    color: "#8E8E93",
    marginTop: 24,
    marginHorizontal: 32,
  },
  settingsRow: {
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 12,
  },
  settingTileInner: {
    flex: 1,
    padding: 18,
    justifyContent: "space-between",
  },
  settingActionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1C1C1E",
    lineHeight: 24,
  },
  settingTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1C1C1E",
  },
  settingSubtitle: {
    fontSize: 14,
    color: "#8E8E93",
    marginTop: 4,
    lineHeight: 18,
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
    backgroundColor: "#F2F2F7",
  },
  startButton: {
    height: 56,
    borderRadius: 28,
    backgroundColor: BLUE,
    alignItems: "center",
    justifyContent: "center",
  },
  startButtonPressed: {
    opacity: 0.85,
  },
  startButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
  },
});

const toastStyles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    minHeight: 40,
    minWidth: 220,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.10)",
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapAccent: {
    backgroundColor: ACCENT,
    borderColor: "rgba(255,255,255,0.18)",
  },
  headerText: {
    justifyContent: "center",
    flexShrink: 1,
  },
  title: {
    color: TOAST_TITLE,
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: -0.1,
  },
  meta: {
    color: TOAST_META,
    fontSize: 11,
    lineHeight: 14,
    marginTop: 2,
    letterSpacing: 0.05,
  },
  bodyWrap: {
    maxWidth: 280,
  },
  bodyText: {
    color: TOAST_BODY,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: -0.05,
  },
});

export default CreateRoom;
