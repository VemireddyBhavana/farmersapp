import api from "./api";

export interface Equipment {
    _id: string;
    ownerId: any;
    name: string;
    type: string;
    hp?: string;
    pricePerHour: number;
    pricePerDay?: number;
    location: string;
    description?: string;
    imageUrl: string;
    availability: boolean;
    rating: number;
    reviews: number;
    tags: string[];
    createdAt: string;
}

export interface EquipmentFilters {
    type?: string;
    location?: string;
    minPrice?: number;
    maxPrice?: number;
    available?: boolean;
    search?: string;
}

export const equipmentService = {
    async getAll(filters?: EquipmentFilters): Promise<Equipment[]> {
        const { data } = await api.get<Equipment[]>("/equipment", { params: filters });
        return data;
    },

    async getById(id: string): Promise<Equipment> {
        const { data } = await api.get<Equipment>(`/equipment/${id}`);
        return data;
    },

    async create(payload: Partial<Equipment>): Promise<Equipment> {
        const { data } = await api.post<Equipment>("/equipment", payload);
        return data;
    },

    async update(id: string, payload: Partial<Equipment>): Promise<Equipment> {
        const { data } = await api.put<Equipment>(`/equipment/${id}`, payload);
        return data;
    },

    async remove(id: string): Promise<void> {
        await api.delete(`/equipment/${id}`);
    },
};

export const EQUIPMENT_TYPES = [
    "All",
    "Small Tractor",
    "Medium Tractor",
    "Heavy Tractor",
    "Plough",
    "Rotavator",
    "Seeder",
    "Harvester",
    "Sprayer",
    "Other",
] as const;
