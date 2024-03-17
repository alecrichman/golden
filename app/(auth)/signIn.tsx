import React, { useState } from "react";
import { Link, router } from "expo-router";
import { observer } from "mobx-react-lite";
import {
  Alert,
  Button,
  Keyboard,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { supabase } from "../../lib/supabase";
import { useStores } from "../../models";

export const SignIn = observer(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { authStore } = useStores();

  async function signInWithEmail() {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
      setLoading(false);
    } else if (data.session && data.user) {
      authStore.setAccessToken(data.session.access_token);
      authStore.setRefreshToken(data.session.refresh_token);
      authStore.setEmail(data.user.email);
      authStore.setId(data.user.id);
    }
    setLoading(false);
  }

  return (
    <Pressable
      style={{ flex: 1 }}
      onPress={Keyboard.dismiss}
    >
      <View>
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
        <Button
          title="Log In"
          onPress={() => {
            signInWithEmail();
            router.replace("/");
          }}
          disabled={loading}
        />
        <Link href="./signUp" asChild>
          <Button
            title="Sign Up"
            disabled={loading} />
        </Link>
      </View>
    </Pressable>
  );
});

export default SignIn;

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
