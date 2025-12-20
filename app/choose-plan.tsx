import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

/**
 * Choose Plan Screen
 * 
 * Route: "/choose-plan"
 * - Allows user to select their productivity plan
 * - Has back button to return to homepage
 * - Uses expo-router for navigation
 */

type PlanType = "relaxed" | "balanced" | "intense" | null;

export default function ChoosePlanScreen() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<PlanType>(null);

  const plans = [
    {
      id: "relaxed" as PlanType,
      title: "Relaxed",
      description: "A few notifications weekly to keep you on track",
    },
    {
      id: "balanced" as PlanType,
      title: "Balanced",
      description: "Regular check-ins to maintain consistency",
    },
    {
      id: "intense" as PlanType,
      title: "Intense",
      description: "Daily reminders and progress tracking",
    },
  ];

  const handleContinue = () => {
    if (selectedPlan) {
      console.log("Selected plan:", selectedPlan);
      // TODO: Navigate to next screen or save selection
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        {/* Header */}
        <Text style={styles.title}>
          Choose your Plan
        </Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Select the intensity that works best for your lifestyle
        </Text>

        {/* Plan Options */}
        <View style={styles.plansContainer}>
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            
            return (
              <TouchableOpacity
                key={plan.id}
                onPress={() => setSelectedPlan(plan.id)}
                activeOpacity={0.8}
                style={[
                  styles.planCard,
                  isSelected ? styles.planCardSelected : styles.planCardUnselected
                ]}
              >
                <View style={styles.planHeader}>
                  <Text style={styles.planTitle}>
                    {plan.title}
                  </Text>
                  
                  {/* Radio Button */}
                  <View 
                    style={[
                      styles.radioButton,
                      isSelected ? styles.radioButtonSelected : styles.radioButtonUnselected
                    ]}
                  >
                    {isSelected && (
                      <View style={styles.radioButtonInner} />
                    )}
                  </View>
                </View>
                
                <Text style={styles.planDescription}>
                  {plan.description}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          onPress={handleContinue}
          disabled={!selectedPlan}
          activeOpacity={0.8}
          style={[
            styles.continueButton,
            selectedPlan ? styles.continueButtonActive : styles.continueButtonDisabled
          ]}
        >
          <Text 
            style={[
              styles.continueButtonText,
              selectedPlan ? styles.continueButtonTextActive : styles.continueButtonTextDisabled
            ]}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  backButton: {
    marginBottom: 24,
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  backArrow: {
    fontSize: 30,
    color: "#111827",
    fontWeight: "300",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 40,
  },
  plansContainer: {
    marginBottom: 40,
  },
  planCard: {
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 16,
    padding: 20,
  },
  planCardSelected: {
    borderColor: "#3B82F6",
    backgroundColor: "#EFF6FF",
  },
  planCardUnselected: {
    borderColor: "#E5E7EB",
    backgroundColor: "#ffffff",
  },
  planHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  planTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    flex: 1,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonSelected: {
    borderColor: "#3B82F6",
    backgroundColor: "#3B82F6",
  },
  radioButtonUnselected: {
    borderColor: "#D1D5DB",
    backgroundColor: "#ffffff",
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ffffff",
  },
  planDescription: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
    marginTop: 4,
  },
  continueButton: {
    padding: 16,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  continueButtonActive: {
    backgroundColor: "#3B82F6",
  },
  continueButtonDisabled: {
    backgroundColor: "#E5E7EB",
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  continueButtonTextActive: {
    color: "#ffffff",
  },
  continueButtonTextDisabled: {
    color: "#9CA3AF",
  },
});
