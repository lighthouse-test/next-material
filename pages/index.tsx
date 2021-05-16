import React, { FunctionComponent } from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import Typography from "@material-ui/core/Typography";
import Todos from "../components/Todos";
import dynamic from "next/dynamic";

export const Index: FunctionComponent = () => {
  const getTodoComponent = () => {
    if (process.env.MODE === "spa") {
      const NoSSRTodos = dynamic(() => import("../components/Todos"), {
        ssr: false,
      });
      return <NoSSRTodos />;
    } else {
      return <Todos />;
    }
  };

  return (
    <Layout>
      <>
        <Head>
          <title>Lighthouse Test | Next Material</title>
          <meta name="description" content="Lighthouse Test | Next Material" />
        </Head>
        <Typography variant="h4" component="h2">
          Home
        </Typography>
        {getTodoComponent()}
      </>
    </Layout>
  );
};

export default Index;
