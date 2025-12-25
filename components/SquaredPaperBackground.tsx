import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Defs, Pattern, Rect, Line } from "react-native-svg";

interface SquaredPaperBackgroundProps {
  children?: React.ReactNode;
  gridSize?: number; // Size of each square in pixels
  lineColor?: string; // Color of the grid lines
  backgroundColor?: string; // Background color
  lineWidth?: number; // Width of the grid lines
}

export default function SquaredPaperBackground({
  children,
  gridSize = 20,
  lineColor = "#E5E7EB", // Light gray by default
  backgroundColor = "#FFFFFF",
  lineWidth = 1,
}: SquaredPaperBackgroundProps) {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* SVG Grid Pattern */}
      <Svg
        style={StyleSheet.absoluteFill}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
      >
        <Defs>
          <Pattern
            id="grid"
            width={gridSize}
            height={gridSize}
            patternUnits="userSpaceOnUse"
          >
            {/* Vertical line */}
            <Line
              x1={gridSize}
              y1="0"
              x2={gridSize}
              y2={gridSize}
              stroke={lineColor}
              strokeWidth={lineWidth}
            />
            {/* Horizontal line */}
            <Line
              x1="0"
              y1={gridSize}
              x2={gridSize}
              y2={gridSize}
              stroke={lineColor}
              strokeWidth={lineWidth}
            />
          </Pattern>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#grid)" />
      </Svg>

      {/* Content overlay */}
      <View style={styles.contentContainer}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  contentContainer: {
    flex: 1,
    zIndex: 1,
  },
});

