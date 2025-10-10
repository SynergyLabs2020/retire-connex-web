import { ILocation, NoficationTypes, UserRole } from './base';

enum EmployerStatus {
    PENDING = 'pending',
    REJECTED = 'rejected',
    VERIFIED = 'verified',
}

export interface Employer {
    organizationEmail: string;
    organizationName: string;
    industry: string; // yoki relation boshqa collectiondan
    isVerified: boolean;
    role: UserRole;
    phoneNumber: string;
    address: string;
    location: ILocation;
    manager: {
        fullName: string;
        workEmail: string;
        position: string;
    };
    logo: string;
    description: string;
    status: EmployerStatus;
    notifications: {
        email: string;
        sms: string;
        push: string;
    };
    notificationTypes: NoficationTypes[];
}
