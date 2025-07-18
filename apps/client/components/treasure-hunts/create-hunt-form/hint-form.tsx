import React from "react"
import { type Control, Controller, type FieldErrors } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { Pressable, Text, View } from "react-native"

import type { CreateTreasureHunt, Hint } from "@pe/types"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import { LocationPicker } from "./location-picker"

type HintFormProps = {
  control: Control<CreateTreasureHunt>
  index: number
  onDelete: () => void
  errors?: FieldErrors<Hint>
}

export const HintForm: React.FC<HintFormProps> = ({
  control,
  index,
  onDelete,
  errors,
}) => {
  const { t } = useTranslation()

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
        <Controller
          control={control}
          name={`hints.${index}.title`}
          render={({ field: { onChange, value } }) => (
            <Input
              label={t("hintTitle")}
              value={value}
              onChangeText={onChange}
              placeholder={t("hintTitlePlaceholder")}
              error={t(errors?.title?.message ?? "")}
              required
            />
          )}
        />

        <Controller
          control={control}
          name={`hints.${index}.description`}
          render={({ field: { onChange, value } }) => (
            <Input
              label={t("hintDescription")}
              value={value}
              onChangeText={onChange}
              placeholder={t("hintDescriptionPlaceholder")}
              multiline
              numberOfLines={3}
              error={t(errors?.description?.message ?? "")}
              required
            />
          )}
        />

        <View>
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            {t("hintLocation")}
          </Text>
          <Controller
            control={control}
            name={`hints.${index}.latitude`}
            render={({
              field: { value: latitude, onChange: onLatitudeChange },
            }) => (
              <Controller
                control={control}
                name={`hints.${index}.longitude`}
                render={({
                  field: { value: longitude, onChange: onLongitudeChange },
                }) => (
                  <LocationPicker
                    latitude={latitude}
                    longitude={longitude}
                    onLocationSelect={(lat, lng) => {
                      onLatitudeChange(lat)
                      onLongitudeChange(lng)
                    }}
                    error={
                      t(errors?.latitude?.message ?? "") ||
                      t(errors?.longitude?.message ?? "")
                    }
                  />
                )}
              />
            )}
          />
        </View>
      </View>
    </Card>
  )
}
