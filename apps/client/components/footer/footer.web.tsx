import React from "react"
import { Pressable, Text, View } from "react-native"

import tw from "@/tailwind"

type FooterLink = {
  title: string
  onPress: () => void
}

type FooterProps = {
  appName?: string
  copyright?: string
  links?: FooterLink[]
  className?: string
  appNameClassName?: string
  copyrightClassName?: string
  linkClassName?: string
}

const FooterLinkComponent: React.FC<{
  title: string
  onPress: () => void
  className?: string
}> = ({ title, onPress, className = "" }) => (
  <Pressable
    onPress={onPress}
    style={tw`px-2 py-2 opacity-100 active:opacity-70 ${className}`}
  >
    <Text style={tw`text-base text-gray-500 dark:text-gray-400 font-medium`}>
      {title}
    </Text>
  </Pressable>
)

export const FooterWeb: React.FC<FooterProps> = ({
  appName = "Lootopia",
  copyright = "© 2025 Lootopia. All rights reserved.",
  links = [
    { title: "Contact Us", onPress: () => void 0 },
    {
      title: "Terms & Conditions",
      onPress: () => void 0,
    },
    {
      title: "Privacy Policy",
      onPress: () => void 0,
    },
  ],
  className = "",
  appNameClassName = "",
  copyrightClassName = "",
  linkClassName = "",
}) => (
  <View
    style={tw`bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-6 py-6 w-full ${className}`}
  >
    <View
      style={tw`flex-row flex-wrap md:flex-nowrap items-center justify-between max-w-screen-xl mx-auto w-full`}
    >
      <View style={tw`mb-4 md:mb-0`}>
        <Text
          style={tw`text-lg font-semibold text-gray-900 dark:text-white mb-1 ${appNameClassName}`}
        >
          {appName}
        </Text>
        <Text
          style={tw`text-xs text-gray-500 dark:text-gray-400 ${copyrightClassName}`}
        >
          {copyright}
        </Text>
      </View>
      <View style={tw`flex-row flex-wrap gap-6`}>
        {links.map((link, index) => (
          <FooterLinkComponent
            key={index}
            title={link.title}
            onPress={link.onPress}
            className={linkClassName}
          />
        ))}
      </View>
    </View>
  </View>
)
