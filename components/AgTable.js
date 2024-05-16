// Import necessary libraries
import React, { useEffect, useState, useCallback } from "react";
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css"; 
import "ag-grid-community/styles/ag-theme-quartz.css";
import CustomHeaderCheckbox from "./CustomHeaderSelection";
import { getApiClient } from "../utils/security";
import {  useCatalog } from "./contextMenu";
import { fetchColData, fetchColInfo, callFetchAllEnumValues } from "./colInfo";

// Initialize the API client


export const Table = ({ nodeName }) => {
  const defaultClient = getApiClient();
  // State variables
  const [init, setInit] = useState(false);
  const [rawColData, setRawColData] = useState();
  const [enumData, setEnumData] = useState(new Map());
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [gridOption, setGridOption ] = useState({})
  // const { catalogName } = useCatalog();
  // console.log('helloooooo', catalogName)
  // Function to fetch data
  const fetchData = async (defaultClient, nodeName, startRow = 0, endRow = 20) => {
    
    // Make the API call with the updated tableName
    return new Promise((resolve, reject) => {
      let callback = function (error, data, response) {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          const totalCount = response.headers['x-total-count'];
          resolve({ data, totalCount });
          console.log("Response was:", response);
        }
      };
      try {
        // Dynamically determine tableName based on nodeName
        const tableName = nodeName[0].toUpperCase() + nodeName.slice(1);
        defaultClient.getCatalogTablename(
          endRow - startRow,
          startRow,
          tableName,
          {
            optionalFilter: "",
          },
          callback
        );
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  };

  // useEffect hook to fetch column data
  useEffect(() => {
      fetchColData(defaultClient, nodeName, setRawColData);
  }, [nodeName]);

  // useEffect hook to fetch enum data
  useEffect(() => {
    if (rawColData !== undefined && rawColData !== null) {
      callFetchAllEnumValues(defaultClient, rawColData, setEnumData, enumData);
    }
  }, [rawColData, nodeName]);



  // Define datasource for AgGrid
  const myDatasource = {
    rowCount: null,
    getRows: function (params) {
      const startRow = params.startRow;
      const endRow = params.endRow;
      fetchData(defaultClient, nodeName, startRow, endRow).then(({ data, totalCount }) => {
        let lastRow = -1;
        if (data.length < endRow - startRow) {
          lastRow = startRow + data.length;
        }
        this.rowCount = totalCount;
        console.log(`Fetched ${data.length} rows from ${startRow} to ${lastRow}`);
        params.successCallback(data, lastRow);
      }).catch(error => {
        params.failCallback();
      });
    }
  };

  // Callback function for when the grid is ready
  const onGridReady = useCallback(params => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  }, [nodeName]);

  // useEffect(() => {
  //   console.log(myDatasource,'')
   

  //   setGridOption(gridOptions)
  // },[nodeName])
  // // Grid options
 

  const gridOptions = {
    rowModelType: 'infinite',
    datasource: myDatasource,
    pagination: false,
    rowSelection: 'multiple',
    paginationPageSize: 20,
    cacheBlockSize: 20,
    maxBlocksInCache: 10,
    onGridReady: onGridReady,
    components: {
      customHeaderCheckbox: CustomHeaderCheckbox,
    }
  };

  // Modify column definitions
// Modify column definitions
const modifiedColDefs = rawColData ? fetchColInfo(rawColData, enumData) : [];
console.log(modifiedColDefs, 'chand');
if (modifiedColDefs.length > 0) {
  // Create a new column definition for the checkbox
  const checkboxColumnDef = {
    headerName: '',
    field: 'checkbox',
    width: 50, // Adjust width as needed
    checkboxSelection: true,
    headerComponent: 'customHeaderCheckbox',
    headerComponentParams: {
      onCheckboxChange: (checked) => {
        if (checked) {
          // Iterate over each row node and select it
          gridApi.forEachNode((node) => {
            node.setSelected(true);
          });
        } else {
          // Iterate over each row node and deselect it
          gridApi.forEachNode((node) => {
            node.setSelected(false);
          });
        }
      },
      displayName: '', // You can provide a display name if needed
    },
    cellRenderer: (props) => {
      if (props.value !== undefined) {
        return props.value;
      } else {
        return <img src="/static/img/Loading.gif" alt="Loading" />;
      }
    },
  };

  // Insert the checkbox column definition at the beginning of the array
  modifiedColDefs.unshift(checkboxColumnDef);
}

// Render the AgGrid component
return (
  <div className="ag-theme-quartz" style={{ height: 800, width: '100%' }}>
    <AgGridReact
      gridOptions={gridOptions}
      columnDefs={modifiedColDefs}
      onGridReady={(params) => {
        setGridApi(params.api);
      }}
    ></AgGridReact>
  </div>
);
}