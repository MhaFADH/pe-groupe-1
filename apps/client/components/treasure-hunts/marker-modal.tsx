import { useTranslation } from "react-i18next"
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native"

import { type TreasureHintType } from "@pe/types"

type Props = {
  hint: TreasureHintType | null
  onClose: () => void
}

const MarkerModal = (props: Props) => {
  const { hint, onClose } = props

  const { t } = useTranslation()

  return (
    <Modal visible={Boolean(hint)} animationType="fade" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {hint && (
            <>
              <Text style={styles.title}>{hint.title}</Text>
              <View style={styles.divider} />
              <Text style={styles.description}>{hint.description}</Text>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>{t("close")}</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "100%",
    maxWidth: 380,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.7,
    shadowRadius: 8,
    elevation: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
  },
  divider: {
    width: "60%",
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 12,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 24,
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    width: "100%",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
})

export default MarkerModal
