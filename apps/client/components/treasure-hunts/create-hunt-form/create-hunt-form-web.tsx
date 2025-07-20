/* eslint-disable max-lines */
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "expo-router"
import React, { useState } from "react"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { ScrollView, Text, View } from "react-native"
import Animated, { FadeIn } from "react-native-reanimated"

import { CreateTreasureHuntSchema } from "@pe/schemas"
import type { CreateTreasureHunt, Hint } from "@pe/types"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DatePicker } from "@/components/ui/date-picker"
import { Input } from "@/components/ui/input"
import { NumberInput } from "@/components/ui/number-input"
import { Switch } from "@/components/ui/switch"
import apiClient from "@/services/api/apiClient"

import { HintsSection } from "./hints-section"
import { LocationPicker } from "./location-picker"

const defaultFormValues: CreateTreasureHunt = {
  title: "",
  description: "",
  isPublic: true,
  maxParticipants: 10,
  endDate: null,
  latitude: 37.78825,
  longitude: -122.4324,
  hints: [],
}

export const CreateHuntFormWeb: React.FC = () => {
  const { t } = useTranslation()
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<CreateTreasureHunt>({
    resolver: zodResolver(CreateTreasureHuntSchema),
    defaultValues: defaultFormValues,
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "hints",
  })

  const watchedLocation = watch(["latitude", "longitude"])
  const [expandedHints, setExpandedHints] = useState<Set<number>>(new Set())

  const onSubmit = async (data: CreateTreasureHunt) => {
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

  const addHint = () => {
    setExpandedHints(new Set())
    const newHint: Hint = {
      title: "",
      description: "",
      latitude: watchedLocation[0] || defaultFormValues.latitude,
      longitude: watchedLocation[1] || defaultFormValues.longitude,
    }
    append(newHint)
    setExpandedHints(new Set([fields.length]))
  }

  const toggleHintExpansion = (index: number) => {
    const newExpanded = new Set(expandedHints)

    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }

    setExpandedHints(newExpanded)
  }

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="px-6 pt-6">
        <Animated.View entering={FadeIn.delay(100)} className="mb-8">
          <Text className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
            {t("createHunt")}
          </Text>
          <Text className="text-gray-600 dark:text-gray-300 text-lg">
            {t("huntDescriptionPlaceholder")}
          </Text>
        </Animated.View>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 32 }}
      >
        <View className="flex-row flex-wrap lg:flex-nowrap gap-6">
          {/* Left Column - Basic Info */}
          <View className="flex-1 min-w-0 space-y-6">
            <Animated.View entering={FadeIn.delay(200)}>
              <Card>
                <Text className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  {t("huntTitle")}
                </Text>
                <Controller
                  control={control}
                  name="title"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      label={t("huntTitle")}
                      value={value}
                      onChangeText={onChange}
                      placeholder={t("huntTitlePlaceholder")}
                      error={
                        errors.title?.message ? t(errors.title.message) : ""
                      }
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
                        numberOfLines={4}
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
            </Animated.View>

            <Animated.View entering={FadeIn.delay(300)}>
              <Card>
                <Text className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  {t("settings")}
                </Text>
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
                          errors.endDate?.message
                            ? t(errors.endDate.message)
                            : ""
                        }
                        optional
                      />
                    )}
                  />
                </View>
              </Card>
            </Animated.View>
          </View>

          {/* Right Column - Location & Hints */}
          <View className="flex-1 min-w-0 space-y-6">
            <Animated.View entering={FadeIn.delay(400)}>
              <Card>
                <Text className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  {t("location")}
                </Text>
                <LocationPicker
                  latitude={watchedLocation[0] || defaultFormValues.latitude}
                  longitude={watchedLocation[1] || defaultFormValues.longitude}
                  onLocationSelect={handleLocationSelect}
                  error={errors.latitude?.message ?? errors.longitude?.message}
                />
              </Card>
            </Animated.View>

            <Animated.View entering={FadeIn.delay(500)}>
              <HintsSection
                control={control}
                fields={fields}
                onAddHint={addHint}
                onRemoveHint={remove}
                errors={errors}
                expandedHints={expandedHints}
                onToggleExpansion={toggleHintExpansion}
              />
            </Animated.View>

            <Animated.View entering={FadeIn.delay(600)} className="mt-8">
              <View className="flex-row gap-4 justify-center md:justify-end">
                <Button
                  title={t("cancel")}
                  onPress={() => router.back()}
                  variant="outline"
                  size="lg"
                  className="flex-1 md:flex-none md:w-32"
                />
                <Button
                  title={t("createHuntButton")}
                  onPress={handleSubmit(onSubmit)}
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className="flex-1 md:flex-none md:w-40"
                />
              </View>
            </Animated.View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
