import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Image, StatusBar, TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../services/firebase';
import { loginWithGoogle } from '../services/authApi';
import { useAuth } from '../context/AuthContext';
import { GOOGLE_WEB_CLIENT_ID } from '../config/api';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../constants/theme';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

GoogleSignin.configure({ webClientId: GOOGLE_WEB_CLIENT_ID });

export default function LoginScreen() {
  const { signIn } = useAuth();
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(false);

  // Formulario manual
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSubmittingManual, setIsSubmittingManual] = useState(false);

  const handleManualLogin = async () => {
    // Commit 1: estructura de la función
    console.log('Intento de login manual:', email, password);
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo.data?.idToken || userInfo.idToken;
      if (!idToken) throw new Error('No se recibió token de Google');

      const credential = GoogleAuthProvider.credential(idToken);
      const firebaseUser = await signInWithCredential(auth, credential);

      const firebaseIdToken = await firebaseUser.user.getIdToken();
      const userData = await loginWithGoogle(firebaseIdToken);
      await signIn(userData);
    } catch (error) {
      console.error('Login error:', error);
      if (error.code !== statusCodes.SIGN_IN_CANCELLED && error.code !== statusCodes.IN_PROGRESS) {
        Alert.alert('Error de Autenticación', error.message || 'No se pudo iniciar sesión.', [{ text: 'OK' }]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primaryDark} />

      {/* Top gradient section */}
      <View style={[styles.topSection, { paddingTop: insets.top + 40 }]}>
        {/* Decorative circles */}
        <View style={styles.decorCircle1} />
        <View style={styles.decorCircle2} />

        <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Ionicons name="school" size={44} color={COLORS.textLight} />
          </View>
        </Animated.View>

        <Animated.Text entering={FadeInDown.delay(400).duration(600)} style={styles.brandName}>
          RCE UPT
        </Animated.Text>
        <Animated.View entering={FadeInDown.delay(500).duration(400)} style={styles.brandLine} />
        <Animated.Text entering={FadeInDown.delay(600).duration(400)} style={styles.brandSub}>
          Red Colaborativa Estudiantil
        </Animated.Text>
        <Animated.Text entering={FadeInDown.delay(700).duration(400)} style={styles.brandInstitution}>
          Universidad Privada de Tacna
        </Animated.Text>
      </View>

      {/* Bottom card */}
      <Animated.View entering={FadeInUp.delay(300).duration(700)} style={[styles.bottomSection, { paddingBottom: Math.max(insets.bottom, 32) }]}>
        <Text style={styles.welcomeTitle}>Bienvenido</Text>
        <Text style={styles.welcomeSub}>
          Conecta con la comunidad académica. Publica dudas, ofrece mentoría y gana experiencia.
        </Text>

        {/* Formulario Manual (CA1) */}
        <View style={styles.formContainer}>
          {/* Campo Correo (CA1, CA3) */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Correo Institucional</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={18} color={COLORS.textMuted} style={{ marginRight: 10 }} />
              <TextInput
                style={styles.input}
                placeholder="ejemplo@virtual.upt.pe"
                placeholderTextColor={COLORS.textMuted}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
          </View>

          {/* Campo Contraseña (CA1, CA3) */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Contraseña</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={18} color={COLORS.textMuted} style={{ marginRight: 10 }} />
              <TextInput
                style={styles.input}
                placeholder="Mín. 8 caracteres (A, a, 1)"
                placeholderTextColor={COLORS.textMuted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!isPasswordVisible}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                <Ionicons name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} size={20} color={COLORS.textMuted} />
              </TouchableOpacity>
            </View>
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
          </View>

          {/* Botón de Enviar (CA3) */}
          <TouchableOpacity
            style={[styles.submitBtn, isSubmittingManual && { opacity: 0.8 }]}
            onPress={handleManualLogin}
            disabled={isSubmittingManual}
            activeOpacity={0.8}
          >
            {isSubmittingManual ? (
              <ActivityIndicator color={COLORS.textLight} size="small" />
            ) : (
              <Text style={styles.submitBtnText}>Iniciar Sesión</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>O CONTINUAR CON</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity
          style={[styles.googleBtn, isLoading && styles.googleBtnDisabled]}
          onPress={handleGoogleLogin}
          disabled={isLoading}
          activeOpacity={0.8}
        >
          {isLoading ? (
            <View style={styles.loadingRow}>
              <ActivityIndicator color={COLORS.primary} size="small" />
              <Text style={styles.loadingText}>Conectando...</Text>
            </View>
          ) : (
            <View style={styles.googleBtnContent}>
              <Image
                source={{ uri: 'https://developers.google.com/identity/images/g-logo.png' }}
                style={styles.googleIcon}
              />
              <Text style={styles.googleBtnLabel}>Continuar con Google</Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.domainNotice}>
          <Ionicons name="lock-open-outline" size={14} color={COLORS.success} style={{ marginRight: 6 }} />
          <Text style={styles.domainText}>Acceso con cualquier cuenta Google</Text>
        </View>

        <Text style={styles.footerText}>
          Plataforma de mentoría académica P2P
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.primary },
  topSection: {
    flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: SPACING.xl,
    overflow: 'hidden', position: 'relative',
  },
  decorCircle1: {
    position: 'absolute', top: -60, right: -50,
    width: 220, height: 220, borderRadius: 110,
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  decorCircle2: {
    position: 'absolute', bottom: -30, left: -40,
    width: 160, height: 160, borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  logoContainer: { marginBottom: SPACING.lg },
  logoCircle: {
    width: 90, height: 90, borderRadius: RADIUS.full, backgroundColor: COLORS.accent,
    justifyContent: 'center', alignItems: 'center', ...SHADOWS.large,
  },
  brandName: {
    fontSize: FONTS.sizes.display, fontWeight: '800', color: COLORS.textLight,
    textAlign: 'center', letterSpacing: 2, marginBottom: SPACING.sm,
  },
  brandLine: { width: 44, height: 3, borderRadius: 2, backgroundColor: COLORS.accent, marginBottom: SPACING.md },
  brandSub: { fontSize: FONTS.sizes.lg, color: 'rgba(255,255,255,0.85)', fontWeight: '600' },
  brandInstitution: { fontSize: FONTS.sizes.sm, color: 'rgba(255,255,255,0.5)', fontWeight: '500', marginTop: SPACING.xs },
  bottomSection: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: RADIUS.xl, borderTopRightRadius: RADIUS.xl,
    paddingHorizontal: SPACING.xl, paddingTop: SPACING.xl,
    ...SHADOWS.large,
  },
  welcomeTitle: { fontSize: FONTS.sizes.xl, fontWeight: '800', color: COLORS.textPrimary, marginBottom: SPACING.xs },
  welcomeSub: { fontSize: FONTS.sizes.sm, color: COLORS.textSecondary, lineHeight: 20, marginBottom: SPACING.md },
  formContainer: {
    width: '100%',
    marginBottom: SPACING.sm,
  },
  fieldGroup: {
    marginBottom: SPACING.sm,
  },
  fieldLabel: {
    fontSize: FONTS.sizes.xs,
    fontWeight: '700',
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs - 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    paddingHorizontal: SPACING.md,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: FONTS.sizes.sm,
    color: COLORS.textPrimary,
  },
  errorText: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.error,
    marginTop: 2,
    fontWeight: '600',
  },
  submitBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.sm,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.xs,
    ...SHADOWS.medium,
  },
  submitBtnText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '700',
    color: COLORS.textLight,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.sm,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    fontSize: FONTS.sizes.xs - 1,
    color: COLORS.textMuted,
    marginHorizontal: SPACING.md,
    fontWeight: '700',
  },
  googleBtn: {
    backgroundColor: COLORS.surface, borderRadius: RADIUS.sm, paddingVertical: 12, paddingHorizontal: SPACING.lg,
    borderWidth: 1, borderColor: COLORS.border, ...SHADOWS.medium,
  },
  googleBtnDisabled: { opacity: 0.7 },
  googleBtnContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  googleIcon: { width: 18, height: 18, marginRight: SPACING.md },
  googleBtnLabel: { fontSize: FONTS.sizes.sm, fontWeight: '700', color: COLORS.textPrimary },
  loadingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  loadingText: { marginLeft: SPACING.sm, fontSize: FONTS.sizes.sm, fontWeight: '600', color: COLORS.primary },
  domainNotice: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: SPACING.md,
  },
  domainText: { fontSize: FONTS.sizes.xs, color: COLORS.success, fontWeight: '600' },
  footerText: {
    fontSize: FONTS.sizes.xs, color: COLORS.textMuted, textAlign: 'center', marginTop: SPACING.md,
  },
});
