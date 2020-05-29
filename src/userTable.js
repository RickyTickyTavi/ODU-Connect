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

const API = "https://411yellows20.cs.odu.edu/getusers";

const { SearchBar, ClearSearchButton } = Search;
const { ExportCSVButton } = CSVExport;

function neRows() {
  return [512]
}

function processContactMethod(userCM) {
    if (userCM.DefaultContactMethod === "M") {
      return userCM.UserMobilePhone;
    } else if (userCM.DefaultContactMethod === "H") {
      return userCM.UserHomePhone;
    } else if (userCM.DefaultContactMethod === "O") {
      return userCM.UserOfficePhone;
    } else {
      return userCM.UserEmailAddress;
    }
  }

class UserTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      blockList: [],
      calendarEvents: [],
      columns: [
        {
        dataField: 'UserFirstName',
        text: 'First Name',
        sort: true,
        editable: false
      }, {
      dataField: 'UserLastName',
      text: 'Last Name',
      sort: true,
      editable: false
    }, {
        dataField: 'Title',
        text: 'Title',
        sort: true,
        editable: false
      }, {
        dataField: 'Organization',
        text: 'Organization',
        sort: true,
        editable: false
      },{
        dataField: 'Contact',
        text: 'Contact',
        sort: false,
        editable: false,
        style: { overflowWrap: 'break-word', wordWrap: 'break-word' }
      }, {
        dataField: 'Keywords',
        text: 'Keywords',
        sort: false,
        editable: false,
        style: { overflowWrap: 'break-word', wordWrap: 'break-word' }
      }
    ]
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
            UserId: data.results[i].UserId,
            UserName: data.results[i].UserName,
            UserFirstName: data.results[i].UserFirstName,
            UserLastName: data.results[i].UserLastName,
            Name: data.results[i].UserFirstName + ' ' + data.results[i].UserLastName,
            Title: (data.results[i].Title),
            CreatedDate: data.results[i].CreatedDate,
            Organization: data.results[i].Organization,
            Contact: processContactMethod(data.results[i]),
            Keywords: data.results[i].UserKeywords
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
              {/* <ExportCSVButton className="btn-primary" {...props.csvProps}>
                Download CSV
                </ExportCSVButton> */}
            </div>

            <br />
            <BootstrapTable {...props.baseProps}
              pagination={paginationFactory()}
              cellEdit={cellEditFactory({
                mode: 'click',
                blurToSave: true,
                afterSaveCell: (oldValue, newValue, row, column) => {

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

export default UserTable;
