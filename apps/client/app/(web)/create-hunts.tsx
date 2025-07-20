/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import { Ionicons } from "@expo/vector-icons"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import * as Location from "expo-location"
import { useRouter } from "expo-router"
import { motion } from "framer-motion"
import React, { useEffect, useState } from "react"
import {
  type Control,
  Controller,
  useFieldArray,
  useForm,
} from "react-hook-form"
import { useTranslation } from "react-i18next"
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native"

import { CreateTreasureHuntSchema } from "@pe/schemas"
import type { CreateTreasureHunt } from "@pe/types"

import { useAuthManager } from "@/components/contexts"
import { LocationPickerWeb } from "@/components/treasure-hunts/create-hunt-form/location-picker.web"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DatePickerWeb } from "@/components/ui/date-picker.web"
import { Input } from "@/components/ui/input"
import { NumberInput } from "@/components/ui/number-input"
import { Switch } from "@/components/ui/switch"
import apiClient from "@/services/api/apiClient"
import { useThemeColor } from "@/utils/colors"

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

const HintForm = ({
  index,
  control,
  onRemove,
  errors,
  isExpanded,
  onToggle,
  huntLocation,
}: {
  index: number
  control: Control<CreateTreasureHunt>
  onRemove: () => void
  errors: any
  isExpanded: boolean
  onToggle: () => void
  huntLocation: [number, number]
}) => {
  const { t } = useTranslation()
  const { getThemeColor } = useThemeColor()

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <View className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <TouchableOpacity
          onPress={onToggle}
          className="p-4 flex-row items-center justify-between bg-gray-50 dark:bg-gray-700/50"
        >
          <View className="flex-row items-center">
            <View className="w-8 h-8 rounded-full bg-primary-600 items-center justify-center mr-3">
              <Text className="text-white font-bold text-sm">{index + 1}</Text>
            </View>
            <Text className="text-lg font-semibold text-gray-800 dark:text-white">
              {t("hint")} {index + 1}
            </Text>
          </View>
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={onRemove}
              className="p-2 rounded-lg mr-2"
              style={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}
            >
              <Ionicons name="trash-outline" size={18} color="#EF4444" />
            </TouchableOpacity>
            <Ionicons
              name={isExpanded ? "chevron-up" : "chevron-down"}
              size={20}
              color={getThemeColor("gray-500", "gray-400")}
            />
          </View>
        </TouchableOpacity>

        {isExpanded && (
          <View className="p-4 space-y-4">
            <Controller
              control={control}
              name={`hints.${index}.title`}
              render={({ field: { onChange, value } }) => (
                <Input
                  label={t("hintTitle")}
                  value={value}
                  onChangeText={onChange}
                  placeholder={t("hintTitlePlaceholder")}
                  error={
                    errors.hints?.[index]?.title?.message
                      ? t(errors.hints[index].title.message)
                      : ""
                  }
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
                  error={
                    errors.hints?.[index]?.description?.message
                      ? t(errors.hints[index].description.message)
                      : ""
                  }
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
                  field: { value: latValue, onChange: onLatChange },
                }) => (
                  <Controller
                    control={control}
                    name={`hints.${index}.longitude`}
                    render={({
                      field: { value: lngValue, onChange: onLngChange },
                    }) => (
                      <LocationPickerWeb
                        latitude={latValue || huntLocation[0]}
                        longitude={lngValue || huntLocation[1]}
                        onLocationSelect={(lat, lng) => {
                          onLatChange(lat)
                          onLngChange(lng)
                        }}
                        error={
                          errors.hints?.[index]?.latitude?.message ||
                          errors.hints?.[index]?.longitude?.message
                        }
                      />
                    )}
                  />
                )}
              />
            </View>
          </View>
        )}
      </View>
    </motion.div>
  )
}

const CreateHuntsWeb = () => {
  const { t } = useTranslation()
  const { getThemeColor } = useThemeColor()
  const router = useRouter()
  const queryClient = useQueryClient()
  const { isAuthenticated } = useAuthManager()

  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

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

  const [expandedHints, setExpandedHints] = useState<Set<number>>(new Set())
  const [resolvedLocation, setResolvedLocation] = useState<string>("")
  const [isResolvingLocation, setIsResolvingLocation] = useState(false)
  const watchedLocation = watch(["latitude", "longitude"])

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/")
    }
  }, [isAuthenticated, router])

  // Auto-resolve location when coordinates change
  useEffect(() => {
    const [latitude, longitude] = watchedLocation
    if (latitude && longitude) {
      const resolveCurrentLocation = async () => {
        setIsResolvingLocation(true)
        try {
          const location = await resolveLocation(latitude, longitude)
          setResolvedLocation(location)
        } catch (error) {
          console.error("Failed to resolve location:", error)
          setResolvedLocation(t("unknown"))
        } finally {
          setIsResolvingLocation(false)
        }
      }
      void resolveCurrentLocation()
    }
  }, [watchedLocation, t])

  const resolveLocation = async (
    latitude: number,
    longitude: number,
  ): Promise<string> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
      )
      const data = await response.json()

      if (data && data.address) {
        const { city, town, village, municipality, county } = data.address
        return city || town || village || municipality || county || t("unknown")
      }
    } catch (error) {
      console.error("Location resolution failed:", error)
    }

    return t("unknown")
  }

  const onSubmit = async (data: CreateTreasureHunt) => {
    try {
      // Use the already resolved location or resolve it if needed
      const huntLocation =
        resolvedLocation ||
        (await resolveLocation(data.latitude, data.longitude))

      const hintsWithLocation = await Promise.all(
        (data.hints ?? []).map(async (hint) => ({
          ...hint,
          location: await resolveLocation(hint.latitude, hint.longitude),
        })),
      )

      const submitData = {
        ...data,
        location: huntLocation,
        hints: hintsWithLocation,
      }

      await apiClient.post("/treasure-hunts", submitData)
      router.push("/explore")
      await queryClient.invalidateQueries({ queryKey: ["hunts"] })
    } catch (error) {
      console.error("Error creating hunt:", error)
      Alert.alert(t("error"), t("failedToCreateHunt"))
    }
  }

  const handleLocationSelect = async (latitude: number, longitude: number) => {
    setValue("latitude", latitude)
    setValue("longitude", longitude)

    // Auto-resolve location from coordinates
    setIsResolvingLocation(true)
    try {
      const location = await resolveLocation(latitude, longitude)
      setResolvedLocation(location)
    } catch (error) {
      console.error("Failed to resolve location:", error)
      setResolvedLocation(t("unknown"))
    } finally {
      setIsResolvingLocation(false)
    }
  }

  const addHint = () => {
    setExpandedHints(new Set())

    const newHint = {
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
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingVertical: 32,
          paddingBottom: 64,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <View className="flex-row items-center justify-center mb-6 relative">
            <View className="text-center">
              <Text className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
                {t("createHunt")}
              </Text>
            </View>
          </View>
        </motion.div>

        <View className="max-w-4xl mx-auto w-full space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card>
              <View className="p-6">
                <Text className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  {t("huntDescription")}
                </Text>

                <View className="space-y-6">
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
              </View>
            </Card>
          </motion.div>

          {/* Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <View className="p-6">
                <Text className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  {t("huntSettings")}
                </Text>

                <View className="space-y-6">
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

                  <View
                    className="grid gap-6"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 24,
                    }}
                  >
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

                    <Controller
                      control={control}
                      name="endDate"
                      render={({ field: { onChange, value } }) => (
                        <DatePickerWeb
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
                </View>
              </View>
            </Card>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card>
              <View className="p-6">
                <Text className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  {t("location")}
                </Text>

                <LocationPickerWeb
                  latitude={watchedLocation[0] || defaultFormValues.latitude}
                  longitude={watchedLocation[1] || defaultFormValues.longitude}
                  onLocationSelect={handleLocationSelect}
                  error={errors.latitude?.message ?? errors.longitude?.message}
                />
              </View>
            </Card>
          </motion.div>

          {/* Hints Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card>
              <View className="p-6">
                <View className="flex-row items-center justify-between mb-6">
                  <View>
                    <Text className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                      {t("hints")} ({fields.length})
                    </Text>
                  </View>
                  <Button
                    title={t("addHint")}
                    variant="outline"
                    size="md"
                    onPress={addHint}
                  />
                </View>

                {fields.length > 0 ? (
                  <View className="space-y-4">
                    {fields.map((field, index) => (
                      <HintForm
                        key={field.id}
                        index={index}
                        control={control}
                        onRemove={() => remove(index)}
                        errors={errors}
                        isExpanded={expandedHints.has(index)}
                        onToggle={() => toggleHintExpansion(index)}
                        huntLocation={[
                          watchedLocation[0] || defaultFormValues.latitude,
                          watchedLocation[1] || defaultFormValues.longitude,
                        ]}
                      />
                    ))}
                  </View>
                ) : (
                  <View className="flex items-center justify-center py-16 px-8">
                    <View className="flex items-center justify-center">
                      <Ionicons
                        name="bulb-outline"
                        size={64}
                        color={getThemeColor("gray-400", "gray-500")}
                      />
                      <Text className="text-xl font-semibold text-gray-800 dark:text-white mt-6 text-center">
                        {t("makeYourImaginationWork")}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex gap-4"
          >
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
          </motion.div>
        </View>
      </ScrollView>
    </View>
  )
}

export default CreateHuntsWeb
