import React, { Component } from 'react'
import Swal from 'sweetalert2'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, {
  Search,
  CSVExport
} from "react-bootstrap-table2-toolkit";
import cellEditFactory from 'react-bootstrap-table2-editor';
import 'sweetalert2/src/sweetalert2.scss'
import axios from 'axios';

import './main.scss' // webpack must be configured to do this


/*
docs
https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/basic-sort.html

# TODO
Specify non-editable rows
https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/cell-edit-props.html#celleditnoneditablerows-function


*/

const API = "https://411yellows20.cs.odu.edu/joe";

const { SearchBar, ClearSearchButton } = Search;
const { ExportCSVButton } = CSVExport;

function neRows() {
  return [512]
}

class ProjectTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      blockList: [],
      calendarEvents: [],
      columns: [
        /*{
        dataField: 'id',
        text: 'ID',
        sort: true,
        editable: false
      }, */{
        dataField: 'title',
        text: 'Project Name',
        sort: true
      }, {
        dataField: 'desc',
        text: 'Details',
        sort: false,
        headerStyle: () => {
          return { width: "25%" };
        }
      }, {
        dataField: 'owner',
        text: 'Owner',
        sort: true,
        editable: false
      }, {
        dataField: 'contact',
        text: 'Contact',
        sort: false,
        editable: false,
        style: { overflowWrap: 'break-word', wordWrap: 'break-word' }
      }, {
        dataField: 'percentComplete',
        text: '% Progress',
        sort: true
      }, {
        dataField: 'created',
        text: 'Created',
        sort: true,
        editable: false
      }, {
        dataField: 'date',
        text: 'Next Event',
        sort: true
      }, {
        dataField: 'organization',
        text: 'Org',
        sort: true,
        editable: false
      }, {
        dataField: 'location',
        text: 'Location',
        sort: false,
        editable: false
      }]
    };
  }



  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then(data => {

        let tmpArray = []
        let block = []
        for (var i = 0; i < data.results.length; i++) {
          tmpArray.push({
            id: data.results[i].ProjectId,
            title: data.results[i].ProjectName,
            desc: data.results[i].ProjectDescription,
            owner: data.results[i].CreatedBy,
            date: (data.results[i].EventDateTime),
            created: data.results[i].CreatedDate,
            organization: data.results[i].Organization,
            location: data.results[i].ProjectLocation,
            percentComplete: data.results[i].PercentComplete,
            contact: data.results[i].Contact
          })
          if (data.results[i].CreatedBy != "Bob Phelps")
            block.push(data.results[i].ProjectId)
        }

        this.setState({ projects: tmpArray })
        this.setState({ blockList: block })
      });
  }

  render() {

    const { projects } = this.state


    return (
      /*<div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>*/
      <ToolkitProvider
        bootstrap4
        keyField="id"
        data={this.state.projects}
        columns={this.state.columns}
        search
        blocking={this.state.blockList}
        exportCSV={{
          fileName: 'ODUConnect_Projects.csv'
        }}
      >
        {props => (
          <React.Fragment>
            <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', width: '800px', padding:'5px' }}> <SearchBar {...props.searchProps} />
              <ClearSearchButton
                className="btn-secondary"
                {...props.searchProps}
              />
              <ExportCSVButton className="btn-primary" {...props.csvProps} style={{padding:'5px', width:'200px'}}>
                Download CSV
                </ExportCSVButton>
            </div>

            <br />
            <BootstrapTable {...props.baseProps}
              pagination={paginationFactory()}
              cellEdit={cellEditFactory({
                mode: 'click',
                blurToSave: true,
                afterSaveCell: (oldValue, newValue, row, column) => {
                  axios.post('https://411yellows20.cs.odu.edu/tableupdate/' + row.id + '/' + row.title + '/' + row.date + '/' + row.owner + '/' + row.percentComplete + '/' + row.desc)


                }
              })

              }
            />

          </React.Fragment>
        )}
      </ToolkitProvider>
      /*</div>*/

    )
  }
}

export default ProjectTable;
