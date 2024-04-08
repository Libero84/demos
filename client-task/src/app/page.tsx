"use client";

import { useRef, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";

import Container from "@/components/custom/atoms/container";

import Sidebar from "@/components/custom/organizm/sidebar";
import AddOrEditEntity from "@/components/custom/organizm/form";
import useEntity from "@/hook/useEntity";
import Grid from "@/components/custom/organizm/grid";

export default function Page() {
  const [isShowSidebar, setIsShowSidebar] = useState(false);
  const idRef = useRef<number | null>(null);
  const { data, loading } = useEntity(idRef.current);

  const handleOpenForm = (id: number) => {
    idRef.current = id;
    setIsShowSidebar(true);
  };

  return (
    <>
      <Sidebar
        selector="portal"
        show={isShowSidebar}
        onClose={() => setIsShowSidebar(false)}
      >
        {!loading && data && (
          <AddOrEditEntity
            data={data}
            onClose={() => setIsShowSidebar(false)}
          />
        )}
        {!loading && !data && (
          <AddOrEditEntity
            data={undefined}
            onClose={() => setIsShowSidebar(false)}
          />
        )}
      </Sidebar>

      <article className="space-y-6 h-full flex flex-col">
        <Container>
          <section className="flex items-center">
            <h3 className="font-bold">Add new Entity</h3>
            <CiCirclePlus
              size={40}
              className="ml-10 cursor-pointer"
              onClick={() => {
                idRef.current = null;
                setIsShowSidebar(true);
              }}
            />
          </section>
        </Container>

        <Grid openForm={(id) => handleOpenForm(id)} />
      </article>
    </>
  );
}
