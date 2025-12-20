import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolView, SymbolViewProps } from 'expo-symbols';
import React from 'react';
import { OpaqueColorValue, StyleProp, ViewStyle } from 'react-native';

// Fallback component for platforms that don't support SF Symbols
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: string;
  size?: number;
  color?: string | OpaqueColorValue;
  style?: StyleProp<ViewStyle>;
}) {
  // Map common SF Symbol names to Material Icons as fallback
  const iconMap: Record<string, string> = {
    'house.fill': 'home',
    'paperplane.fill': 'send',
  };

  const materialIconName = iconMap[name] || 'circle';

  return <MaterialIcons name={materialIconName as any} size={size} color={color}  />;
}

