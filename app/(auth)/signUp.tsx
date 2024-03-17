import React, { useState } from "react";
import { Link } from "expo-router";
import { observer } from "mobx-react-lite";
import {
    Alert,
    Button,
    Keyboard,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { supabase } from "../../lib/supabase";
import { useStores } from "../../models";

export const SignUp = observer(() => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function signUpWithEmail() {
        if (password !== confirmPassword) {
            Alert.alert("Passwords do not match.");
            return;
        }
        setLoading(true);
        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) Alert.alert(error.message);
        if (!session) {
            Alert.alert("Please check your inbox for email verification!");
        }
        setLoading(false);
    }

    return (
        <Pressable
            style={{ flex: 1 }}
            onPress={Keyboard.dismiss}
        >
            <View>
                <Link href="./signIn">
                    <Text>Back</Text>
                </Link>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    autoCapitalize="none"
                    textContentType={Platform.OS === "ios" ? "emailAddress" : undefined}
                    autoComplete={Platform.OS !== "ios" ? "email" : undefined}
                    inputMode="email"
                />
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoComplete="current-password"
                />
                <TextInput
                    style={styles.input}
                    value={confirmPassword}
                    onChangeText={(value) => setConfirmPassword(value)}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoComplete="new-password"
                />
                <Button
                    title="Sign Up"
                    onPress={() => signUpWithEmail()}
                    disabled={loading}
                />
            </View>
        </Pressable>
    )
})

export default SignUp;

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: "gray",
        borderRadius: 4,
    },
});