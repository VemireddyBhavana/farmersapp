import api from "./api";

export type BookingStatus = "Pending" | "Approved" | "Rejected" | "Completed" | "Cancelled";

export interface Booking {
    _id: string;
    farmerId: any;
    equipmentId: any;
    ownerId: any;
    date: string;
    startTime?: string;
    durationHours: number;
    totalPrice: number;
    status: BookingStatus;
    notes?: string;
    createdAt: string;
}

export interface CreateBookingPayload {
    equipmentId: string;
    date: string;
    startTime?: string;
    durationHours: number;
    notes?: string;
}

export const bookingService = {
    async getAll(): Promise<Booking[]> {
        const { data } = await api.get<Booking[]>("/bookings");
        return data;
    },

    async checkAvailability(equipmentId: string, date: string): Promise<{ available: boolean }> {
        const { data } = await api.get("/bookings/availability", { params: { equipmentId, date } });
        return data;
    },

    async create(payload: CreateBookingPayload): Promise<{ message: string; booking: Booking }> {
        const { data } = await api.post("/bookings", payload);
        return data;
    },

    async updateStatus(id: string, status: BookingStatus): Promise<{ message: string; booking: Booking }> {
        const { data } = await api.put(`/bookings/${id}/status`, { status });
        return data;
    },
};
