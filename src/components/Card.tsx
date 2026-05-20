import React, { ReactNode } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { colors } from "../theme/colors";

interface Props {
    children: ReactNode;
    style?: ViewStyle;
}

export default function Card ({
    children,
    style,
}: Props){
    return(
        <View style={[styles.card,style]}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.card,
        borderRadius: 18,
        padding: 16,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: colors.border,
    },
});