import React from "react"
import { useTranslation } from "react-i18next"
import { Text, View } from "react-native"

import type { Hint } from "@pe/types"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

import { HintForm } from "./hint-form"

type HintsSectionProps = {
  hints: Hint[]
  onAddHint: () => void
  onUpdateHint: (index: number, hint: Hint) => void
  onRemoveHint: (index: number) => void
}

export const HintsSection: React.FC<HintsSectionProps> = ({
  hints,
  onAddHint,
  onUpdateHint,
  onRemoveHint,
}) => {
  const { t } = useTranslation()

  return (
    <Card>
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {t("hints")} ({hints.length})
        </Text>
        <Button
          title={t("addHint")}
          onPress={onAddHint}
          variant="outline"
          size="sm"
        />
      </View>

      {hints.length === 0 && (
        <Text className="text-center text-gray-500 dark:text-gray-400 py-8">
          {t("noHintsYet")}
        </Text>
      )}

      {hints.map((hint, index) => (
        <View key={index} className={index > 0 ? "mt-4" : ""}>
          <HintForm
            hint={hint}
            onUpdate={(updatedHint) => onUpdateHint(index, updatedHint)}
            onDelete={() => onRemoveHint(index)}
            index={index}
          />
        </View>
      ))}
    </Card>
  )
}
