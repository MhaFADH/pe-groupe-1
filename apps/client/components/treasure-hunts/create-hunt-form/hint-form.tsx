import React from "react"
import { useTranslation } from "react-i18next"
import { Pressable, Text, View } from "react-native"

import type { Hint } from "@pe/types"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import { LocationPicker } from "./location-picker"

type HintFormProps = {
  hint: Hint
  onUpdate: (hint: Hint) => void
  onDelete: () => void
  index: number
  errors?: {
    title?: string
    description?: string
    latitude?: string
    longitude?: string
  }
}

export const HintForm: React.FC<HintFormProps> = ({
  hint,
  onUpdate,
  onDelete,
  index,
  errors,
}) => {
  const { t } = useTranslation()

  const handleLocationSelect = (latitude: number, longitude: number) => {
    onUpdate({ ...hint, latitude, longitude })
  }

  return (
    <Card>
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-semibold text-gray-900 dark:text-white">
          {t("hint")} {index + 1}
        </Text>
        <Pressable
          onPress={onDelete}
          className="bg-red-500 rounded-full w-8 h-8 justify-center items-center"
        >
          <Text className="text-white font-bold text-lg">×</Text>
        </Pressable>
      </View>

      <View className="gap-4">
        <Input
          label={t("hintTitle")}
          value={hint.title}
          onChangeText={(title) => onUpdate({ ...hint, title })}
          placeholder={t("hintTitlePlaceholder")}
          error={errors?.title}
          required
        />

        <Input
          label={t("hintDescription")}
          value={hint.description}
          onChangeText={(description) => onUpdate({ ...hint, description })}
          placeholder={t("hintDescriptionPlaceholder")}
          multiline
          numberOfLines={3}
          error={errors?.description}
          required
        />

        <View>
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            {t("hintLocation")}
          </Text>
          <LocationPicker
            latitude={hint.latitude}
            longitude={hint.longitude}
            onLocationSelect={handleLocationSelect}
            error={errors?.latitude ?? errors?.longitude}
          />
        </View>
      </View>
    </Card>
  )
}
