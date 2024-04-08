export enum EntityType {
  CONTACT = "CONTACT",
  COMPANY = "COMPANY",
}

export interface Entity {
  id: number;
  name: string;
  __typename: "Contact" | "Company";
}

export interface Contact extends Entity {
  email: string;
  phone?: string;
}

export interface Company extends Entity {
  industry: string;
  contactEmail?: string;
}

export interface Input {
  entityType: EntityType;
  email?: string;
  contactEmail?: string;
  phone?: string;
  industry?: string;
}

export interface CreateEntityInput extends Input {
  name: string;
}

export interface UpdateEntityInput extends Input {
  id: number;
  name?: string;
}
