import { useQuery } from "@apollo/client";

import { GET_ENTITY } from "@/api/graphql/queries/getEntity";
import { Company, Contact } from "@/types/types";

const useEntity = (id: number | null) => {
  const { data, loading } = useQuery<{ getEntity: Contact | Company }>(
    GET_ENTITY,
    {
      variables: { getEntityId: id },
      skip: !id,
    }
  );

  const valueObject = data?.getEntity;

  return { data: valueObject, loading };
};

export default useEntity;
