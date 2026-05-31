// import { Text, TouchableOpacity, View } from "react-native";

// import { colors } from "../../../constants/colors";
// import { radius } from "../../../constants/radius";
// import { spacing } from "../../../constants/spacing";
// import { typography } from "../../../styles/typography";

// const tabs = ["Setup", "Timeline", "Gallery", "Spec"];

// export function GarageTabs() {
//   return (
//     <View
//       style={{
//         marginTop: 20,

//         paddingHorizontal: spacing.screen,
//       }}
//     >
//       <View
//         style={{
//           flexDirection: "row",
//           alignItems: "center",
//           justifyContent: "space-between",

//           backgroundColor: colors.grey,

//           borderRadius: radius.xs,

//           paddingHorizontal: 4,
//           paddingVertical: 2,
//         }}
//       >
//         {tabs.map((tab, index) => {
//           const active = index === 0;

//           return (
//             <TouchableOpacity
//               key={tab}
//               activeOpacity={0.8}
//               style={{
//                 flex: 1,

//                 alignItems: "center",

//                 paddingVertical: 10,

//                 // borderRadius: radius.md,
//               }}
//             >
//               <Text
//                 style={{
//                   ...typography.label.md,

//                   color: active ? colors.lime : colors.mute,
//                 }}
//               >
//                 {tab}
//               </Text>
//             </TouchableOpacity>
//           );
//         })}
//       </View>
//     </View>
//   );
// }

import { Text, TouchableOpacity, View } from "react-native";

import { colors } from "../../../constants/colors";
import { radius } from "../../../constants/radius";
import { spacing } from "../../../constants/spacing";
import { typography } from "../../../styles/typography";

const tabs = ["Setup", "Timeline", "Gallery"];

type Props = {
  activeTab: string;

  onChangeTab: (tab: string) => void;
};

export function GarageTabs({ activeTab, onChangeTab }: Props) {
  return (
    <View
      style={{
        marginTop: 36,

        paddingHorizontal: spacing.screen,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",

          backgroundColor: colors.grey,

          borderRadius: radius.lg,

          padding: 4,
        }}
      >
        {tabs.map((tab) => {
          const active = activeTab === tab;

          return (
            <TouchableOpacity
              key={tab}
              activeOpacity={0.8}
              onPress={() => onChangeTab(tab)}
              style={{
                flex: 1,

                alignItems: "center",

                paddingVertical: 10,

                borderRadius: radius.md,
              }}
            >
              <Text
                style={{
                  ...typography.label.md,

                  color: active ? colors.lime : colors.mute,
                }}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
