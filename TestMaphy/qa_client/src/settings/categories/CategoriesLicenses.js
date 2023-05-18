import React, { Component } from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';


const Domain = process.env.REACT_APP_URL;

const RemoteAll = ({ data,
  page,
  sizePerPage,
  defaultSorted,
  totalSize,
  onTableChange,
  columns,
  myChangeHandler,
SearchBtnClick,
  indication,
  ExportCSVButton,
  CustomToggleList }) => (
  <div>
    <ToolkitProvider
      keyField="id"
      data={data}
      columns={columns}
      defaultSorted={defaultSorted}
      noDataIndication={ indication }
      search
      exportCSV
      columnToggle >
      {toolkitprops => [
        <div className="custom-table custompeople-tablelayout">
        <div class="col">
          <div class="row">
          <div class="btn-group" role="group" >
               <CustomToggleList {...toolkitprops.columnToggleProps} />
             <div> <input type='text' placeholder="search" name="searchText"   onChange={myChangeHandler} />
                <button type='input'  data-tooltip="true" title="Search" class="custombg-search" onClick={SearchBtnClick}><i class="fa fa-search"></i></button></div>
                <ExportCSVButton {...toolkitprops.csvProps} class="btn-default custombg-search" data-tooltip="true" title="Export CSV"><i class="fa fa-download"></i></ExportCSVButton>&nbsp;
             </div>
                    </div>  
              <BootstrapTable
                {...toolkitprops.baseProps}
                remote={{ pagination: true, sort: true }}
                keyField="id"
                pagination={paginationFactory({ page, sizePerPage, totalSize })}
                onTableChange={onTableChange}

                data={data} columns={columns} noDataIndication="No Data Available"
                wrapperClasses="table-responsive table table-striped "

              />
  </div>
      
      </div>
      ]}
    </ToolkitProvider>
  </div>
);
class CategoriesLicenses extends Component {
  constructor(props) {
    super(props)
    this.state = {
      LicensesData: [],
      LicensesId: '',
      LicensesIdToUpdate: '',
      LicensestoUpdate:'',
      LicensesNametoUpdate: '',
      LicensesDataTotal: '',
      

      ShowCreate: false,
      ShowUpdate: false,
     
      NotificationMessage: '',
      showNotifications: false,
      columns : [{
        dataField: 'id',
        text: 'ID',
        sort: true,
         headerStyle:  { 'white-space' : 'nowrap' }
      },
      {
        dataField: 'company.name',
        text: 'Company',
        sort: true,
        hidden: true,
         headerStyle:  { 'white-space' : 'nowrap' }
  
      },
      {
        dataField: 'name',
        text: 'License',
        sort: true,
        headerStyle:  { 'white-space' : 'nowrap' }
      },
      {
        dataField: 'product_key',
        text: 'Product Key',
        sort: false,
         headerStyle:  { 'white-space' : 'nowrap' }
      },
      {
        dataField: 'expiration_date.formatted',
        text: 'Expiration Date',
        sort: false,
        hidden: true,
         headerStyle:  { 'white-space' : 'nowrap' }
      },
      {
        dataField: 'license_email',
        text: 'Licensed to Email',
        sort: false,
        hidden: true,
         headerStyle:  { 'white-space' : 'nowrap' }
      },
      {
        dataField: 'license_name',
        text: 'Licensed to Name',
        sort: false,
        hidden: true,
         headerStyle:  { 'white-space' : 'nowrap' }
      },
      {
        dataField: 'category.name',
        text: 'Category',
        sort: true,
        hidden: true,
         headerStyle:  { 'white-space' : 'nowrap' }
  
      },
      {
        dataField: 'supplier.name',
        text: 'Supplier',
        sort: true,
        hidden: true,
   headerStyle:  { 'white-space' : 'nowrap' }
      },
      {
        dataField: 'manufacturer.name',
        text: 'Manufacturer',
        sort: false,
   headerStyle:  { 'white-space' : 'nowrap' }
      },
      {
        dataField: 'seats',
        text: 'Total',
        sort: true,
         headerStyle:  { 'white-space' : 'nowrap' }
      },
      {
        dataField: 'free_seats_count',
        text: 'Avail',
        sort: true,
         headerStyle:  { 'white-space' : 'nowrap' }
      },
      {
        dataField: 'purchase_date.formatted',
        text: 'Purchase Date',
        sort: false,
         headerStyle:  { 'white-space' : 'nowrap' }
      },
      {
        dataField: 'maintained',
        text: 'Maintained',
        sort: false,
        hidden: true,
        formatter:this.MaintainedFormatter,
         headerStyle:  { 'white-space' : 'nowrap' }
      },
      {
        dataField: 'reassignable',
        text: 'Re-Assignable',
        sort: false,
        hidden: true,
        formatter:this.ReassignableFormatter,
         headerStyle:  { 'white-space' : 'nowrap' }
      },
      {
        dataField: 'purchase_cost',
        text: 'Purchase Cost',
        sort: false,
        hidden: true,
         headerStyle:  { 'white-space' : 'nowrap' }
      },
      {
        dataField: 'purchase_order',
        text: 'Purchase Number',
        sort: false,
        hidden: true,
         headerStyle:  { 'white-space' : 'nowrap' }
      },
      {
        dataField: 'order_number',
        text: 'Order Number',
        sort: false,
        hidden: true,
         headerStyle:  { 'white-space' : 'nowrap' }
      },
      {
        dataField: 'notes',
        text: 'Notes',
        sort: false,
        hidden: true,
         headerStyle:  { 'white-space' : 'nowrap' }
      }
    ],
      offset: 0,
      sortField: 'id',
      sortOrder: 'desc',
      page: 1,
      sizePerPage: 10,
      searchText: ''
    }
    this.handleTableChange = this.handleTableChange.bind(this);
  }
  componentDidMount() {

    this.callServerData(this.state.page);
  }

  ReassignableFormatter = (cell, row, rowIndex) => {
    if (row.reassignable === 1) {
      return ( <i class="fa fa-check text-success"></i>)
    }
    else {
      return ( <i class="fa fa-times text-danger"></i> );
    }
  };

  MaintainedFormatter = (cell, row, rowIndex) => {
    if (row.reassignable === 1) {
      return ( <i class="fa fa-check text-success"></i>)
    }
    else {
      return ( <i class="fa fa-times text-danger"></i> );
    }
  };
 
  callServerData() {
    const url = Domain + '/licenses?category_id='+ this.props.CategoriesDatatoUpdate.id +
    '&limit=' + this.state.sizePerPage +
      '&offset=' + this.state.offset +
      '&search=' + this.state.searchText +
      '&sort=' + this.state.sortField +
      '&order=' + this.state.sortOrder + '';


    
    axios.get(url)
      .then((response) => {
 
        this.setState({ LicensesData: response.data.rows });
        this.setState({ LicensesDataTotal: response.data.total });
      });
  }
  myColumnToggle = (df,columns) => {
    var newTableColumns = columns.map( (val) => {
       if( val.dataField === df) {
         val.hidden = !val.hidden
       }
       return val;
    });
    this.setState({columns:newTableColumns})
  }
  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  }
  SearchBtnClick = () => {
    this.callServerData();
  }
  handleTableChange = async (type, { page, sizePerPage, sortField, sortOrder }) => {
    const offset = (page - 1) * sizePerPage;
    if (sortField == null || sortField === 'undefined')
      sortField = this.state.sortField;
    if (sortOrder == null || sortOrder === 'undefined')
      sortOrder = this.state.sortOrder;

    await this.setState({ page: page, offset: offset, sizePerPage: sizePerPage, sortField: sortField, sortOrder: sortOrder });
    this.callServerData();
  }
  render() {
 
    const { LicensesData, sizePerPage, page } = this.state;

    const { ExportCSVButton } = CSVExport;
    const CustomToggleList = ({ columns, onColumnToggle, toggles }) => (
      <div className="text-center">
        <div class="pull-left">
          <div class="btn-group pull-left">
          <button class=" btn-default dropdown-toggle customcolumns-csv" data-toggle="dropdown" data-tooltip="true" title="Columns"><i class="fa fa-columns"></i>

</button>
            <ul class="dropdown-menu customcolumn-scroll">

              {columns
                .map(column => ({
                  ...column,
                  toggle: toggles[column.dataField]
                }))
                .map((column, index) => (
                  <li>
                     <React.Fragment >
                           <label className="custom-toggle custom-table table-responsive" >
                      <input type="checkbox" key={column.dataField} id={column.dataField} checked={column.toggle} aria-checked={column.toggle ? "true" : "false"}
                        onChange={() => this.myColumnToggle(column.dataField,columns)} />
                     &nbsp;
                      {column.text}
                      </label>
                    </React.Fragment>
                  </li>
                ))}

            </ul>
          </div>
        </div></div>

    );
  
     
   
     
    return (
      <div>

          <div>
   
        <RemoteAll
          data={LicensesData}
          page={page}
          sizePerPage={sizePerPage}
          totalSize={this.state.LicensesDataTotal}
          columns={this.state.columns}
          CSVExport={CSVExport}
          ExportCSVButton={ExportCSVButton}
          CustomToggleList={CustomToggleList}
          onTableChange={this.handleTableChange}
          myChangeHandler={this.myChangeHandler}
         SearchBtnClick={this.SearchBtnClick}
        />
      </div>
 </div>

    )
  
}
}

export default CategoriesLicenses;