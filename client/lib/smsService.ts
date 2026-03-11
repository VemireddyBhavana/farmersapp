/**
 * Mock SMS service for ISMIGS Platform
 * This simulates sending SMS notifications to farmers.
 * In a production environment, this would integrate with a service like Twilio or MSG91.
 */

export interface SMSMessage {
    to: string;
    message: string;
    type: 'irrigation_alert' | 'booking_confirmation' | 'pest_alert';
}

export const sendSMS = async (message: SMSMessage): Promise<{ success: boolean; id: string }> => {
    console.log(`[SMS SERVICE] Sending ${message.type} to ${message.to}: ${message.message}`);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
        success: true,
        id: `sms_${Math.random().toString(36).substr(2, 9)}`
    };
};

export const notifyIrrigation = async (phoneNumber: string, condition: string) => {
    const message = condition === 'rain'
        ? "ALERT: High probability of rain detected. Your scheduled irrigation has been postponed to save water. - ISMIGS"
        : "REMINDER: Optimal weather conditions for irrigation. Recommended timing: 6 AM to 8 AM. - ISMIGS";

    return sendSMS({
        to: phoneNumber,
        message,
        type: 'irrigation_alert'
    });
};

export const notifyBooking = async (phoneNumber: string, equipmentName: string) => {
    return sendSMS({
        to: phoneNumber,
        message: `CONFIRMED: Your booking for ${equipmentName} is successful. The owner will contact you shortly. - ISMIGS`,
        type: 'booking_confirmation'
    });
};
