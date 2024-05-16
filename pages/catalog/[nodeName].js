// Import necessary modules
import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { Table } from "../../components/AgTable";
import { useRouter } from "next/router";
import { getApiClient } from "../../utils/security";

// Define the CatalogNodePage component
const CatalogNodePage = ({ initialData }) => {
  const router = useRouter();
  const { nodeName } = router.query;
  const defaultClient = getApiClient(); // Initialize defaultClient here
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      console.log("Fetching data for node:", nodeName);
      // Dynamically determine tableName based on nodeName
      const tableName = nodeName[0].toUpperCase() + nodeName.slice(1);
      const response = await new Promise((resolve, reject) => {
        defaultClient.getCatalogTablename(
          20, // Limit
          0, // Skip
          tableName,
          { optionalFilter: "" },
          (error, data, response) => {
            if (error) {
              reject(error);
            } else {
              resolve(data);
            }
          }
        );
      });
      setData(response);
    } catch (error) {
      console.error("Error occurred:", error);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, [nodeName]);

  // Check if data is defined before accessing its properties
  const columnNames = data && data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <Layout>
      <h1 style={{ marginBottom: "20px", fontWeight: "bold" }}>{nodeName}</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Table nodeName={nodeName} data={data} defaultClient={defaultClient} />
      )}
    </Layout>
  );
};

// Define getServerSideProps function to fetch data
export async function getServerSideProps(context) {
  const { nodeName } = context.params;
  const defaultClient = getApiClient(); // Initialize defaultClient here

  try {
    console.log("Fetching data for node:", nodeName);
    // Dynamically determine tableName based on nodeName
    const tableName = nodeName[0].toUpperCase() + nodeName.slice(1);
    const response = await new Promise((resolve, reject) => {
      defaultClient.getCatalogTablename(
        20, // Limit
        0, // Skip
        tableName,
        { optionalFilter: "" },
        (error, data, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        }
      );
    });
    return {
      props: {
        initialData: response,
      },
    };
  } catch (error) {
    console.error("Error occurred:", error);
    return {
      props: {
        initialData: [],
      },
    };
  }
}

// Export the CatalogNodePage component as default
export default CatalogNodePage;
