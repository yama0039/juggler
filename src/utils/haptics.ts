/**
 * Triggers a short vibration on supported devices (haptic feedback)
 * @param duration Duration in milliseconds (default: 30ms)
 */
export const vibrate = (duration: number = 30) => {
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
        try {
            window.navigator.vibrate(duration);
        } catch (e) {
            // Silently ignore vibration errors (e.g. not supported or restricted)
        }
    }
};
