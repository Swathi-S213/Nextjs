import React , { useEffect} from "react";
import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar"; 
import { useMenu } from "../components/contextMenu";
import Table from "../components/Table";
import { getApiClient } from "../utils/security";

const DashboardPage = ({ data }) => {
  const columnNames = data.length > 0 ? Object.keys(data[0]) : [];
  const { setMenus } = useMenu();

  useEffect(() => {
    const menus = createMenus(data)
    setMenus(menus);
  }, []);

  const createMenus = (data) => {
    return data.reduce((menus, item) => {
      const { 'Catalog Name': catalogName, 'Display Name': displayName, 'Node Name': nodeName } = item;
     
      if (!menus[catalogName]) {
        menus[catalogName] = {
          id: catalogName,
          label: catalogName,
          submenus: [],
        };
      }
  
     
      menus[catalogName].submenus.push({
        id: nodeName,
        label: displayName,
        link: `/catalog/${nodeName}`, 
      });
  
      return menus;
    }, {});
  };
  
 

  return (
    <Layout>
      <Table data={data} columnNames={columnNames} />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  // console.log("context",context);
  const defaultClient = getApiClient();
  const tableName = "NodeInfo";

  try {
    console.log("Fetching data for table:", tableName);
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
        data: response,
      },
    };
  } catch (error) {
    console.error("Error occurred:", error);
    return {
      props: {
        data: [],
      },
    };
  }
}

export default DashboardPage;
