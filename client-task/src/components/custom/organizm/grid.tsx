"use client";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useQuery } from "@apollo/client";
import { CiCircleMore, CiEdit } from "react-icons/ci";

import { GET_ENTITIES } from "@/api/graphql/queries/getEntities";
import { Entity } from "@/types/types";
import Link from "next/link";

interface GridProps {
  openForm: (arg: number) => void;
}

const Grid: React.FC<GridProps> = ({ openForm }) => {
  const { data, loading, error } = useQuery<{ getEntities: Entity[] }>(
    GET_ENTITIES
  );

  const colDefs: any = [
    { field: "id", flex: 1 },
    { field: "type" },
    { field: "name", flex: 2 },
    {
      headerName: "Action",
      cellRenderer: (p: { data: Entity }) => {
        return (
          <div className="h-full w-full flex items-center">
            <CiEdit
              size={20}
              className="cursor-pointer"
              onClick={() => openForm(p.data.id)}
            />
          </div>
        );
      },
      flex: 1,
      sortable: false,
    },
    {
      headerName: "See more",
      cellRenderer: (p: { data: Entity }) => {
        return (
          <div className="h-full w-full flex items-center">
            <Link href={`/${p.data.id}`}>
              <CiCircleMore size={20} className="cursor-pointer" />
            </Link>
          </div>
        );
      },
      flex: 1,
      sortable: false,
    },
  ];

  const rowDefs = data?.getEntities.map((entity: Entity) => {
    return {
      id: entity.id,
      type: entity.__typename,
      name: entity.name,
    };
  });

  if (loading) {
    return <div>Waiting for data</div>;
  }

  if (error) {
    return <div>Something went wrong pleas try again</div>;
  }

  return (
    <div className="ag-theme-quartz w-full flex-1">
      <AgGridReact
        columnDefs={colDefs}
        rowData={rowDefs}
        domLayout="autoHeight"
      />
    </div>
  );
};

export default Grid;
