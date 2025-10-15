import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { addUser, saveCurrentUser } from '../../lib/services/userStorage';
import { validateRegistrationDraft } from '../../lib/registrationTypes';
import { Alert } from 'react-native';
import Step1EmailPassword from './step1_email_password';
import StepAddNameSurname from './stepadd_namesurname';
import Step2Photo from './step2_photo';
import Step3Nationality from './step3_nationality';
import Step4Languages from './step4_languages';
import Step5Interests from './step5_interests';
import Step6Student from './step6_student';
import Step7Nickname from './step7_nickname';
import Step8StatusCountry from './step8_status_country';

export default function RegistrationFlow() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const draft: any = useRef({}).current;

  const next = () => setIndex(i => Math.min(i + 1, steps.length - 1));
  const back = () => setIndex(i => Math.max(i - 1, 0));

  const finish = async () => {
    const draftObj = draft as any;
    const res = validateRegistrationDraft(draftObj);
    if (!res.ok) {
      Alert.alert('Недостаточно данных', `Пожалуйста заполните: ${res.missing.join(', ')}`);
      return;
    }
    const user = { ...draftObj, isLoggedIn: true };
    await addUser(user);
    await saveCurrentUser(user);
    router.replace('/(tabs)');
  };

  const steps = [
    <Step1EmailPassword draft={draft} onNext={next} key="s1" />,
    <StepAddNameSurname draft={draft} onNext={next} key="s2" />,
    <Step2Photo draft={draft} onSkip={next} onNext={next} key="s3" />,
    <Step3Nationality draft={draft} onChanged={(n:any)=>{draft.nationality=n;}} onNext={next} onBack={back} key="s4" />,
    <Step4Languages draft={draft} onNext={next} onBack={back} key="s5" />,
    <Step5Interests draft={draft} onNext={next} onBack={back} key="s6" />,
    <Step6Student draft={draft} onNext={next} onBack={back} key="s7" />,
    <Step7Nickname draft={draft} onNext={next} onBack={back} key="s8" />,
    <Step8StatusCountry draft={draft} onNext={finish} onBack={back} key="s9" />,
  ];

  return (
    <View style={{flex:1}}>
      {steps[index]}
    </View>
  );
}
