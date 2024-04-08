"use client";

import Container from "@/components/custom/atoms/container";
import useEntity from "@/hook/useEntity";
import LabelValue from "@/components/custom/molecules/labelValue";

const MorePage = ({ params }: { params: { id: number } }) => {
  const { data } = useEntity(params.id);

  return (
    data && (
      <Container>
        <section className="space-y-6">
          <h3 className="text-lg font-bold">{data.__typename}</h3>

          <article className="grid grid-cols-2 gap-y-4">
            {Object.entries(data).map(
              ([key, value]) =>
                key !== "__typename" && (
                  <LabelValue key={key} label={key} value={value} />
                )
            )}
          </article>
        </section>
      </Container>
    )
  );
};

export default MorePage;
