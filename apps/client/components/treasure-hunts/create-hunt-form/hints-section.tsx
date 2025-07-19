import React from "react"
import type { Control, FieldArrayWithId, FieldErrors } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { Text, View } from "react-native"

import type { CreateTreasureHunt } from "@pe/types"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

import { HintForm } from "./hint-form"

type HintsSectionProps = {
  control: Control<CreateTreasureHunt>
  fields: FieldArrayWithId<CreateTreasureHunt, "hints", "id">[]
  onAddHint: () => void
  onRemoveHint: (index: number) => void
  errors?: FieldErrors<CreateTreasureHunt>
  expandedHints: Set<number>
  onToggleExpansion: (index: number) => void
}

export const HintsSection: React.FC<HintsSectionProps> = ({
  control,
  fields,
  onAddHint,
  onRemoveHint,
  errors,
  expandedHints,
  onToggleExpansion,
}) => {
  const { t } = useTranslation()

  return (
    <Card>
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {t("hints")} ({fields.length})
        </Text>
      </View>

      {fields.length === 0 && (
        <Text className="text-center text-gray-500 dark:text-gray-400 py-8">
          {t("noHintsYet")}
        </Text>
      )}

      {fields.map((field, index) => (
        <View key={field.id} className={index > 0 ? "mt-4" : ""}>
          <HintForm
            control={control}
            index={index}
            onDelete={() => onRemoveHint(index)}
            errors={errors?.hints?.[index]}
            isExpanded={expandedHints.has(index)}
            onToggleExpansion={() => onToggleExpansion(index)}
          />
        </View>
      ))}
      <Button
        title={t("addHint")}
        onPress={onAddHint}
        variant="outline"
        size="sm"
        className="mt-4"
      />
    </Card>
  )
}
