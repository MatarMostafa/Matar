export interface Abwesenheitseintrag {
  mitarbeiterId: string;
  datum: string; // Format: YYYY-MM-DD
  typ: "Urlaub" | "Krankheit" | "Sonstiges";
}