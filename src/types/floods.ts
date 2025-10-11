export interface StationData {
  id_stacji: string;
  stacja: string;
  rzeka: string;
  wojewodztwo: string;
  lon: number;
  lat: number;
  stan_wody: string;
  stan_wody_data_pomiaru: string;
  temperatura_wody: string | null;
  temperatura_wody_data_pomiaru: string | null;
  przelyw: string;
  przeplyw_data: string;
  zjawisko_lodowe: string;
  zjawisko_lodowe_data_pomiaru: string;
  zjawisko_zarastania: string;
  zjawisko_zarastania_data_pomiaru: string;
}

export interface FloodsData {
  warningLevel: number;
  reportedAt?: Date | null;
}
