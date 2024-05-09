import React, { Fragment } from "react";
import DepartmentCard from "../components/department/DepartmentCard";
import Banner from "../components/banner/Banner";

export default function DepartmentList() {
  return (
    <Fragment>
      <Banner />
      <DepartmentCard />
    </Fragment>
  );
}
