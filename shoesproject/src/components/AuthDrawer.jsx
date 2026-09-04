import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, User, Eye, LogOut, CheckCircle2, Loader2, Check } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';


const USERS_KEY = 'shoes_users';

const getUsers = () => {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const normalize = (str) => (str || '').trim().toLowerCase();
const normalizePhone = (str) => (str || '').replace(/\s+/g, '');

const getInitials = (name) => {
  if (!name) return 'U';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'U';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

// Email VƏ ya telefon ilə istifadəçi axtarır (login üçün)
const findUserByIdentifier = (users, identifier) => {
  const normId = normalize(identifier);
  const normIdPhone = normalizePhone(identifier);
  return users.find(
    (u) =>
      (u.email && normalize(u.email) === normId) ||
      (u.phone && normalizePhone(u.phone) === normIdPhone)
  );
};

// Email VƏ ya telefon üzrə dublikat yoxlanışı (qeydiyyat üçün)
const findDuplicateUser = (users, email, phone) => {
  const normEmail = normalize(email);
  const normPhone = normalizePhone(phone);
  return users.find(
    (u) =>
      (u.email && normalize(u.email) === normEmail) ||
      (u.phone && normalizePhone(u.phone) === normPhone)
  );
};

export const AuthDrawer = ({ isOpen, onClose, user, onLoginSuccess, onLogout }) => {
  const [authTab, setAuthTab] = useState('login');
  const [isLoading, setIsLoading] = useState(false);

  // reCAPTCHA simulyasiyası state-ləri
  const [captchaStatus, setCaptchaStatus] = useState('idle'); // 'idle' | 'verifying' | 'success'
  const [regCaptchaStatus, setRegCaptchaStatus] = useState('idle');

  // Giriş state-ləri
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginSuccessMsg, setLoginSuccessMsg] = useState(false);

  // Qeydiyyat state-ləri
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phonePrefix, setPhonePrefix] = useState('050');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('Kişi');
  const [regPassword, setRegPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [regError, setRegError] = useState('');
  const [regSuccessMsg, setRegSuccessMsg] = useState(false);

  // Şifrəni unutdum rejimi
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);
  const [forgotError, setForgotError] = useState('');

  // Formu sıfırlamaq üçün funksiya (pəncərə bağlananda işləyəcək)
  const handleResetAndClose = () => {
    setLoginIdentifier('');
    setLoginPassword('');
    setLoginError('');
    setLoginSuccessMsg(false);
    setCaptchaStatus('idle');

    setFirstName('');
    setLastName('');
    setPhoneNumber('');
    setRegEmail('');
    setBirthDate('');
    setGender('Kişi');
    setRegPassword('');
    setConfirmPassword('');
    setAgreedToTerms(false);
    setRegError('');
    setRegSuccessMsg(false);
    setRegCaptchaStatus('idle');

    setIsForgotPassword(false);
    setForgotEmail('');
    setForgotSuccess(false);
    setForgotError('');

    onClose();
  };

  // ReCAPTCHA kliklənmə funksiyası (Giriş üçün)
  const handleCaptchaClick = () => {
    if (captchaStatus === 'success' || captchaStatus === 'verifying') return;
    setCaptchaStatus('verifying');
    setTimeout(() => {
      setCaptchaStatus('success');
    }, 800);
  };

  // ReCAPTCHA kliklənmə funksiyası (Qeydiyyat üçün)
  const handleRegCaptchaClick = () => {
    if (regCaptchaStatus === 'success' || regCaptchaStatus === 'verifying') return;
    setRegCaptchaStatus('verifying');
    setTimeout(() => {
      setRegCaptchaStatus('success');
    }, 800);
  };

  // 1. Adi Giriş Məntiqi
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');

    if (!loginIdentifier.trim() || !loginPassword.trim()) {
      setLoginError('Bütün xanaları doldurun.');
      return;
    }

    if (captchaStatus !== 'success') {
      setLoginError('Zəhmət olmasa "Mən robot deyiləm" təsdiqini tamamlayın.');
      return;
    }

    const users = getUsers();
    const foundUser = findUserByIdentifier(users, loginIdentifier);

    if (!foundUser) {
      setLoginError('Belə bir e-poçt və ya istifadəçi tapılmadı. Zəhmət olmasa əvvəlcə qeydiyyatdan keçin.');
      return;
    }

    // Google hesabında şifrə yoxdur — adi formada onu keçmək OLMAZ.
    // (Əvvəlki versiyada bu yoxlama yalnız provider === 'credentials' olduqda
    // işləyirdi, yəni Google hesabına İXTİYARİ şifrə ilə daxil olmaq mümkün idi.)
    if (foundUser.provider === 'google' || !foundUser.password) {
      setLoginError('Bu hesab Google ilə qeydiyyatdan keçib. Zəhmət olmasa "Google ilə davam et" düyməsini istifadə edin.');
      return;
    }

    if (foundUser.password !== loginPassword) {
      setLoginError('Daxil etdiyiniz şifrə yanlışdır.');
      return;
    }

    // Şifrəni frontend state-inə/parent-ə ötürmürük
    const { password, ...safeUserData } = foundUser;
    const userData = {
      ...safeUserData,
      emailOrPhone: foundUser.email || foundUser.phone,
    };

    setIsLoading(true);
    setLoginSuccessMsg(true);

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(userData);
      setLoginSuccessMsg(false);
      handleResetAndClose();
    }, 1500);
  };

  // 2. Qeydiyyat Məntiqi
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setRegError('');

    if (!firstName.trim() || !lastName.trim() || !phoneNumber.trim() || !regEmail.trim() || !regPassword.trim()) {
      setRegError('Bütün zəruri xanaları doldurun.');
      return;
    }

    if (!/^\d{7}$/.test(phoneNumber)) {
      setRegError('Telefon nömrəsi düz 7 rəqəmdən ibarət olmalıdır.');
      return;
    }

    if (regPassword !== confirmPassword) {
      setRegError('Şifrələr bir-biri ilə eyni deyil!');
      return;
    }

    if (regPassword.length < 8) {
      setRegError('Şifrə minimum 8 simvoldan ibarət olmalıdır.');
      return;
    }

    if (!agreedToTerms) {
      setRegError('Qaydalar və Şərtlərlə razılaşmalısınız.');
      return;
    }

    if (regCaptchaStatus !== 'success') {
      setRegError('Zəhmət olmasa "Mən robot deyiləm" təsdiqini tamamlayın.');
      return;
    }

    const fullPhone = `${phonePrefix} ${phoneNumber}`.trim();
    const users = getUsers();

    // Dublikat yoxlanışı — əvvəlki versiyada bu YOX idi, yeni qeydiyyat
    // köhnə hesabın üstündən sükutla yazırdı.
    const duplicate = findDuplicateUser(users, regEmail, fullPhone);
    if (duplicate) {
      setRegError('Bu e-poçt və ya telefon nömrəsi ilə istifadəçi artıq mövcuddur. Zəhmət olmasa daxil olun.');
      return;
    }

    const newUser = {
      name: `${firstName} ${lastName}`.trim(),
      email: regEmail.trim(),
      phone: fullPhone,
      birthDate,
      gender,
      password: regPassword,
      provider: 'credentials',
    };

    saveUsers([...users, newUser]);

    const { password, ...safeUserData } = newUser;
    const userData = { ...safeUserData, emailOrPhone: newUser.email };

    setIsLoading(true);
    setRegSuccessMsg(true);

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(userData);
      setRegSuccessMsg(false);
      handleResetAndClose();
    }, 1500);
  };

  // 3. Google ilə Giriş
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      try {
        const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });

        if (!res.ok) {
          throw new Error('Google-dan istifadəçi məlumatları alınarkən xəta baş verdi');
        }

        const googleData = await res.json();
        const users = getUsers();
        const existing = users.find((u) => normalize(u.email) === normalize(googleData.email));

        const googleUser = {
          name: googleData.name,
          email: googleData.email,
          avatar: googleData.picture,
          provider: 'google',
          // Əgər bu email əvvəllər adi formada qeydiyyatdan keçibsə, telefonunu saxlayaq
          phone: existing?.phone,
        };

        const updatedUsers = existing
          ? users.map((u) => (normalize(u.email) === normalize(googleData.email) ? { ...u, ...googleUser } : u))
          : [...users, googleUser];

        saveUsers(updatedUsers);

        const userData = { ...googleUser, emailOrPhone: googleUser.email };
        setLoginSuccessMsg(true);

        setTimeout(() => {
          setIsLoading(false);
          onLoginSuccess(userData);
          setLoginSuccessMsg(false);
          handleResetAndClose();
        }, 1500);
      } catch (error) {
        setIsLoading(false);
        console.error('Google istifadəçi məlumatları alınmadı:', error);
        setLoginError('Google ilə giriş zamanı xəta baş verdi.');
      }
    },
    onError: (error) => {
      setIsLoading(false);
      console.error('Google ilə giriş xətası baş verdi:', error);
      setLoginError('Google ilə giriş ləğv edildi və ya xəta baş verdi.');
    },
  });

  // 4. Şifrə bərpası
  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setForgotError('');

    if (!forgotEmail.trim()) {
      setForgotError('Zəhmət olmasa e-poçt ünvanınızı daxil edin.');
      return;
    }

    const users = getUsers();
    const foundUser = findUserByIdentifier(users, forgotEmail);

    if (!foundUser) {
      setForgotError('Bu e-poçt ünvanı ilə istifadəçi tapılmadı.');
      return;
    }

    if (foundUser.provider === 'google' || !foundUser.password) {
      setForgotError('Bu hesab Google ilə qeydiyyatdan keçib, şifrə bərpası tələb olunmur. "Google ilə davam et" düyməsini istifadə edin.');
      return;
    }

    setForgotSuccess(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleResetAndClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col p-6 sm:p-8 overflow-y-auto"
      >
        {isLoading && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-center p-6">
            <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mb-4 shadow-inner relative">
              <Loader2 className="w-8 h-8 text-rose-600 animate-spin" />
            </div>
            <h4 className="text-base font-bold text-gray-900 mb-1">Yoxlanılır və daxil olunur...</h4>
            <p className="text-xs text-gray-500">Zəhmət olmasa bir neçə saniyə gözləyin</p>
          </div>
        )}

        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center">
              <User size={18} />
            </div>
            <span className="font-bold text-base text-gray-900">
              {user ? 'Şəxsi Kabinet' : 'Giriş / Qeydiyyat'}
            </span>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {user ? (
          <div className="py-8 flex flex-col items-center text-center flex-grow">
            <div className="w-20 h-20 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-inner overflow-hidden">
              {getInitials(user.name)}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{user.name}</h3>
            <p className="text-sm text-gray-500 mb-8">{user.emailOrPhone || user.email}</p>

            {/* <div className="w-full space-y-3 text-left">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors">
                📦 Sifarişlərim
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors">
                ❤️ Seçilmiş məhsullar
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors">
                ⚙️ Hesab tənzimləmələri
              </div>
            </div> */}

            <div className="mt-auto w-full pt-6">
              <button
                onClick={() => {
                  onLogout();
                  handleResetAndClose();
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-rose-50 text-rose-600 hover:bg-rose-100 font-semibold rounded-xl transition-colors text-sm cursor-pointer"
              >
                <LogOut size={18} />
                Hesabdan çıxış
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-grow flex flex-col pt-4">
            {isForgotPassword ? (
              <div className="py-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Şifrənin bərpası</h3>
                <p className="text-xs text-gray-500 mb-6">E-poçt ünvanınızı daxil edin, sizə şifrə sıfırlama linki göndərəcəyik.</p>

                {forgotError && (
                  <div className="p-3 bg-rose-50 text-rose-600 rounded-xl text-xs font-medium mb-4">
                    {forgotError}
                  </div>
                )}

                {forgotSuccess ? (
                  <div className="p-4 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-medium mb-4">
                    Bərpa linki e-poçtunuza göndərildi! Zəhmət olmasa poçtunuzu yoxlayın.
                  </div>
                ) : (
                  <form onSubmit={handleForgotSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">E-poçt</label>
                      <input
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="E-poçtunuzu daxil edin..."
                        value={forgotEmail}
                        onChange={(e) => {
                          setForgotEmail(e.target.value);
                          if (forgotError) setForgotError('');
                        }}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-900"
                      />
                    </div>
                    <button type="submit" className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-3.5 rounded-xl text-sm transition-all cursor-pointer">
                      Göndər
                    </button>
                  </form>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setIsForgotPassword(false);
                    setForgotSuccess(false);
                    setForgotError('');
                  }}
                  className="w-full mt-4 text-center text-xs font-semibold text-gray-500 hover:text-gray-900 cursor-pointer"
                >
                  ← Geri qayıt
                </button>
              </div>
            ) : (
              <>
                {(loginSuccessMsg || regSuccessMsg) && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center gap-3 shadow-sm"
                  >
                    <CheckCircle2 className="text-emerald-600 flex-shrink-0" size={22} />
                    <div className="text-sm font-semibold">
                      Uğurla daxil olundu! Səhifəyə yönləndirilirsiniz...
                    </div>
                  </motion.div>
                )}

                {loginError && authTab === 'login' && (
                  <div className="p-3 bg-rose-50 text-rose-600 rounded-xl text-xs font-medium mb-4">
                    {loginError}
                  </div>
                )}

                <div className="flex border-b border-gray-200 mb-6">
                  <button
                    type="button"
                    onClick={() => { setAuthTab('login'); setLoginError(''); }}
                    className={`flex-1 pb-3 text-sm font-bold tracking-wide uppercase transition-colors relative cursor-pointer ${
                      authTab === 'login' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    Giriş
                    {authTab === 'login' && (
                      <motion.div layoutId="activeAuthTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setAuthTab('register'); setRegError(''); }}
                    className={`flex-1 pb-3 text-sm font-bold tracking-wide uppercase transition-colors relative cursor-pointer ${
                      authTab === 'register' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    Qeydiyyat
                    {authTab === 'register' && (
                      <motion.div layoutId="activeAuthTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
                    )}
                  </button>
                </div>

                <div className="mb-6 space-y-3">
                  <button
                    type="button"
                    onClick={() => handleGoogleLogin()}
                    className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm font-semibold text-gray-700 shadow-sm cursor-pointer"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.2v3.15C3.18 21.34 7.22 24 12 24z"/>
                      <path fill="#FBBC05" d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.6H1.2C.43 8.15 0 9.89 0 12s.43 3.85 1.2 5.4l4.07-3.16z"/>
                      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.22 0 3.18 2.66 1.2 6.6l4.07 3.15c.95-2.85 3.6-4.96 6.73-4.96z"/>
                    </svg>
                    Google ilə davam et
                  </button>
                </div>

                <div className="relative flex py-2 items-center mb-4">
                  <div className="flex-grow border-t border-gray-200"></div>
                  <span className="flex-shrink mx-4 text-xs text-gray-400 uppercase tracking-wider">və ya</span>
                  <div className="flex-grow border-t border-gray-200"></div>
                </div>

                {authTab === 'login' ? (
                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">E-poçt / Telefon</label>
                      <input
                        type="text"
                        required
                        autoComplete="username"
                        placeholder="E-poçt və ya nömrə..."
                        value={loginIdentifier}
                        onChange={(e) => {
                          setLoginIdentifier(e.target.value);
                          if (loginError) setLoginError('');
                        }}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-900"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-semibold text-gray-700 uppercase">Şifrə</label>
                        <button
                          type="button"
                          onClick={() => { setIsForgotPassword(true); setLoginError(''); }}
                          className="text-xs text-sky-500 hover:underline cursor-pointer"
                        >
                          Şifrəni unutmusunuz?
                        </button>
                      </div>
                      <div className="relative">
                        <input
                          type={showLoginPassword ? 'text' : 'password'}
                          required
                          autoComplete="current-password"
                          value={loginPassword}
                          onChange={(e) => {
                            setLoginPassword(e.target.value);
                            if (loginError) setLoginError('');
                          }}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowLoginPassword(!showLoginPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                        >
                          <Eye size={18} />
                        </button>
                      </div>
                    </div>

                    {/* ReCAPTCHA Box (Giriş) */}
                    <div
                      onClick={handleCaptchaClick}
                      className="border border-gray-200 rounded-xl p-3.5 flex items-center justify-between bg-white shadow-sm cursor-pointer hover:border-gray-300 transition-all select-none"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded border-2 border-gray-300 flex items-center justify-center bg-white transition-all">
                          {captchaStatus === 'verifying' && <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />}
                          {captchaStatus === 'success' && <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />}
                        </div>
                        <span className="text-sm text-gray-800 font-medium">Mən robot deyiləm</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <svg className={`w-6 h-6 text-blue-600 ${captchaStatus === 'verifying' ? 'animate-spin' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.63-5.63" />
                        </svg>
                        <span className="text-[10px] text-gray-500 font-semibold tracking-tighter mt-0.5">reCAPTCHA</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-3.5 rounded-xl transition-all shadow-md text-sm mt-2 cursor-pointer"
                    >
                      Giriş
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleRegisterSubmit} className="space-y-4">
                    {regError && (
                      <div className="p-3 bg-rose-50 text-rose-600 rounded-xl text-xs font-medium">
                        {regError}
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Adınız</label>
                        <input
                          type="text"
                          required
                          autoComplete="given-name"
                          value={firstName}
                          onChange={(e) => {
                            setFirstName(e.target.value);
                            if (regError) setRegError('');
                          }}
                          className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Soyadınız</label>
                        <input
                          type="text"
                          required
                          autoComplete="family-name"
                          value={lastName}
                          onChange={(e) => {
                            setLastName(e.target.value);
                            if (regError) setRegError('');
                          }}
                          className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Telefon</label>
                      <div className="grid grid-cols-3 gap-2">
                        <select
                          value={phonePrefix}
                          onChange={(e) => setPhonePrefix(e.target.value)}
                          className="px-2 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm cursor-pointer focus:outline-none focus:border-gray-900"
                        >
                          <option value="050">050</option>
                          <option value="051">051</option>
                          <option value="055">055</option>
                          <option value="070">070</option>
                          <option value="077">077</option>
                          <option value="099">099</option>
                        </select>
                        <input
                          type="text"
                          required
                          autoComplete="tel-national"
                          placeholder="577*******"
                          inputMode="numeric"
                          maxLength={7}
                          value={phoneNumber}
                          onChange={(e) => {
                            const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 7);
                            setPhoneNumber(digitsOnly);
                            if (regError) setRegError('');
                          }}
                          className="col-span-2 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-900"
                        />
                      </div>
                      <p className="text-[11px] text-gray-400 mt-1.5">
                        Nömrə düz 7 rəqəmdən ibarət olmalıdır (məs: 577 12 34)
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">E-poçt</label>
                      <input
                        type="email"
                        required
                        autoComplete="email"
                        value={regEmail}
                        onChange={(e) => {
                          setRegEmail(e.target.value);
                          if (regError) setRegError('');
                        }}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-900"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Doğum tarixi</label>
                        <input
                          type="date"
                          autoComplete="bday"
                          value={birthDate}
                          onChange={(e) => setBirthDate(e.target.value)}
                          className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm cursor-pointer focus:outline-none focus:border-gray-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Cins</label>
                        <select
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                          className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm cursor-pointer focus:outline-none focus:border-gray-900"
                        >
                          <option value="Kişi">Kişi</option>
                          <option value="Qadın">Qadın</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Şifrə</label>
                      <div className="relative">
                        <input
                          type={showRegPassword ? 'text' : 'password'}
                          required
                          autoComplete="new-password"
                          placeholder="Minimum 8 simvol"
                          value={regPassword}
                          onChange={(e) => {
                            setRegPassword(e.target.value);
                            if (regError) setRegError('');
                          }}
                          className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowRegPassword(!showRegPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                        >
                          <Eye size={18} />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Təkrar şifrə</label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          required
                          autoComplete="new-password"
                          placeholder="Şifrəni təkrarla"
                          value={confirmPassword}
                          onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            if (regError) setRegError('');
                          }}
                          className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                        >
                          <Eye size={18} />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={agreedToTerms}
                        onChange={(e) => {
                          setAgreedToTerms(e.target.checked);
                          if (regError) setRegError('');
                        }}
                        className="w-4 h-4 rounded text-gray-900 cursor-pointer"
                      />
                      <label htmlFor="terms" className="text-xs text-gray-600 cursor-pointer">
                        Mən oxudum və razıyam <span className="text-sky-500 underline">Qaydalar və Şərtlər</span>
                      </label>
                    </div>

                    {/* ReCAPTCHA Box (Qeydiyyat) */}
                    <div
                      onClick={handleRegCaptchaClick}
                      className="border border-gray-200 rounded-xl p-3.5 flex items-center justify-between bg-white shadow-sm cursor-pointer hover:border-gray-300 transition-all select-none"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded border-2 border-gray-300 flex items-center justify-center bg-white transition-all">
                          {regCaptchaStatus === 'verifying' && <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />}
                          {regCaptchaStatus === 'success' && <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />}
                        </div>
                        <span className="text-sm text-gray-800 font-medium">Mən robot deyiləm</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <svg className={`w-6 h-6 text-blue-600 ${regCaptchaStatus === 'verifying' ? 'animate-spin' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.63-5.63" />
                        </svg>
                        <span className="text-[10px] text-gray-500 font-semibold tracking-tighter mt-0.5">reCAPTCHA</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-3.5 rounded-xl transition-all shadow-md text-sm mt-2 cursor-pointer"
                    >
                      Qeydiyyat
                    </button>
                  </form>
                )}
              </>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};