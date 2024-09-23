
export interface FlightStateTypes {
    FromWhereFlight: string;
    ToWhereFlight: string;
    DateFlight: number;
    PersonsFlight: number;
    PickedFlight: DepartingFlightsArrType;
    Seat: string
};

export interface FlightTypes {
    id?: string;
    name: string;
    abr: string;
};

export interface DepartingFlightsArrType {
    img: string,
    companyTitle: string,
    travelTime: string,
    price: number,
    duration: string,
    stop: string,
    stopTime: string,
};

export interface PassengerStateType {
    pFirstName: string,
    pMiddleName: string,
    pLastName: string,
    suffix: string,
    birthDate: string,
    pEmail: string,
    pPhone: number,
    pRedressPhone: number,
    pKnowPhone: number,
    pEmergencyFirstName: string,
    pEmergencyLastName: string,
    pEmergencyEmail: string,
    pEmergencyPhone: number,
}