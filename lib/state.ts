import { makeVar } from '@apollo/client';

export interface AlertAction {
  text: string;
  style?: 'default' | 'cancel' | 'destructive';
  onPress?: () => void;
}

export interface AlertState {
  visible: boolean;
  title: string;
  message: string;
  actions: AlertAction[];
}

export const alertVar = makeVar<AlertState>({
  visible: false,
  title: '',
  message: '',
  actions: [],
});

export const isLoadingVar = makeVar<boolean>(false);

export const showAlert = (title: string, message: string, actions?: AlertAction[]) => {
  alertVar({
    visible: true,
    title,
    message,
    actions: actions || [{ text: 'OK' }],
  });
};

export const hideAlert = () => {
  alertVar({
    ...alertVar(),
    visible: false,
  });
};

export const sleepModeVar = makeVar<{
  sleepModeStartISO: string | null;
  suggestedWakeISO: string | null;
}>({
  sleepModeStartISO: null,
  suggestedWakeISO: null,
});

export const setSuggestedWake = (wakeISO: string) => {
  sleepModeVar({
    ...sleepModeVar(),
    suggestedWakeISO: wakeISO,
  });
};
