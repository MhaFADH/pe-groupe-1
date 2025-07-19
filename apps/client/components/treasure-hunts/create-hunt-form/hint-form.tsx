import React from "react"
import { type Control, Controller, type FieldErrors, useWatch } from "react-hook-form"
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
  isExpanded: boolean
  onToggleExpansion: () => void
}

export const HintForm: React.FC<HintFormProps> = ({
  control,
  index,
  onDelete,
  errors,
  isExpanded,
  onToggleExpansion,
}) => {
  const { t } = useTranslation()
  
  const hintTitle = useWatch({
    control,
    name: `hints.${index}.title`,
    defaultValue: ""
  })

  return (
    <Card className={`transition-all duration-200 ${isExpanded ? 'shadow-md' : 'shadow-sm'}`}>
      <View className="flex-row justify-between items-center">
        <Pressable 
          onPress={onToggleExpansion}
          className="flex-1 flex-row items-center py-2"
        >
          <Text className={`flex-1 text-lg font-semibold text-gray-900 dark:text-white ${!isExpanded ? 'text-base' : ''}`}>
            {hintTitle || `${t("hint")} ${index + 1}`}
          </Text>
          <View className="bg-gray-100 dark:bg-gray-700 rounded-full w-6 h-6 justify-center items-center ml-3">
            <Text className="text-gray-600 dark:text-gray-300 text-xs font-bold">
              {isExpanded ? "▼" : "▶"}
            </Text>
          </View>
        </Pressable>
        
        <Pressable
          onPress={onDelete}
          className="bg-primary rounded-full w-8 h-8 justify-center items-center ml-3"
        >
          <Text className="text-white font-bold text-lg leading-none">×</Text>
        </Pressable>
      </View>

      {isExpanded && (
        <View className="gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
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
      )}
    </Card>
  )
}
