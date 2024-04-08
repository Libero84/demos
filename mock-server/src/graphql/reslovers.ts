import fs from "fs";
import path from "path";

const absolutePath = path.resolve("src/mockData", "dataset.json");
const entities = JSON.parse(fs.readFileSync(absolutePath, "utf8"));

const assign = (
  industryOrEmail: string | undefined,
  contact: string | undefined,
  entityType: "CONTACT" | "COMPANY"
) => {
  if (entityType === "COMPANY") {
    return {
      industry: industryOrEmail,
      contactEmail: contact,
    };
  } else {
    return {
      email: industryOrEmail,
      phone: contact,
    };
  }
};

export const resolvers = {
  Entity: {
    __resolveType(entity: any) {
      if (entity.email) {
        return "Contact";
      }
      if (entity.industry) {
        return "Company";
      }
      return null;
    },
  },
  Query: {
    getEntities: () => entities,
    getEntity: (_: never, args: any) => {
      return entities.find((entity: any) => entity.id === +args.id);
    },
  },
  Mutation: {
    createEntity: (_: never, args: any) => {
      const newEntity: any = {
        id: entities.length + 1,
        name: args.input.name,
      };

      if (args.input.entityType === "COMPANY") {
        Object.assign(newEntity, {
          industry: args.input.industry,
          contactEmail: args.input.contactEmail,
        });
      } else {
        Object.assign(newEntity, {
          email: args.input.email,
          phone: args.input.phone,
        });
      }
      entities.push(newEntity);
      fs.writeFile(absolutePath, JSON.stringify(entities), (err) => {
        if (err) {
          console.error(err);
        }
      });

      return newEntity;
    },
    updateEntity: (_: never, args: any) => {
      const updatingEntity = entities.find(
        (entity: any) => entity.id === +args.input.id
      );
      updatingEntity.name = args.input.name ?? updatingEntity.name;

      if (args.input.entityType === "COMPANY") {
        const industry = args.input?.industry;
        const contactEmail = args.input?.contactEmail;
        Object.assign(
          updatingEntity,
          assign(industry, contactEmail, args.input.entityType)
        );
      } else {
        const email = args.input?.email;
        const phone = args.input?.phone;
        Object.assign(
          updatingEntity,
          assign(email, phone, args.input.entityType)
        );
      }

      entities.splice(
        entities.findIndex((entity: any) => entity.id === +args.input.id),
        1,
        updatingEntity
      );
      fs.writeFile(absolutePath, JSON.stringify(entities), (error) => {
        if (error) {
          console.warn(error);
        }
      });

      return updatingEntity;
    },
  },
};
