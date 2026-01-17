import { queryClient } from './query-client';
import { useQuery } from '@tanstack/react-query';

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

const ALERT_KEY = ['globalState', 'alert'];
const LOADING_KEY = ['globalState', 'isLoading'];
const SLEEP_MODE_KEY = ['globalState', 'sleepMode'];

const defaultAlertState: AlertState = {
  visible: false,
  title: '',
  message: '',
  actions: [],
};

export const alertVar = (val?: AlertState) => {
  if (val !== undefined) {
    const current = queryClient.getQueryData<AlertState>(ALERT_KEY);
    if (JSON.stringify(current) !== JSON.stringify(val)) {
      queryClient.setQueryData(ALERT_KEY, val);
    }
  }
  return queryClient.getQueryData<AlertState>(ALERT_KEY) || defaultAlertState;
};

export const useAlert = () => {
  const { data } = useQuery({
    queryKey: ALERT_KEY,
    queryFn: () => alertVar(),
    initialData: defaultAlertState,
    staleTime: Infinity,
  });
  return data;
};

export const isLoadingVar = (val?: boolean) => {
  if (val !== undefined) {
    const current = queryClient.getQueryData<boolean>(LOADING_KEY);
    if (current !== val) {
      queryClient.setQueryData(LOADING_KEY, val);
    }
  }
  return !!queryClient.getQueryData<boolean>(LOADING_KEY);
};

export const useIsLoading = () => {
  const { data } = useQuery({
    queryKey: LOADING_KEY,
    queryFn: () => isLoadingVar(),
    initialData: false,
    staleTime: Infinity,
  });
  return data;
};

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

interface SleepModeState {
  sleepModeStartISO: string | null;
  suggestedWakeISO: string | null;
}

const defaultSleepModeState: SleepModeState = {
  sleepModeStartISO: null,
  suggestedWakeISO: null,
};

export const sleepModeVar = (val?: SleepModeState) => {
  if (val !== undefined) {
    const current = queryClient.getQueryData<SleepModeState>(SLEEP_MODE_KEY);
    if (JSON.stringify(current) !== JSON.stringify(val)) {
      queryClient.setQueryData(SLEEP_MODE_KEY, val);
    }
  }
  return queryClient.getQueryData<SleepModeState>(SLEEP_MODE_KEY) || defaultSleepModeState;
};

export const useSleepMode = () => {
  const { data } = useQuery({
    queryKey: SLEEP_MODE_KEY,
    queryFn: () => sleepModeVar(),
    initialData: defaultSleepModeState,
    staleTime: Infinity,
  });
  return data;
};

export const setSuggestedWake = (wakeISO: string) => {
  sleepModeVar({
    ...sleepModeVar(),
    suggestedWakeISO: wakeISO,
  });
};
