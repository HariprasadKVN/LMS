export interface event {
  date: Date;
  description: string;
  type?: "fixed" | "optional" | "optionalApplied" | "special" | "leave";
}
