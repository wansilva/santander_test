export enum CountrysEnum {
    GERMANY = "GERMANY",
    BRAZIL = "BRAZIL",
    DENMARK = "DENMARK",
    US = "US",
    ENGLISHLAND = "ENGLISHLAND",
}

export const CountrysList = {
    [CountrysEnum.GERMANY]: {
        key: CountrysEnum.GERMANY,
        name: "Alemanha",
        timezone: "+2:00",
    },
    [CountrysEnum.BRAZIL]: {
        key: CountrysEnum.BRAZIL,
        name: "Brasil",
        timezone: "-3:00",
    },
    [CountrysEnum.DENMARK]: {
        key: CountrysEnum.DENMARK,
        name: "Dinamarca",
        timezone: "+2:00",
    },
    [CountrysEnum.US]: {
        key: CountrysEnum.US,
        name: "Estados Unidos",
        timezone: "-10:00",
    },
    [CountrysEnum.ENGLISHLAND]: {
        key: CountrysEnum.ENGLISHLAND,
        name: "Inglaterra",
        timezone: "+0:00",
    },
};