export enum UserRole {
    ORGANIZATION = 'organization',
    INDIVIDUAL = 'individual',
}

export interface ILocation {
    latitude: number; // float
    longitude: number; // float
}

export enum NoficationTypes {
    NEW_OPORTUNUTIES = 'new_oportunities',
    MESSAGES = 'messages',
    APPLICATION_UPDATES = 'application_updates',
    REVIEWS_FEEDBACKS = 'reviews_feedbacks',
}
