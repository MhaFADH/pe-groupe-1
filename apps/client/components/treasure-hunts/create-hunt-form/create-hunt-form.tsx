import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "expo-router"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { ScrollView, Text, View } from "react-native"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DatePicker } from "@/components/ui/date-picker"
import { Input } from "@/components/ui/input"
import { NumberInput } from "@/components/ui/number-input"
import { Switch } from "@/components/ui/switch"
import apiClient from "@/services/api/apiClient"

import { LocationPicker } from "./location-picker"
import {
  type CreateHuntFormData,
  createHuntFormSchema,
  defaultFormValues,
} from "./schema"

export const CreateHuntForm: React.FC = () => {
  const { t } = useTranslation()
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<CreateHuntFormData>({
    resolver: zodResolver(createHuntFormSchema),
    defaultValues: defaultFormValues,
  })

  const watchedLocation = watch(["latitude", "longitude"])

  const onSubmit = async (data: CreateHuntFormData) => {
    try {
      await apiClient.post("/treasure-hunts", data)
      router.back()
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error creating hunt:", error)
    }
  }

  const handleLocationSelect = (latitude: number, longitude: number) => {
    setValue("latitude", latitude)
    setValue("longitude", longitude)
  }

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
      >
        {/* Header */}
        <View className="items-center mb-8">
          <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {t("createHunt")}
          </Text>
          <Text className="text-gray-600 dark:text-gray-400 text-center">
            Create your treasure hunt
          </Text>
        </View>

        {/* Form Content */}
        <View className="gap-4">
          {/* Basic Info */}
          <Card>
            <Controller
              control={control}
              name="title"
              render={({ field: { onChange, value } }) => (
                <Input
                  label={t("huntTitle")}
                  value={value}
                  onChangeText={onChange}
                  placeholder={t("huntTitlePlaceholder")}
                  error={errors.title?.message ? t(errors.title.message) : ""}
                  required
                />
              )}
            />

            <View className="mt-4">
              <Controller
                control={control}
                name="description"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label={t("huntDescription")}
                    value={value ?? ""}
                    onChangeText={onChange}
                    placeholder={t("huntDescriptionPlaceholder")}
                    multiline
                    numberOfLines={3}
                    error={
                      errors.description?.message
                        ? t(errors.description.message)
                        : ""
                    }
                  />
                )}
              />
            </View>
          </Card>

          {/* Settings */}
          <Card>
            <Controller
              control={control}
              name="isPublic"
              render={({ field: { onChange, value } }) => (
                <Switch
                  label={t("isPublic")}
                  description={t("isPublicDescription")}
                  value={value}
                  onValueChange={onChange}
                />
              )}
            />

            <View className="mt-4">
              <Controller
                control={control}
                name="maxParticipants"
                render={({ field: { onChange, value } }) => (
                  <NumberInput
                    label={t("maxParticipants")}
                    value={value}
                    onChange={onChange}
                    placeholder={t("maxParticipantsPlaceholder")}
                    error={
                      errors.maxParticipants?.message
                        ? t(errors.maxParticipants.message)
                        : ""
                    }
                    min={1}
                    max={100}
                    required
                  />
                )}
              />
            </View>

            <View className="mt-4">
              <Controller
                control={control}
                name="endDate"
                render={({ field: { onChange, value } }) => (
                  <DatePicker
                    label={t("endDate")}
                    value={value ?? null}
                    onChange={onChange}
                    error={
                      errors.endDate?.message ? t(errors.endDate.message) : ""
                    }
                    optional
                  />
                )}
              />
            </View>
          </Card>

          {/* Location */}
          <Card>
            <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              {t("location")}
            </Text>
            <LocationPicker
              latitude={watchedLocation[0] || defaultFormValues.latitude}
              longitude={watchedLocation[1] || defaultFormValues.longitude}
              onLocationSelect={handleLocationSelect}
              error={errors.latitude?.message ?? errors.longitude?.message}
            />
          </Card>

          {/* Actions */}
          <View className="gap-3 mt-4">
            <Button
              title={t("createHuntButton")}
              onPress={handleSubmit(onSubmit)}
              variant="primary"
              size="lg"
              fullWidth
              disabled={isSubmitting}
            />

            <Button
              title={t("cancel")}
              onPress={() => router.back()}
              variant="outline"
              size="lg"
              fullWidth
            />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
