import { ILocation, NoficationTypes, UserRole } from './base';

export enum IGender {
    MALE = 'male',
    FEMALE = 'female',
}

export enum Roles {
    PAID = 'paid',
    VOLUNTEER = 'volunteer',
}

export interface Consumer {
    birthDate: string;
    gender: IGender;
    isVerified: boolean;
    role: UserRole;
    phoneNumber: string;
    address: string;
    location: ILocation;
    availability: number; // in weeks
    preferedRole: Roles[];
    preferedWorkRadius: number;
    certificates: string[];
    experienceYears: number;
    skills: string[]; // relation bulishi ham mumkin lekin admin panel da skills qo'shadigan joy yo'q
    hobbies: string[]; // relation bulishi ham mumkin lekin admin panel da hobbies qo'shadigan joy yo'q
    avatar: string;
    notifications: {
        email: string;
        sms: string;
        push: string;
    };
    notificationTypes: NoficationTypes[];
}
