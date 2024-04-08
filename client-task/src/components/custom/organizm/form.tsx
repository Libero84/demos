"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Company, Contact, EntityType } from "@/types/types";
import { CREATE_ENTITY } from "@/api/graphql/mutations/createEntity";
import { GET_ENTITIES } from "@/api/graphql/queries/getEntities";
import { UPDATE_ENTITY } from "@/api/graphql/mutations/updateEntity";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { companySchema, contactSchema } from "@/validationSchema/entitySchema";

interface FormType {
  data?: Contact | Company;
  onClose: () => void;
}

const AddOrEditEntity: React.FC<FormType> = ({ data, onClose }) => {
  const [entityType, setEntityType] = useState<EntityType>(
    data?.id
      ? (data.__typename.toUpperCase() as EntityType)
      : EntityType.CONTACT
  );
  const [addEntities] = useMutation(CREATE_ENTITY, {
    refetchQueries: [GET_ENTITIES, "GetEntities"],
  });

  const [updateEntities] = useMutation(UPDATE_ENTITY, {
    refetchQueries: [{ query: GET_ENTITIES }],
  });
  const form = useForm<z.infer<typeof contactSchema | typeof companySchema>>({
    resolver: zodResolver(
      entityType === EntityType.COMPANY ? companySchema : contactSchema
    ),
    defaultValues: {
      entityType: data?.id ? "" : entityType,
      name: data?.name ?? "",
      phone: data && "phone" in data ? data.phone : "",
      email: data && "email" in data ? data.email : "",
      industry: data && "industry" in data ? data.industry : "",
      contactEmail: data && "contactEmail" in data ? data.contactEmail : "",
    },
  });

  const onSubmit = (
    values: z.infer<typeof contactSchema | typeof companySchema>
  ) => {
    if (data?.id) {
      updateEntities({
        variables: {
          input: {
            ...values,
            id: data.id,
            entityType: data.__typename.toUpperCase(),
          },
        },
      });
    } else {
      addEntities({
        variables: { input: { ...values, entityType: entityType } },
      });
    }

    onClose();
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        {!data?.id && (
          <FormField
            control={form.control}
            name="entityType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span>Entity type:</span>
                </FormLabel>

                <Select
                  onValueChange={(e: EntityType) => {
                    setEntityType(e);
                    form.reset({
                      entityType: e,
                      name: "",
                      email: "",
                      contactEmail: "",
                      industry: "",
                      phone: "",
                    });
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    <SelectItem value={EntityType.CONTACT}>Contact</SelectItem>

                    <SelectItem value={EntityType.COMPANY}>Company</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>
                  <sup className="text-red-500">*</sup>Name:
                </FormLabel>

                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
              </FormItem>

              <FormMessage />
            </>
          )}
        />

        {entityType === EntityType.CONTACT ? (
          <>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel>
                      <sup className="text-red-500">*</sup>Email address:
                    </FormLabel>

                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                  </FormItem>

                  <FormMessage />
                </>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel>Phone:</FormLabel>

                    <FormControl>
                      <Input placeholder="Phone number" {...field} />
                    </FormControl>
                  </FormItem>

                  <FormMessage />
                </>
              )}
            />
          </>
        ) : (
          <>
            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel>
                      <sup className="text-red-500">*</sup>Industry:
                    </FormLabel>

                    <FormControl>
                      <Input placeholder="Industry" {...field} />
                    </FormControl>
                  </FormItem>

                  <FormMessage />
                </>
              )}
            />

            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel>Contact email:</FormLabel>

                    <FormControl>
                      <Input placeholder="Contact email" {...field} />
                    </FormControl>
                  </FormItem>

                  <FormMessage />
                </>
              )}
            />
          </>
        )}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default AddOrEditEntity;
